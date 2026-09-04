const parsePlannerIntent = (prompt = "") => {
  const text = String(prompt).toLowerCase();
  const query = {};

  const budgetMatch =
    text.match(
      /(?:under|below|max|budget|less than|upto|up to)\s*(?:rs\.?|₹|inr)?\s*(\d[\d,]*)/i
    ) ||
    text.match(/₹\s*(\d[\d,]*)/) ||
    text.match(/(\d[\d,]*)\s*(?:rs|inr|rupees)?\s*(?:\/\s*)?(?:per night|night)/i);

  if (budgetMatch) {
    query.price = {
      $lte: Number(String(budgetMatch[1]).replace(/,/g, "")),
    };
  }

  const guestMatch = text.match(
    /(\d+)\s*(?:guest|guests|people|adults|persons|family members)/i
  );

  if (guestMatch) {
    query.guests = { $gte: Number(guestMatch[1]) };
  }

  return { query, text };
};

module.exports = { parsePlannerIntent };
