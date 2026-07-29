// A deliberately small YAML reader for content frontmatter.
//
// Astro parses the frontmatter it compiles; these are the tools that have to
// read the same headers *outside* the Astro build — the slug registry, the
// featured-image pipeline — and they should agree with each other exactly.
//
// The grammar is the one our articles actually use and nothing more: flat
// `key: value` pairs where a value is a quoted string, a bare scalar, or a flow
// array of those. Block sequences, nested maps, anchors and multi-line scalars
// are parse errors rather than something to interpret, so authored frontmatter
// cannot quietly drift into a shape the callers have never seen.

/**
 * @param {string} source  full file text
 * @param {(message: string) => void} report  called for each problem found
 * @returns {Record<string, string | string[]> | null}
 */
export function parseFrontmatter(source, report) {
  const lines = source.split(/\r?\n/);
  if (lines[0] !== '---') {
    report('file does not start with a `---` frontmatter block');
    return null;
  }
  const end = lines.indexOf('---', 1);
  if (end === -1) {
    report('frontmatter block is never closed');
    return null;
  }

  const data = {};
  for (let i = 1; i < end; i += 1) {
    const line = lines[i];
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue;
    if (/^\s/.test(line) || line.startsWith('- ')) {
      report(`frontmatter line ${i + 1} is not a flat \`key: value\` pair: ${line.trim()}`);
      return null;
    }
    const match = line.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (!match) {
      report(`frontmatter line ${i + 1} is not a \`key: value\` pair: ${line.trim()}`);
      return null;
    }
    const [, key, raw] = match;
    if (key in data) {
      report(`duplicate frontmatter field \`${key}\``);
      return null;
    }
    const value = raw.startsWith('[')
      ? parseFlowArray(raw, report, i + 1)
      : parseScalar(raw, report, i + 1);
    if (value === undefined) return null;
    data[key] = value;
  }
  return data;
}

function parseScalar(raw, report, line) {
  const text = raw.trim();
  if (text === '') return '';
  if (text[0] === '"' || text[0] === "'") {
    const quote = text[0];
    if (text.length < 2 || text.at(-1) !== quote) {
      report(`line ${line}: quoted value is not closed on the same line`);
      return undefined;
    }
    const body = text.slice(1, -1);
    return quote === '"' ? body.replace(/\\(["\\])/g, '$1') : body.replace(/''/g, "'");
  }
  if (/^[&*{|>]/.test(text)) {
    report(`line ${line}: YAML anchors, block scalars and flow maps are not allowed here`);
    return undefined;
  }
  if (/: /.test(text)) {
    report(`line ${line}: value contains ": " and must be wrapped in double quotes`);
    return undefined;
  }
  return text;
}

function parseFlowArray(raw, report, line) {
  const text = raw.trim();
  if (!text.endsWith(']')) {
    report(`line ${line}: flow array is not closed on the same line`);
    return undefined;
  }
  const inner = text.slice(1, -1).trim();
  if (inner === '') return [];

  const items = [];
  let rest = inner;
  while (rest.length > 0) {
    let item;
    if (rest[0] === '"' || rest[0] === "'") {
      const quote = rest[0];
      // Walk to the closing quote so a comma inside a value cannot split it.
      let i = 1;
      for (; i < rest.length; i += 1) {
        if (rest[i] === '\\' && quote === '"') i += 1;
        else if (rest[i] === quote) break;
      }
      if (i >= rest.length) {
        report(`line ${line}: flow array has an unterminated quoted item`);
        return undefined;
      }
      item = parseScalar(rest.slice(0, i + 1), report, line);
      rest = rest.slice(i + 1).trim();
      if (item === undefined) return undefined;
      items.push(item);
      if (rest.startsWith(',')) rest = rest.slice(1).trim();
      else if (rest !== '') {
        report(`line ${line}: unexpected text after a flow-array item: ${rest}`);
        return undefined;
      }
      continue;
    }
    const comma = rest.indexOf(',');
    const chunk = comma === -1 ? rest : rest.slice(0, comma);
    item = parseScalar(chunk, report, line);
    rest = comma === -1 ? '' : rest.slice(comma + 1).trim();
    if (item === undefined) return undefined;
    items.push(item);
  }
  return items;
}
