const USER_AGENT = "AIAirbnb/1.0 (student vacation-rental demo)";

const getAreaContext = async (location) => {
  const area = String(location || "").trim();

  if (!area) {
    return { area: "", extract: "", wikiTitle: "" };
  }

  try {
    const searchUrl = new URL("https://en.wikipedia.org/w/api.php");
    searchUrl.searchParams.set("action", "query");
    searchUrl.searchParams.set("list", "search");
    searchUrl.searchParams.set("srsearch", area);
    searchUrl.searchParams.set("srlimit", "1");
    searchUrl.searchParams.set("format", "json");
    searchUrl.searchParams.set("utf8", "1");

    const searchResponse = await fetch(searchUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(12000),
    });

    if (!searchResponse.ok) {
      return { area, extract: "", wikiTitle: "" };
    }

    const searchData = await searchResponse.json();
    const wikiTitle = searchData.query?.search?.[0]?.title || "";

    if (!wikiTitle) {
      return { area, extract: "", wikiTitle: "" };
    }

    const extractUrl = new URL("https://en.wikipedia.org/w/api.php");
    extractUrl.searchParams.set("action", "query");
    extractUrl.searchParams.set("prop", "extracts");
    extractUrl.searchParams.set("exintro", "1");
    extractUrl.searchParams.set("explaintext", "1");
    extractUrl.searchParams.set("titles", wikiTitle);
    extractUrl.searchParams.set("format", "json");
    extractUrl.searchParams.set("utf8", "1");

    const extractResponse = await fetch(extractUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(12000),
    });

    if (!extractResponse.ok) {
      return { area, extract: "", wikiTitle };
    }

    const extractData = await extractResponse.json();
    const pages = extractData.query?.pages || {};
    const page = Object.values(pages)[0];
    const extract = String(page?.extract || "").slice(0, 1200);

    return { area, wikiTitle, extract };
  } catch (error) {
    console.error("Area context fetch failed:", error.message);
    return { area, extract: "", wikiTitle: "" };
  }
};

module.exports = {
  getAreaContext,
};
