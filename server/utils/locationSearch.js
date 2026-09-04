const LOCATION_ALIASES = {
  banglore: ["Bengaluru", "Bangalore"],
  bangalore: ["Bengaluru"],
  bengaluru: ["Bengaluru", "Bangalore"],
  bombay: ["Mumbai"],
  mumbai: ["Mumbai"],
  calcutta: ["Kolkata"],
  kolkata: ["Kolkata"],
  madras: ["Chennai"],
  chennai: ["Chennai"],
  mysore: ["Mysuru"],
  mysuru: ["Mysuru", "Mysore"],
  pondicherry: ["Puducherry"],
  puducherry: ["Puducherry"],
  hyd: ["Hyderabad"],
  hydrabad: ["Hyderabad"],
  hyderabad: ["Hyderabad"],
  jaipur: ["Jaipur"],
  goa: ["Goa"],
  manali: ["Manali"],
  udaipur: ["Udaipur"],
  coorg: ["Coorg"],
  kodagu: ["Coorg"],
  munnar: ["Munnar"],
  pune: ["Pune"],
  jaisalmer: ["Jaisalmer"],
  alleppey: ["Alleppey"],
  alappuzha: ["Alleppey"],
  ooty: ["Ooty"],
  udhagamandalam: ["Ooty"],
  nainital: ["Nainital"],
  delhi: ["Delhi"],
  "new delhi": ["Delhi"],
  shimla: ["Shimla"],
  darjeeling: ["Darjeeling"],
  "port blair": ["Port Blair"],
  ahmedabad: ["Ahmedabad"],
  kochi: ["Kochi"],
  cochin: ["Kochi"],
  lonavala: ["Lonavala"],
  alibaug: ["Alibaug"],
  rishikesh: ["Rishikesh"],
  mussoorie: ["Mussoorie"],
  srinagar: ["Srinagar"],
  varanasi: ["Varanasi"],
  benares: ["Varanasi"],
  chandigarh: ["Chandigarh"],
};

const escapeRegex = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const expandLocationTerms = (search) => {
  const raw = String(search || "").trim();
  if (!raw) return [];

  const terms = new Set([raw]);
  const key = raw.toLowerCase();

  if (LOCATION_ALIASES[key]) {
    LOCATION_ALIASES[key].forEach((term) => terms.add(term));
  }

  Object.entries(LOCATION_ALIASES).forEach(([alias, cities]) => {
    if (alias.startsWith(key) || key.startsWith(alias)) {
      cities.forEach((city) => terms.add(city));
    }
  });

  return [...terms];
};

module.exports = {
  LOCATION_ALIASES,
  escapeRegex,
  expandLocationTerms,
};
