const CHANNEL3_API_URL = "https://api.trychannel3.com/v1/search";

const BEAUTY_CATEGORY_ID = "r7g";

export function isChannel3FetchEnabled() {
  return process.env.CHANNEL3_FETCH_ENABLED !== "false";
}

export async function fetchChannel3Products(query) {
  if (!isChannel3FetchEnabled()) {
    console.log(`Channel3 fetch blocked: "${query}"`);

    return [];
  }

  if (!process.env.CHANNEL3_API_KEY) {
    throw new Error("CHANNEL3_API_KEY is missing");
  }

  const response = await fetch(CHANNEL3_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      "x-api-key": process.env.CHANNEL3_API_KEY,
    },

    body: JSON.stringify({
      query,

      limit: 30,

      filters: {
        category_ids: [BEAUTY_CATEGORY_ID],

        availability: ["InStock"],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Channel3 request failed: ${response.status}`);
  }

  const data = await response.json();

  return data.products || [];
}
