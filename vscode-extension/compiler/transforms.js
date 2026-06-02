/**
 * v0.1 parser for object-literal map entries:
 * "A": "a.svg", "B": "b.svg"
 */
function parseMapEntries(objectLiteral) {
  const pairPattern = /"([^"\\]+)"\s*:\s*"([^"\\]+)"/g;
  const entries = [];
  let match = pairPattern.exec(objectLiteral);

  while (match) {
    entries.push({ key: match[1], value: match[2] });
    match = pairPattern.exec(objectLiteral);
  }

  return entries;
}

export function transformMap(input) {
  const assignMapPattern = /\{%\s*assign\s+([a-zA-Z_]\w*)\s*=\s*\{([\s\S]*?)\}\s*%\}/g;

  return String(input).replace(assignMapPattern, (fullMatch, variableName, objectBody) => {
    const entries = parseMapEntries(objectBody);
    if (entries.length === 0) {
      return fullMatch;
    }

    const whenBlocks = entries
      .map((entry) => `{% when "${entry.key}" %} ${entry.value}`)
      .join("\n");

    return `{% case ${variableName} %}\n${whenBlocks}\n{% endcase %}`;
  });
}

export function transformLxIf(input) {
  const lxIfPattern = /\{%\s*lx-if\s+(.+?)\s+"([^"]*)"\s+"([^"]*)"\s*%\}/g;

  return String(input).replace(lxIfPattern, (_fullMatch, condition, truthyText, falsyText) => {
    return `{% if ${condition.trim()} %} ${truthyText} {% else %} ${falsyText} {% endif %}`;
  });
}

export const DEFAULT_TRANSFORMS = [transformMap, transformLxIf];
