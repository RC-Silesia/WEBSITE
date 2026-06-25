const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'assets', 'data', 'newsletter.json');
const outputDir = path.join(root, 'exports', 'newsletter');
const markdownPath = path.join(outputDir, 'weekly-newsletter-demo.md');
const htmlPath = path.join(outputDir, 'weekly-newsletter-demo.html');

function escapeHtml(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalizeItems(section) {
  return Array.isArray(section.items) ? section.items : [];
}

function buildMarkdown(data) {
  const lines = [];
  lines.push(`# ${data.title || 'Newsletter tygodniowy RC Silesia'}`);
  lines.push('');
  lines.push(`Okres: ${(data.period && data.period.label) || 'do uzupełnienia'}`);
  lines.push(`Status: ${data.status || 'draft'}`);
  lines.push('');
  lines.push(data.editorialNote || 'Szkic newslettera wymaga zatwierdzenia przed wysyłką.');
  lines.push('');
  if (data.intro) {
    lines.push(data.intro);
    lines.push('');
  }
  (Array.isArray(data.sections) ? data.sections : []).forEach((section) => {
    lines.push(`## ${section.title || 'Sekcja'}`);
    lines.push('');
    normalizeItems(section).forEach((item) => {
      lines.push(`- **${item.title || 'Temat'}** (${item.status || 'draft'}): ${item.text || ''}`);
    });
    lines.push('');
  });
  if (data.cta && data.cta.label) {
    lines.push(`CTA: [${data.cta.label}](${data.cta.href || 'staging/index.html#start'})`);
    lines.push('');
  }
  lines.push(data.footer || 'To jest szkic newslettera RC Silesia. Przed wysyłką wymaga zatwierdzenia.');
  lines.push('');
  return lines.join('\n');
}

function buildNewsletterHtml(data) {
  const title = data.title || 'Newsletter tygodniowy RC Silesia';
  const period = data.period && data.period.label ? data.period.label : 'do uzupełnienia';
  const status = data.status || 'draft';
  const sections = Array.isArray(data.sections) ? data.sections : [];
  const sectionHtml = sections.map((section) => {
    const items = normalizeItems(section).map((item) => `
        <li>
          <strong>${escapeHtml(item.title || 'Temat')}</strong>
          <span class="status">${escapeHtml(item.status || 'draft')}</span>
          <p>${escapeHtml(item.text || '')}</p>
        </li>`).join('');
    return `
      <section>
        <h2>${escapeHtml(section.title || 'Sekcja')}</h2>
        <ul>${items}
        </ul>
      </section>`;
  }).join('');
  const cta = data.cta && data.cta.label ? `
      <p class="cta"><a href="${escapeHtml(data.cta.href || 'staging/index.html#start')}">${escapeHtml(data.cta.label)}</a></p>` : '';

  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #263238; background: #f5f7fa; line-height: 1.55; }
    .wrap { max-width: 760px; margin: 0 auto; padding: 32px 18px; }
    header, section, footer { margin-bottom: 18px; padding: 22px; border: 1px solid #dfe5ea; border-radius: 8px; background: #ffffff; }
    h1, h2 { color: #0d2b5f; }
    h1 { margin: 0 0 10px; }
    h2 { margin-top: 0; }
    .meta, .note, footer { color: #64707a; }
    .status { display: inline-block; margin-left: 8px; padding: 2px 8px; border-radius: 999px; color: #0d2b5f; background: #fff7e6; font-size: 12px; font-weight: 700; }
    li { margin-bottom: 14px; }
    li p { margin: 6px 0 0; }
    .cta a { display: inline-block; padding: 10px 14px; border-radius: 6px; color: #0d2b5f; background: #f7a81b; font-weight: 700; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <p class="meta">RC Silesia</p>
      <h1>${escapeHtml(title)}</h1>
      <p>Okres raportu: <strong>${escapeHtml(period)}</strong></p>
      <p>Status: <strong>${escapeHtml(status)}</strong></p>
      <p class="note">${escapeHtml(data.editorialNote || 'Szkic newslettera wymaga zatwierdzenia przed wysyłką.')}</p>
      <p>${escapeHtml(data.intro || '')}</p>
    </header>${sectionHtml}${cta}
    <footer>${escapeHtml(data.footer || 'To jest szkic newslettera RC Silesia. Przed wysyłką wymaga zatwierdzenia.')}</footer>
  </div>
</body>
</html>
`;
}

function main() {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(markdownPath, buildMarkdown(data), 'utf8');
  fs.writeFileSync(htmlPath, buildNewsletterHtml(data), 'utf8');
  console.log(`Generated ${path.relative(root, markdownPath)}`);
  console.log(`Generated ${path.relative(root, htmlPath)}`);
}

main();
