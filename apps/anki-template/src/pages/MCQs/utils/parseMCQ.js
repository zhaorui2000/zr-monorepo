const OPTION_PATTERN = /^\s*([A-D])\s*(?:[.．、:：)）]|$)\s*(.*)$/i;

/** @param {string} content */
function normalizeContent(content) {
  return content
    .replace(/^\uFEFF/, "")
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|li|h[1-6])\s*>/gi, "\n")
    .replace(/<\s*(?:p|div|li|h[1-6])\b[^>]*>/gi, "\n")
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, code) =>
      String.fromCodePoint(
        code[0].toLowerCase() === "x"
          ? parseInt(code.slice(1), 16)
          : Number(code),
      ),
    )
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** @param {string} content */
export function parseMCQ(content) {
  const lines = normalizeContent(content).split("\n");
  const firstOptionIndex = lines.findIndex((line) => OPTION_PATTERN.test(line));

  if (firstOptionIndex < 0) return null;

  const question = lines.slice(0, firstOptionIndex).join("\n").trim();
  /** @type {Record<string, string>} */
  const options = {};
  let currentLabel = "";

  for (const line of lines.slice(firstOptionIndex)) {
    const match = line.match(OPTION_PATTERN);
    if (match) {
      currentLabel = match[1].toUpperCase();
      if (options[currentLabel] !== undefined) return null;
      options[currentLabel] = match[2].trim();
    } else if (currentLabel) {
      options[currentLabel] = `${options[currentLabel]}\n${line.trim()}`.trim();
    }
  }

  if (!question || ["A", "B", "C", "D"].some((label) => !options[label])) {
    return null;
  }

  return { question, options };
}
