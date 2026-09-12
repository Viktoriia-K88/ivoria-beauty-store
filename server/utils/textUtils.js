export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[®™©]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function containsAny(value, words) {
  const normalizedValue = normalizeText(value);

  return words.some((word) => normalizedValue.includes(normalizeText(word)));
}

export function containsAnyWholePhrase(value, phrases) {
  const normalizedValue = ` ${normalizeText(value)} `;

  return phrases.some((phrase) => {
    const normalizedPhrase = normalizeText(phrase);

    return normalizedValue.includes(` ${normalizedPhrase} `);
  });
}
