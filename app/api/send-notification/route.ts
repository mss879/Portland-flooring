import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not defined.");
      return NextResponse.json(
        { error: "Email service not configured. RESEND_API_KEY is missing." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { 
      formType, 
      firstName, 
      lastName, 
      name, 
      email, 
      phone, 
      message,
      projectType,
      serviceRequired,
      materialPreference,
      estimatedArea,
      projectTimeline,
      additionalRequirements
    } = body;

    const resend = new Resend(apiKey);
    const toEmail = process.env.RESEND_TO_EMAIL || "info@portlands.com.au";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Portland Flooring <onboarding@resend.dev>";

    let subject = "New Form Submission - Portland Flooring";
    let htmlContent = "";

    // Generate beautiful email layout matching Portland Flooring's premium aesthetic
    const emailHeaderColor = "#251208"; // Premium rich dark wood brown
    const accentColor = "#8c5430"; // Warm flooring copper/amber accent
    const bodyBg = "#fdfaf6"; // Warm off-white paper tone

    const getBaseTemplate = (title: string, contentHtml: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              background-color: #faf6f3;
              color: #251208;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: ${bodyBg};
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
              border: 1px solid rgba(140, 84, 48, 0.1);
            }
            .header {
              background-color: ${emailHeaderColor};
              padding: 40px 30px;
              text-align: center;
              border-bottom: 4px solid ${accentColor};
            }
            .header h1 {
              color: #ffffff;
              font-size: 24px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              margin: 0;
            }
            .header p {
              color: rgba(255, 255, 255, 0.7);
              font-size: 13px;
              margin-top: 10px;
              margin-bottom: 0;
              text-transform: uppercase;
              letter-spacing: 0.2em;
            }
            .content {
              padding: 40px 30px;
            }
            .field-group {
              margin-bottom: 24px;
              border-bottom: 1px solid rgba(140, 84, 48, 0.08);
              padding-bottom: 16px;
            }
            .field-group:last-child {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .field-label {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.15em;
              color: ${accentColor};
              margin-bottom: 6px;
            }
            .field-value {
              font-size: 16px;
              line-height: 1.6;
              color: #251208;
              font-weight: 500;
            }
            .message-box {
              background-color: #ffffff;
              border-left: 3px solid ${accentColor};
              padding: 16px;
              border-radius: 4px;
              font-style: italic;
              color: #4a2810;
              font-size: 15px;
              line-height: 1.6;
              box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.02);
            }
            .footer {
              background-color: #f5ece4;
              padding: 24px 30px;
              text-align: center;
              font-size: 12px;
              color: #6b3e21;
              border-top: 1px solid rgba(140, 84, 48, 0.08);
            }
            .footer p {
              margin: 4px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Portland Flooring</h1>
              <p>Notification Service</p>
            </div>
            <div class="content">
              ${contentHtml}
            </div>
            <div class="footer">
              <p><strong>Portland Flooring Showroom</strong></p>
              <p>1-19 Industrial Drive, Braeside VIC 3195</p>
              <p>&copy; ${new Date().getFullYear()} Portland Flooring. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    if (formType === "inquiry") {
      const fName = firstName || "";
      const lName = lastName || "";
      const fullName = `${fName} ${lName}`.trim() || "Valued Client";
      subject = `🪵 New Project Inquiry: ${fullName}`;
      
      htmlContent = getBaseTemplate(
        "New Project Inquiry",
        `
          <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 24px; color: ${emailHeaderColor};">
            New Contact Submission
          </h2>
          <div class="field-group">
            <div class="field-label">Customer Name</div>
            <div class="field-value">${fullName}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}" style="color: ${accentColor}; text-decoration: none; font-weight: 700;">${email || "Not Provided"}</a></div>
          </div>
          <div class="field-group">
            <div class="field-label">Phone Number</div>
            <div class="field-value"><a href="tel:${phone}" style="color: ${accentColor}; text-decoration: none; font-weight: 700;">${phone}</a></div>
          </div>
          <div class="field-group">
            <div class="field-label">Project Details / Message</div>
            <div class="field-value">
              <div class="message-box">
                ${message ? message.replace(/\n/g, "<br>") : "No details provided."}
              </div>
            </div>
          </div>
        `
      );
    } else if (formType === "sample_request") {
      const customerName = name || "Valued Client";
      subject = `📦 Free Sample Box Request: ${customerName}`;

      htmlContent = getBaseTemplate(
        "Sample Box Request",
        `
          <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 24px; color: ${emailHeaderColor};">
            Free Sample Box Requested
          </h2>
          <div class="field-group">
            <div class="field-label">Customer Name</div>
            <div class="field-value">${customerName}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}" style="color: ${accentColor}; text-decoration: none; font-weight: 700;">${email}</a></div>
          </div>
          <p style="font-size: 14px; color: #6b3e21; margin-top: 30px; font-weight: 500; line-height: 1.5;">
            * This user has requested a curated sample box containing our 4 most popular premium flooring samples. Please reach out to arrange shipment.
          </p>
        `
      );
    } else if (formType === "newsletter") {
      subject = `📧 New Newsletter Subscriber: ${email}`;

      htmlContent = getBaseTemplate(
        "Newsletter Subscription",
        `
          <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 24px; color: ${emailHeaderColor};">
            New Newsletter Subscription
          </h2>
          <div class="field-group">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}" style="color: ${accentColor}; text-decoration: none; font-weight: 700;">${email}</a></div>
          </div>
          <p style="font-size: 14px; color: #6b3e21; margin-top: 30px; font-weight: 500; line-height: 1.5;">
            * This email has subscribed for exclusive architectural insights and material updates.
          </p>
        `
      );
    } else if (formType === "quote_request") {
      const customerName = name || `${firstName || ""} ${lastName || ""}`.trim() || "Valued Client";
      subject = `📐 New Quote Request: ${customerName}`;

      htmlContent = getBaseTemplate(
        "New Quote Request",
        `
          <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 24px; color: ${emailHeaderColor};">
            New Quote Request Details
          </h2>
          <div class="field-group">
            <div class="field-label">Customer Name</div>
            <div class="field-value">${customerName}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}" style="color: ${accentColor}; text-decoration: none; font-weight: 700;">${email || "Not Provided"}</a></div>
          </div>
          <div class="field-group">
            <div class="field-label">Phone Number</div>
            <div class="field-value"><a href="tel:${phone}" style="color: ${accentColor}; text-decoration: none; font-weight: 700;">${phone || "Not Provided"}</a></div>
          </div>
          <div class="field-group">
            <div class="field-label">Project Type</div>
            <div class="field-value">${projectType || "Residential"}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Service Required</div>
            <div class="field-value">${serviceRequired || "Not Specified"}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Material Preference</div>
            <div class="field-value">${materialPreference || "Not Specified"}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Estimated Area</div>
            <div class="field-value">${estimatedArea || "Not Provided"}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Project Timeline</div>
            <div class="field-value">${projectTimeline || "Not Specified"}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Additional Notes</div>
            <div class="field-value">
              <div class="message-box">
                ${additionalRequirements ? additionalRequirements.replace(/\n/g, "<br>") : "No additional notes."}
              </div>
            </div>
          </div>
        `
      );
    } else {
      // Default fallback generic form notification
      htmlContent = getBaseTemplate(
        "Form Submission",
        `
          <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 24px; color: ${emailHeaderColor};">
            Generic Form Submission
          </h2>
          <pre style="white-space: pre-wrap; font-family: monospace; background: #ffffff; padding: 16px; border-radius: 4px; border: 1px solid rgba(140,84,48,0.1);">${JSON.stringify(body, null, 2)}</pre>
        `
      );
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API Error details:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error: any) {
    console.error("Server error sending notification email:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error?.message || String(error)) },
      { status: 500 }
    );
  }
}
