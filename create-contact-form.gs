/**
 * AND Intelligence — Contact Form setup script (v2).
 *
 * Why v2: the classic "POST straight to a Google Form's /formResponse URL"
 * trick got tested against the live form this created and Google's current
 * Forms backend rejects it (returns a disabled, unfilled form instead of
 * recording the response). So instead of relying on that unofficial
 * endpoint, this version adds a small, OFFICIALLY SUPPORTED Web App
 * (doPost) that the website posts to directly. It emails you the
 * submission the same way — just through a path that's actually reliable.
 *
 * ---------------------------------------------------------------
 * PART A — one-time setup (only needed once, skip if you already ran v1)
 * ---------------------------------------------------------------
 *  1. https://script.google.com -> New project (or reuse the one you made).
 *  2. Paste this whole file in, replacing whatever's there.
 *  3. Function dropdown -> createContactForm -> Run -> authorize -> check
 *     Executions -> View log for the form links (optional, just a record —
 *     the website no longer submits to this Form directly).
 *
 * ---------------------------------------------------------------
 * PART B — deploy the Web App (this is the important part)
 * ---------------------------------------------------------------
 *  1. Top right: "Deploy" -> "New deployment".
 *  2. Click the gear icon next to "Select type" -> choose "Web app".
 *  3. Description: "AND Intelligence contact endpoint" (anything you like).
 *  4. "Execute as": Me.
 *  5. "Who has access": Anyone.
 *  6. Click "Deploy". Authorize again if asked.
 *  7. Copy the "Web app URL" it gives you (ends in /exec) — that's the one
 *     value you need for .env.local: NEXT_PUBLIC_CONTACT_WEBAPP_URL.
 *
 * That's it — no entry IDs to hunt for this time, just the one URL.
 *
 * If you ever edit this script again, you'll need to re-deploy
 * ("Deploy" -> "Manage deployments" -> pencil icon -> "New version" ->
 * Deploy) for changes to take effect on the live URL.
 */

// IMPORTANT: hardcoded on purpose. Session.getActiveUser().getEmail() returns
// an empty string when the Web App is invoked anonymously (i.e. by "Anyone"
// access, which is required for a public contact form) — it only resolves
// to your address when you personally run the script. Set your real inbox
// below, then redeploy (Deploy -> Manage deployments -> pencil icon ->
// New version -> Deploy) for the change to take effect on the live URL.
const OWNER_EMAIL = 'ohnirisa@gmail.com'; // <- change this if it's not the right inbox

function createContactForm() {
  const form = FormApp.create('AND Intelligence — Contact')
    .setDescription('New enquiry from andintelligence.sg')
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false);

  form.addTextItem().setTitle('Name').setRequired(true);
  form.addTextItem().setTitle('Email').setRequired(true);
  form
    .addMultipleChoiceItem()
    .setTitle('Which season are you in?')
    .setChoiceValues(['Youth (14–19)', 'Young Adult (20–35)', 'Mid-Life (35–55)'])
    .setRequired(true);
  form.addParagraphTextItem().setTitle("What's on your mind?").setRequired(true);

  Logger.log('Form created (kept as a record — the site does NOT submit to this directly).');
  Logger.log('Live form:   ' + form.getPublishedUrl());
  Logger.log('Form editor: ' + form.getEditUrl());
  Logger.log('Now do PART B in the file comment: Deploy -> New deployment -> Web app.');
}

/**
 * The actual endpoint the website talks to.
 * Accepts POST with fields: name, email, season, message.
 * Deploy this via Deploy -> New deployment -> Web app (see PART B above).
 */
function doPost(e) {
  try {
    const p = e.parameter || {};
    const name = p.name || '(not provided)';
    const email = p.email || '(not provided)';
    const season = p.season || '(not provided)';
    const message = p.message || '(not provided)';

    const body =
      'New enquiry from andintelligence.sg:\n\n' +
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Season: ' + season + '\n' +
      'Message: ' + message + '\n';

    MailApp.sendEmail(OWNER_EMAIL, 'New enquiry — AND Intelligence', body);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
