// lib/email.js
export const esc = (s = "") =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]
  );

export function emailTemplate(opts) {
  const { title, subtitle = "", rows, footerNote = "" } = opts;

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:8px 12px;color:#64748b;width:160px;font-weight:600;border-bottom:1px solid #e5e7eb;">${esc(
          r.label
        )}</td>
        <td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e5e7eb;">${String(
          r.value || "-"
        )
          .split("\n")
          .map(esc)
          .join("<br/>")}</td>
      </tr>`
  )
    
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta charSet="utf-8"/>
  <title>${esc(title)}</title>
</head>
<body style="margin:0;background:#f6f7fb;font-family:-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:24px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;box-shadow:0 1px 4px rgba(15,23,42,.06);overflow:hidden;">
          <tr>
            <td style="background:#0f172a;color:#fff;padding:20px 24px;">
              <div style="font-size:18px;font-weight:800;letter-spacing:.2px;">Tamim Al Hridoy</div>
              <div style="opacity:.9;font-size:13px;margin-top:4px;">${esc(subtitle)}</div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                ${rowsHtml}
              </table>

              <div style="font-size:12px;color:#64748b;margin-top:16px;line-height:1.6">
                ${esc(
                  footerNote ||
                    "You can reply to this email to continue the conversation."
                )}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 24px;border-top:1px solid #e5e7eb;color:#64748b;font-size:12px">
              © ${new Date().getFullYear()} Tamim Al Hridoy • <a href="mailto:${
                process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
                "tamimalhridoy3@gmail.com"
              }" style="color:#0ea5e9;text-decoration:none">${
                process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
                "tamimalhridoy3@gmail.com"
              }</a>
            </td>
          </tr>
        </table>
        <div style="height:24px"></div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
