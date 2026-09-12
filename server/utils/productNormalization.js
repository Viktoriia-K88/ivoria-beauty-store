function getImageUrl(image) {
  return image?.cleaned_url || image?.url || null;
}

function getPreferredImage(images = []) {
  return (
    images.find((image) => image.is_main_image && getImageUrl(image)) ||
    images.find(
      (image) => image.shot_type === "packaging" && getImageUrl(image),
    ) ||
    images.find((image) => image.shot_type === "hero" && getImageUrl(image)) ||
    images.find((image) => getImageUrl(image)) ||
    null
  );
}

function formatSizeValue(value, unit) {
  const numericValue = Number(String(value).replace(",", "."));

  if (Number.isNaN(numericValue)) {
    return null;
  }

  const normalizedUnit = unit
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();

  return `${numericValue} ${normalizedUnit}`;
}

export function extractProductSize(value) {
  const text = String(value ?? "");

  const patterns = [
    /\b(\d+(?:[.,]\d+)?)\s*(ml)\b/i,
    /\b(\d+(?:[.,]\d+)?)\s*(g)\b/i,
    /\b(\d+(?:[.,]\d+)?)\s*(kg)\b/i,
    /\b(\d+(?:[.,]\d+)?)\s*(fl\.?\s*oz)\b/i,
    /\b(\d+(?:[.,]\d+)?)\s*(oz)\b/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      return formatSizeValue(match[1], match[2]);
    }
  }

  return null;
}

function cleanShadeValue(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
}

export function extractProductShade(value) {
  const text = String(value ?? "");

  const quotedAfterShade = text.match(
    /\bshade\s*(?:is|:|-)?\s*["'“”]([^"'“”]{1,40})["'“”]/i,
  );

  if (quotedAfterShade) {
    return cleanShadeValue(quotedAfterShade[1]);
  }

  const quotedBeforeShade = text.match(
    /["'“”]([^"'“”]{1,40})["'“”]\s+shade\b/i,
  );

  if (quotedBeforeShade) {
    return cleanShadeValue(quotedBeforeShade[1]);
  }

  const shadeCode = text.match(
    /\b([0-9]+[a-z0-9-]{0,5}|[a-z]+[0-9][a-z0-9-]{0,5})\s+shade\b/i,
  );

  if (shadeCode) {
    return cleanShadeValue(shadeCode[1]);
  }

  const labelledShade = text.match(
    /\bshade\s*[:|-]\s*([a-z0-9][a-z0-9-]*(?:\s+[a-z0-9][a-z0-9-]*){0,2})\b/i,
  );

  if (labelledShade) {
    return cleanShadeValue(labelledShade[1]);
  }

  return null;
}

export function enrichProductMetadata(product) {
  const productText = `${product.title || ""} ${product.description || ""}`;

  return {
    ...product,

    size: product.size || extractProductSize(productText),

    shade: product.shade || extractProductShade(productText),
  };
}

export function normalizeProduct(product, catalogCategory) {
  const images = [
    ...new Set(product.images?.map(getImageUrl).filter(Boolean) || []),
  ];

  const preferredImage = getPreferredImage(product.images);

  const offer =
    product.offers?.find((item) => item.price?.price != null) ||
    product.offers?.[0];

  const normalizedProduct = {
    id: product.id,

    title: product.title || "",

    brand: product.brands?.[0]?.name || "Unknown brand",

    description: product.description || "",

    image: getImageUrl(preferredImage),

    images,

    price: offer?.price?.price ?? null,

    compareAtPrice: offer?.price?.compare_at_price ?? null,

    currency: offer?.price?.currency || "USD",

    availability: offer?.availability || null,

    category: product.category?.title || null,

    gender: product.gender || null,

    catalogCategory,
  };

  return enrichProductMetadata(normalizedProduct);
}
