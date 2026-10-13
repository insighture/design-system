/**
 * HTML email template (newsletter / announcement).
 *
 * Email clients ignore most modern CSS, so this is table layout with inline
 * styles, a solid-colour fallback behind the rose gradient, and Arial / Georgia
 * fallbacks for DM Sans / DM Serif Display. Paste it into your email tool, or
 * use it as the base for a campaign template.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { outDir } from './lib.mjs';

export async function buildEmail(tokens) {
  const { brand, palette } = tokens;
  const sans = "'DM Sans', Arial, Helvetica, sans-serif";
  const serif = "'DM Serif Display', Georgia, 'Times New Roman', serif";
  const em = (text, color = brand.rose) => `<em style="font-family:${serif};font-style:italic;font-weight:400;color:${color}">${text}</em>`;
  const button = (label, bg, fg) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td bgcolor="${bg}" style="border-radius:999px"><a href="https://www.insighture.com" style="display:inline-block;padding:13px 28px;font-family:${sans};font-size:15px;font-weight:600;color:${fg};text-decoration:none;border-radius:999px">${label}</a></td>
  </tr></table>`;
  const card = (code, tileBg, tileFg, title, text) => `<td valign="top" width="50%" style="padding:8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${palette.neutral[200]};border-radius:18px"><tr><td style="padding:22px">
      <div style="width:40px;height:40px;line-height:40px;text-align:center;border-radius:10px;background:${tileBg};color:${tileFg};font-family:${sans};font-weight:700;font-size:13px">${code}</div>
      <p style="margin:16px 0 6px;font-family:${sans};font-size:17px;font-weight:600;color:${brand.black}">${title}</p>
      <p style="margin:0 0 12px;font-family:${sans};font-size:14px;line-height:21px;color:${palette.neutral[700]}">${text}</p>
      <a href="https://www.insighture.com" style="font-family:${sans};font-size:14px;color:${tileFg};text-decoration:none">Learn more &rsaquo;</a>
    </td></tr></table>
  </td>`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><title>Insighture</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=DM+Serif+Display:ital@1&display=swap" rel="stylesheet">
<style>@media (max-width:620px){.stack{display:block!important;width:100%!important}.px{padding-left:24px!important;padding-right:24px!important}}</style>
</head>
<body style="margin:0;padding:0;background:${palette.neutral[100]}">
<!-- Preheader: the line inbox previews show after the subject -->
<div style="display:none;max-height:0;overflow:hidden">One line that previews this email in the inbox.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${palette.neutral[100]}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${brand.white};border-radius:18px;overflow:hidden">

  <!-- Hero: rose gradient, solid fallback for clients without gradients -->
  <tr><td class="px" bgcolor="#E63A5F" style="background:#E63A5F;background-image:${tokens.roseGradient};padding:40px 48px 44px;font-family:${sans};color:#ffffff">
    <p style="margin:0 0 36px;font-size:20px;font-weight:300;color:#ffffff">Insighture</p>
    <h1 style="margin:0 0 14px;font-size:36px;line-height:40px;font-weight:600;letter-spacing:-0.5px;color:#ffffff">We own the problem, not just ${em('the solution', '#ffffff')}</h1>
    <p style="margin:0 0 26px;font-size:16px;line-height:24px;color:#ffffff">A short intro line: what this email is about and why it matters to the reader.</p>
    ${button("Let's talk", '#ffffff', palette.rose[600])}
  </td></tr>

  <!-- Body -->
  <tr><td class="px" style="padding:40px 48px 8px;font-family:${sans}">
    <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${palette.indigo[500]}">What we do</p>
    <h2 style="margin:0 0 14px;font-size:26px;line-height:32px;font-weight:600;letter-spacing:-0.4px;color:${brand.black}">Great outcomes start with the ${em('right thinking')}</h2>
    <p style="margin:0 0 20px;font-size:16px;line-height:25px;color:${palette.neutral[700]}">Body copy in DM Sans 16px. Keep each paragraph to two or three sentences and lead with the point.</p>
  </td></tr>
  <tr><td class="px" style="padding:0 40px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      ${card('AI', palette.rose[50], palette.rose[700], 'Artificial intelligence', 'Practical AI that delivers measurable business value.')}
      ${card('DA', palette.teal[50], palette.teal[700], 'Data &amp; analytics', 'Turn fragmented data into insights that drive decisions.')}
    </tr></table>
  </td></tr>

  <!-- Stat -->
  <tr><td class="px" style="padding:16px 48px 40px;font-family:${sans}">
    <p style="margin:0;font-size:44px;line-height:48px;font-weight:600;letter-spacing:-1px;color:${brand.rose}">47%</p>
    <p style="margin:4px 0 0;font-size:15px;line-height:22px;color:${palette.neutral[700]}">shorter lead time for changes after platform modernisation</p>
  </td></tr>

  <!-- Closing CTA band -->
  <tr><td class="px" bgcolor="${brand.deepTeal}" style="background:${brand.deepTeal};padding:36px 48px;font-family:${sans}">
    <p style="margin:0 0 6px;font-size:22px;line-height:28px;font-weight:600;color:#ffffff">Don't scale the wrong ${em('problem')}</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:22px;color:${palette.deep[200]}">Consult with us so you can move forward with clarity.</p>
    ${button('Book a conversation', brand.rose, '#ffffff')}
  </td></tr>

  <!-- Footer -->
  <tr><td class="px" style="padding:24px 48px 32px;font-family:${sans};font-size:12px;line-height:18px;color:${palette.neutral[500]}">
    Insighture · Street address · City, State Postcode<br>
    You're receiving this because you subscribed at insighture.com. <a href="#" style="color:${palette.neutral[600]}">Unsubscribe</a>
  </td></tr>
</table>
</td></tr></table>
</body></html>
`;
  const file = path.join(outDir, 'email', 'newsletter.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
  return { newsletter: file };
}
