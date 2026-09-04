import Fuse from "fuse.js";

const LOCATION_ALIASES = {
  banglore: "Bengaluru",
  bangalore: "Bengaluru",
  bengaluru: "Bengaluru",
  bombay: "Mumbai",
  mumbai: "Mumbai",
  calcutta: "Kolkata",
  kolkata: "Kolkata",
  madras: "Chennai",
  chennai: "Chennai",
  mysore: "Mysuru",
  mysuru: "Mysuru",
  pondicherry: "Puducherry",
  puducherry: "Puducherry",
  hyd: "Hyderabad",
  hydrabad: "Hyderabad",
  hyderabad: "Hyderabad",
  jaipur: "Jaipur",
  goa: "Goa",
  manali: "Manali",
  udaipur: "Udaipur",
  coorg: "Coorg",
  kodagu: "Coorg",
  munnar: "Munnar",
  pune: "Pune",
  jaisalmer: "Jaisalmer",
  alleppey: "Alleppey",
  alappuzha: "Alleppey",
  ooty: "Ooty",
  nainital: "Nainital",
  delhi: "New Delhi",
  "new delhi": "New Delhi",
  shimla: "Shimla",
  darjeeling: "Darjeeling",
  "port blair": "Port Blair",
  ahmedabad: "Ahmedabad",
  kochi: "Kochi",
  cochin: "Kochi",
  lonavala: "Lonavala",
  alibaug: "Alibaug",
  rishikesh: "Rishikesh",
  mussoorie: "Mussoorie",
  srinagar: "Srinagar",
  varanasi: "Varanasi",
  benares: "Varanasi",
  chandigarh: "Chandigarh",
};

const cityOf = (location) => String(location).split(",")[0].trim();

const wordsOf = (location) =>
  String(location)
    .split(/[\s,/&-]+/)
    .filter(Boolean);

const findLocationForCity = (locations, city) => {
  const needle = city.toLowerCase();
  return locations.find((location) => cityOf(location).toLowerCase() === needle)
    || locations.find((location) => cityOf(location).toLowerCase().startsWith(needle));
};

const startsWithQuery = (location, key) => {
  if (cityOf(location).toLowerCase().startsWith(key)) return true;
  return wordsOf(location).some((word) => word.toLowerCase().startsWith(key));
};

export const suggestLocations = (query, locations, limit = 8) => {
  if (!Array.isArray(locations) || locations.length === 0) return [];

  const q = String(query || "").trim();
  if (!q) return [];

  const key = q.toLowerCase();
  const ranked = [];
  const seen = new Set();
  const push = (location) => {
    if (!location || seen.has(location)) return;
    seen.add(location);
    ranked.push(location);
  };

  const aliasCity = LOCATION_ALIASES[key];
  if (aliasCity) push(findLocationForCity(locations, aliasCity));

  Object.entries(LOCATION_ALIASES).forEach(([alias, city]) => {
    if (alias.startsWith(key) && alias !== key) {
      push(findLocationForCity(locations, city));
    }
  });

  const prefixHits = locations.filter((location) => startsWithQuery(location, key));
  prefixHits.sort((a, b) => cityOf(a).localeCompare(cityOf(b)));
  prefixHits.forEach(push);

  if (ranked.length === 0 && key.length >= 4) {
    const fuse = new Fuse(locations, {
      keys: [
        {
          name: "city",
          getFn: (location) => cityOf(location),
        },
      ],
      threshold: 0.32,
      ignoreLocation: true,
      minMatchCharLength: 4,
    });

    fuse.search(q).forEach((result) => push(result.item));
  }

  return ranked.slice(0, limit);
};
