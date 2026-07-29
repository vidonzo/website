// Renders the coverage report from computeCoverage() into a single self-contained
// HTML string (its own <style>, no client JavaScript) so the local CLI and the
// Astro admin page render byte-for-byte the same board. All numbers and bar
// widths are baked server-side; nothing here needs to run in the browser.

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const fa = (n) => String(n).replace(/\d/g, (d) => FA_DIGITS[+d]);

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const CHECK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

function cell(status) {
  if (status === 'source') return '<td class="c"><div class="cell source" title="منبع">م</div></td>';
  if (status === 'ok') return `<td class="c"><div class="cell done" title="ترجمه‌شده — استاندارد">${CHECK}</div></td>`;
  if (status === 'partial')
    return '<td class="c"><div class="cell partial" title="ترجمه‌شده اما فرانت‌متر ناقص">–</div></td>';
  return '<td class="c"><div class="cell miss" title="ترجمه‌نشده"></div></td>';
}

function tagChip(t) {
  return `<span class="chip ${esc(t.kind)}">${esc(t.text)}</span>`;
}

function board(col, locales) {
  const s = col.stats;
  const pct = s.total ? Math.round((s.existing / s.total) * 100) : 0;

  let head = '<thead><tr><th class="art">مقاله / سند</th>';
  for (const l of locales) head += `<th class="lang"><div class="code">${esc(l.code)}</div><div class="nm">${esc(l.faName)}</div></th>`;
  head += '<th class="tot">پوشش</th></tr></thead>';

  let body = '<tbody>';
  for (const e of col.entries) {
    body += '<tr>';
    body += `<td class="art"><div class="ttl">${esc(e.title)}</div>${e.tags.map(tagChip).join('')}</td>`;
    for (const l of locales) body += cell(e.cells[l.code]);
    const have = locales.filter((l) => e.cells[l.code] !== 'missing').length;
    const cls = have === locales.length ? 'full' : have <= 2 ? 'low' : '';
    body += `<td class="tot"><span class="rowtot ${cls}">${fa(have)}<small>/${fa(locales.length)}</small></span></td>`;
    body += '</tr>';
  }
  body += '</tbody>';

  let foot = '<tfoot><tr><td class="art">پوشش هر زبان</td>';
  for (const l of locales) {
    const v = col.perLocale[l.code];
    const p = s.entryCount ? Math.round((v / s.entryCount) * 100) : 0;
    foot += `<td><div class="covnum ${v === 0 ? 'zero' : ''}">${fa(v)}</div><div class="covbar"><i style="width:${p}%"></i></div></td>`;
  }
  foot += '<td class="tot"></td></tr></tfoot>';

  return `
  <section class="cboard">
    <div class="chead">
      <h2>${esc(col.faLabel)}</h2>
      <div class="cmeta">
        <span>${fa(s.entryCount)} سند × ${fa(locales.length)} زبان</span>
        <span class="dot">·</span>
        <span>${fa(s.existing)}/${fa(s.total)} نسخه (${fa(pct)}٪)</span>
        ${s.partial ? `<span class="dot">·</span><span class="warntext">${fa(s.partial)} ناقص</span>` : ''}
      </div>
    </div>
    <div class="scroll"><table>${head}${body}${foot}</table></div>
  </section>`;
}

export function renderCoverage(data) {
  const { locales, collections, summary, generatedAt } = data;

  const date = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full' }).format(generatedAt);
  const gregorian = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(generatedAt);

  const tiles = [
    { num: `${fa(summary.existing)}<span class="of">/${fa(summary.total)}</span>`, lbl: 'نسخه‌ی ساخته‌شده از کل ممکن', pct: summary.coveragePct, accent: true },
    { num: `${fa(summary.coveragePct)}٪`, lbl: 'درصد پوشش کل محتوا', pct: summary.coveragePct },
    { num: fa(summary.emptyLocales.length), lbl: `زبانِ کاملاً خالی (از ${fa(summary.localeCount)})`, pct: Math.round((summary.emptyLocales.length / summary.localeCount) * 100) },
    { num: fa(summary.completeLocales.length), lbl: 'زبان با محتوای کامل', pct: Math.round((summary.completeLocales.length / summary.localeCount) * 100) },
  ];
  const tilesHtml = tiles.map((t) =>
    `<div class="tile ${t.accent ? 'accent' : ''}"><div class="num">${t.num}</div><div class="lbl">${esc(t.lbl)}</div><div class="bar"><i style="width:${t.pct}%"></i></div></div>`).join('');

  const emptyNames = summary.emptyLocales.map((c) => locales.find((l) => l.code === c)?.faName || c);
  const notes = [];
  notes.push(`<div class="note"><span class="ic ok">✓</span><div>سلول سبز = ترجمه‌ی بومیِ کامل با فرانت‌متر استاندارد. علامت <b>«–» کهربایی</b> = ترجمه هست ولی فیلدهای استاندارد (مثل <code>urlSlug</code>، <code>keywords</code>) ناقص است و باید کامل شود.</div></div>`);
  if (emptyNames.length) {
    notes.push(`<div class="note warn"><span class="ic warn">!</span><div><b>${fa(emptyNames.length)} زبان</b> در هیچ دسته‌ای محتوا ندارند: ${esc(emptyNames.join('، '))}.</div></div>`);
  }
  notes.push(`<div class="note"><span class="ic">ⓘ</span><div>ردیف‌های «پیش‌استاندارد» مقاله‌هایی‌اند که پیش از استاندارد موتور محتوا نوشته شده‌اند؛ حتی مبدأشان فیلدهای موتور را ندارد و پیش از ترجمه باید مبدأ ارتقا یابد.</div></div>`);

  const styles = `
  .cov-root{--bg:#eef1f3;--panel:#fff;--panel-2:#f6f8f9;--ink:#14181c;--ink-soft:#4a555d;--ink-faint:#8b969d;--line:#dde3e7;--line-soft:#e9edf0;--accent:#0f766e;--accent-soft:#d4ede9;--accent-ink:#0b5952;--done:#0f766e;--source-bg:#fbe4c9;--source:#b45309;--miss:#eef1f3;--miss-dot:#c4ccd1;--warn:#b45309;--warn-bg:#fdf1dd;--partial-bg:#fbe4c9;--shadow:0 1px 2px rgba(20,24,28,.06),0 8px 24px rgba(20,24,28,.06);--radius:14px;
    direction:rtl;color:var(--ink);font-family:"Vazirmatn Variable","Vazirmatn","Segoe UI",Tahoma,system-ui,sans-serif;line-height:1.6;font-size:15px}
  @media (prefers-color-scheme:dark){.cov-root{--bg:#0e1214;--panel:#171d20;--panel-2:#1c2327;--ink:#eef2f4;--ink-soft:#aab4ba;--ink-faint:#6b767c;--line:#2a3237;--line-soft:#232b30;--accent:#2dd4bf;--accent-soft:#123832;--accent-ink:#6ee7d8;--done:#12857a;--source-bg:#3a2c14;--source:#e0a24b;--miss:#1b2226;--miss-dot:#3a444a;--warn:#e0a24b;--warn-bg:#33280f;--partial-bg:#3a2c14;--shadow:0 1px 2px rgba(0,0,0,.3),0 10px 30px rgba(0,0,0,.35)}}
  :root[data-theme="dark"] .cov-root{--bg:#0e1214;--panel:#171d20;--panel-2:#1c2327;--ink:#eef2f4;--ink-soft:#aab4ba;--ink-faint:#6b767c;--line:#2a3237;--line-soft:#232b30;--accent:#2dd4bf;--accent-soft:#123832;--accent-ink:#6ee7d8;--done:#12857a;--source-bg:#3a2c14;--source:#e0a24b;--miss:#1b2226;--miss-dot:#3a444a;--warn:#e0a24b;--warn-bg:#33280f;--partial-bg:#3a2c14;--shadow:0 1px 2px rgba(0,0,0,.3),0 10px 30px rgba(0,0,0,.35)}
  :root[data-theme="light"] .cov-root{--bg:#eef1f3;--panel:#fff;--panel-2:#f6f8f9;--ink:#14181c;--ink-soft:#4a555d;--ink-faint:#8b969d;--line:#dde3e7;--line-soft:#e9edf0;--accent:#0f766e;--accent-soft:#d4ede9;--accent-ink:#0b5952;--done:#0f766e;--source-bg:#fbe4c9;--source:#b45309;--miss:#eef1f3;--miss-dot:#c4ccd1;--warn:#b45309;--warn-bg:#fdf1dd;--partial-bg:#fbe4c9;--shadow:0 1px 2px rgba(20,24,28,.06),0 8px 24px rgba(20,24,28,.06)}
  .cov-root *{box-sizing:border-box}
  .cov-root .wrap{max-width:1180px;margin:0 auto;padding:32px 22px 60px}
  .cov-root .eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-ink);font-weight:700;margin:0 0 10px}
  .cov-root h1{font-size:clamp(24px,3.4vw,32px);line-height:1.2;margin:0 0 8px;text-wrap:balance;letter-spacing:-.01em}
  .cov-root .sub{color:var(--ink-soft);margin:0;max-width:62ch}
  .cov-root .meta{color:var(--ink-faint);font-size:13px;margin-top:12px}
  .cov-root .meta code{background:var(--panel-2);padding:1px 6px;border-radius:6px;font-size:12px}
  .cov-root .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:24px 0 20px}
  .cov-root .tile{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;box-shadow:var(--shadow)}
  .cov-root .tile .num{font-size:30px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums;line-height:1.05}
  .cov-root .tile .num .of{font-size:17px;color:var(--ink-faint)}
  .cov-root .tile.accent .num{color:var(--accent-ink)}
  .cov-root .tile .lbl{color:var(--ink-soft);font-size:13px;margin-top:4px}
  .cov-root .tile .bar{height:6px;border-radius:99px;background:var(--miss);margin-top:12px;overflow:hidden}
  .cov-root .tile .bar>i{display:block;height:100%;background:var(--accent);border-radius:99px}
  .cov-root .legend{display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;margin:0 2px 20px;color:var(--ink-soft);font-size:13px}
  .cov-root .legend .k{display:inline-flex;align-items:center;gap:7px}
  .cov-root .sw{width:20px;height:20px;border-radius:6px;display:inline-grid;place-items:center;flex:none}
  .cov-root .sw.d{background:var(--done);color:#fff}.cov-root .sw.d svg{width:12px;height:12px}
  .cov-root .sw.s{background:var(--source-bg);color:var(--source);font-weight:800;font-size:11px}
  .cov-root .sw.p{background:var(--partial-bg);color:var(--source);font-weight:800}
  .cov-root .sw.m{background:var(--miss);border:1px solid var(--line)}.cov-root .sw.m::after{content:"";width:5px;height:5px;border-radius:99px;background:var(--miss-dot)}
  .cov-root .cboard{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;margin-bottom:20px}
  .cov-root .chead{padding:14px 18px;border-bottom:1px solid var(--line);display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .cov-root .chead h2{font-size:15px;margin:0;font-weight:800}
  .cov-root .cmeta{font-size:12.5px;color:var(--ink-faint);display:flex;gap:8px;align-items:center;font-variant-numeric:tabular-nums}
  .cov-root .cmeta .dot{opacity:.5}.cov-root .cmeta .warntext{color:var(--warn);font-weight:700}
  .cov-root .scroll{overflow-x:auto}
  .cov-root table{border-collapse:separate;border-spacing:0;width:100%}
  .cov-root th,.cov-root td{text-align:center}
  .cov-root .art{position:sticky;right:0;z-index:3;background:var(--panel);text-align:right;min-width:206px;max-width:206px;padding:11px 16px;border-inline-start:1px solid var(--line)}
  .cov-root thead .art{z-index:5;background:var(--panel-2)}
  .cov-root .ttl{font-weight:700;font-size:13.5px;line-height:1.4}
  .cov-root .chip{display:inline-block;margin-top:5px;margin-inline-start:0;font-size:10.5px;font-weight:700;padding:1px 7px;border-radius:99px;border:1px solid transparent}
  .cov-root .chip.warn{color:var(--warn);background:var(--warn-bg);border-color:color-mix(in srgb,var(--warn) 30%,transparent)}
  .cov-root .chip.accent{color:var(--accent-ink);background:var(--accent-soft);border-color:color-mix(in srgb,var(--accent) 30%,transparent)}
  .cov-root .chip.neutral{color:var(--ink-soft);background:var(--panel-2);border-color:var(--line)}
  .cov-root thead th.lang{background:var(--panel-2);position:sticky;top:0;z-index:2;padding:10px 0 9px;min-width:44px;border-bottom:1px solid var(--line)}
  .cov-root .lang .code{font-weight:800;font-size:12px;letter-spacing:.04em;text-transform:uppercase}
  .cov-root .lang .nm{font-size:10px;color:var(--ink-faint);margin-top:2px}
  .cov-root thead th.tot{background:var(--panel-2);position:sticky;top:0;z-index:2;border-bottom:1px solid var(--line);font-size:11px;color:var(--ink-soft);min-width:58px}
  .cov-root tbody td{padding:8px 0;border-top:1px solid var(--line-soft)}
  .cov-root tbody tr:hover td{background:color-mix(in srgb,var(--accent) 5%,transparent)}
  .cov-root tbody tr:hover .art{background:color-mix(in srgb,var(--accent) 7%,var(--panel))}
  .cov-root .cell{width:26px;height:26px;border-radius:7px;margin:0 auto;display:grid;place-items:center}
  .cov-root .cell.done{background:var(--done);color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15)}.cov-root .cell.done svg{width:14px;height:14px}
  .cov-root .cell.source{background:var(--source-bg);color:var(--source);border:1px solid color-mix(in srgb,var(--source) 40%,transparent);font-weight:800;font-size:11px}
  .cov-root .cell.partial{background:var(--partial-bg);color:var(--source);border:1px solid color-mix(in srgb,var(--source) 40%,transparent);font-weight:800;font-size:15px;line-height:1}
  .cov-root .cell.miss{background:var(--miss)}.cov-root .cell.miss::after{content:"";width:5px;height:5px;border-radius:99px;background:var(--miss-dot)}
  .cov-root .rowtot{font-variant-numeric:tabular-nums;font-weight:700;font-size:13px}
  .cov-root .rowtot small{color:var(--ink-faint);font-weight:500}
  .cov-root .rowtot.full{color:var(--accent-ink)}.cov-root .rowtot.low{color:var(--ink-faint)}
  .cov-root tfoot td{border-top:1px solid var(--line);padding:9px 0 12px;background:var(--panel-2)}
  .cov-root tfoot .art{background:var(--panel-2);font-weight:700;font-size:12.5px;color:var(--ink-soft)}
  .cov-root .covbar{width:30px;height:4px;border-radius:99px;background:var(--miss);margin:4px auto 0;overflow:hidden}.cov-root .covbar>i{display:block;height:100%;background:var(--accent)}
  .cov-root .covnum{font-size:11px;font-variant-numeric:tabular-nums;color:var(--ink-soft);font-weight:700}.cov-root .covnum.zero{color:var(--ink-faint);opacity:.5}
  .cov-root .notes{margin-top:22px;display:grid;gap:10px}
  .cov-root .note{display:flex;gap:10px;align-items:flex-start;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 15px;font-size:13.5px;color:var(--ink-soft);box-shadow:var(--shadow)}
  .cov-root .note b{color:var(--ink)}.cov-root .note code{background:var(--panel-2);padding:1px 5px;border-radius:5px;font-size:12px}
  .cov-root .note .ic{flex:none;width:20px;height:20px;border-radius:99px;display:grid;place-items:center;font-weight:800;font-size:12px;background:var(--accent-soft);color:var(--accent-ink)}
  .cov-root .note.warn .ic.warn{background:var(--warn-bg);color:var(--warn)}
  .cov-root .foot{text-align:center;color:var(--ink-faint);font-size:12px;margin-top:22px}
  @media (max-width:720px){.cov-root .stats{grid-template-columns:repeat(2,1fr)}}
  `;

  const html = `<style>${styles}</style>
  <div class="cov-root"><div class="wrap">
    <p class="eyebrow">ویدونزو · پوشش ترجمه‌ی محتوا</p>
    <h1>داشبورد پوشش ترجمه</h1>
    <p class="sub">هر ردیف یک سند و هر ستون یکی از ${fa(summary.localeCount)} زبان سایت است. سلول پُر یعنی نسخه‌ی بومی موجود است؛ سلول خالی یعنی هنوز ترجمه نشده. این گزارش هر بار از روی فایل‌های زنده‌ی مخزن ساخته می‌شود.</p>
    <p class="meta">به‌روزرسانی: ${esc(date)} (${esc(gregorian)}) · منبع: <code>src/content</code></p>
    <div class="stats">${tilesHtml}</div>
    <div class="legend">
      <span class="k"><span class="sw d">${CHECK}</span> ترجمه‌شده (استاندارد)</span>
      <span class="k"><span class="sw p">–</span> ترجمه‌شده، فرانت‌متر ناقص</span>
      <span class="k"><span class="sw s">م</span> منبع</span>
      <span class="k"><span class="sw m"></span> ترجمه‌نشده</span>
    </div>
    ${collections.map((c) => board(c, locales)).join('')}
    <div class="notes">${notes.join('')}</div>
    <p class="foot">ساخته‌شده از فایل‌های <code>.mdx</code> · <code>tool/lib/coverage.mjs</code></p>
  </div></div>`;

  return { html, styles };
}
