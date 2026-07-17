const { execSync } = require('child_process');

async function run() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey) {
    console.error("Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY");
    process.exit(1);
  }

  // 1. Get the latest commit message
  let commitMessage = "New updates published!";
  try {
    commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
    console.log(`Latest commit message: "${commitMessage}"`);
  } catch (err) {
    console.warn("Could not retrieve git commit message, using default message.", err.message);
  }

  // 2. Fetch subscribers from Supabase using native fetch
  console.log("Fetching subscribers from Supabase...");
  const supabaseEndpoint = `${supabaseUrl}/rest/v1/profiles?select=email&subscribed_to_updates=eq.true`;
  
  let subscribers = [];
  try {
    const response = await fetch(supabaseEndpoint, {
      method: 'GET',
      headers: {
        'apikey': supabaseServiceRoleKey,
        'Authorization': `Bearer ${supabaseServiceRoleKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Supabase query failed: ${response.status} ${errText}`);
    }

    const data = await response.json();
    subscribers = data.map(profile => profile.email).filter(Boolean);
    console.log(`Found ${subscribers.length} subscriber(s):`, subscribers);
  } catch (err) {
    console.error("Failed to fetch subscribers:", err);
    process.exit(1);
  }

  if (subscribers.length === 0) {
    console.log("No subscribers found to email. Exiting.");
    return;
  }

  // 3. Send email via Resend API
  console.log("Sending email notifications via Resend...");
  const resendEndpoint = "https://api.resend.com/emails";
  
  // Create beautiful email template HTML
  const emailHtml = `
    <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #edf2f7;">
        <span style="font-size: 32px;">✈️</span>
        <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1a202c; margin: 10px 0 0 0; font-size: 24px;">European Travel Journal</h1>
        <p style="color: #718096; font-size: 14px; margin: 5px 0 0 0;">Solo Travel Diaries & Updates</p>
      </div>
      <div style="padding: 24px 0; color: #2d3748; line-height: 1.6;">
        <h2 style="font-size: 18px; color: #2d3748; margin-top: 0;">New Updates Posted!</h2>
        <p>Hi there,</p>
        <p>I just updated my travel journal website with new memories. Here is what's new:</p>
        
        <blockquote style="margin: 20px 0; padding: 12px 20px; border-left: 4px solid #e53e3e; background-color: #f7fafc; font-style: italic; color: #4a5568; border-radius: 0 8px 8px 0;">
          "${commitMessage}"
        </blockquote>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://eujournal.vercel.app" style="background-color: #e53e3e; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 15px; display: inline-block;">View the Journal</a>
        </div>
      </div>
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #edf2f7; color: #a0aec0; font-size: 12px;">
        <p>You received this email because you subscribed to updates on the website.</p>
        <p>&copy; ${new Date().getFullYear()} Travel Journal. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch(resendEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: "Journal Updates <onboarding@resend.dev>",
        to: subscribers,
        subject: "New Travel Journal Update!",
        html: emailHtml
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Resend send failed: ${response.status} ${JSON.stringify(result)}`);
    }

    console.log("Emails successfully sent! Resend ID:", result.id);
  } catch (err) {
    console.error("Failed to send emails via Resend:", err);
    process.exit(1);
  }
}

run();
