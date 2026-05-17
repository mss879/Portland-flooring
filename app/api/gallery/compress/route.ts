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

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compress with sharp: resize to max 1200px width, convert to WebP at 80% quality
    const compressed = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const fileName = `gallery_${timestamp}_${random}.webp`;

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
    const originalSize = buffer.length;
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
