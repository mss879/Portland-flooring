import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Verify authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("alt_text") as string) || "Gallery Image";
    const projectId = formData.get("project_id") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // If project_id is provided, check if the project already has 10 images
    if (projectId) {
      const { count, error: countError } = await supabase
        .from("gallery_images")
        .select("*", { count: "exact", head: true })
        .eq("project_id", projectId);

      if (countError) {
        return NextResponse.json(
          { error: "Failed to verify project image limit: " + countError.message },
          { status: 500 }
        );
      }

      if (count !== null && count >= 10) {
        return NextResponse.json(
          { error: "Maximum limit of 10 images reached for this project." },
          { status: 400 }
        );
      }
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const originalSize = buffer.length;

    // Compress with Sharp: resize to max 1200px width, convert to WebP at quality 80
    let compressed: Buffer;
    try {
      compressed = await sharp(buffer)
        .resize({
          width: 1200,
          withoutEnlargement: true, // don't upscale small images
        })
        .webp({ quality: 80 })
        .toBuffer();
    } catch (sharpErr) {
      console.error("Sharp compression error:", sharpErr);
      const detail = sharpErr instanceof Error ? sharpErr.message : String(sharpErr);
      return NextResponse.json(
        { error: "Image compression failed: " + detail },
        { status: 500 }
      );
    }

    // Generate unique filename for storage
    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const fileName = `gallery_${uniqueId}.webp`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("gallery-images")
      .upload(fileName, compressed, {
        contentType: "image/webp",
        cacheControl: "31536000", // 1 year cache
      });

    if (uploadError) {
      return NextResponse.json(
        { error: "Upload failed: " + uploadError.message },
        { status: 500 }
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("gallery-images").getPublicUrl(fileName);

    // Get the current max sort_order
    const { data: maxSortData } = await supabase
      .from("gallery_images")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1);

    const nextSortOrder =
      maxSortData && maxSortData.length > 0
        ? maxSortData[0].sort_order + 1
        : 1;

    // Insert record into gallery_images table
    const { data: insertedImage, error: insertError } = await supabase
      .from("gallery_images")
      .insert({
        image_url: publicUrl,
        file_path: fileName,
        alt_text: altText,
        sort_order: nextSortOrder,
        is_static: false,
        project_id: projectId || null,
      })
      .select()
      .single();

    if (insertError) {
      // Clean up uploaded file if DB insert fails
      await supabase.storage.from("gallery-images").remove([fileName]);
      return NextResponse.json(
        { error: "Database insert failed: " + insertError.message },
        { status: 500 }
      );
    }

    // Calculate compression stats
    const compressedSize = compressed.length;
    const savedPercent = Math.round(
      ((originalSize - compressedSize) / originalSize) * 100
    );

    return NextResponse.json({
      success: true,
      image: insertedImage,
      compression: {
        originalSize,
        compressedSize,
        savedPercent,
      },
    });
  } catch (error) {
    console.error("Gallery compress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
