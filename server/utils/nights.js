const MS_PER_DAY = 24 * 60 * 60 * 1000;

const toUtcDay = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
};

const listingNights = (checkIn, checkOut) => {
  const start = toUtcDay(checkIn);
  const end = toUtcDay(checkOut);

  if (!start || !end || end <= start) {
    return [];
  }

  const nights = [];

  for (let time = start.getTime(); time < end.getTime(); time += MS_PER_DAY) {
    nights.push(new Date(time));
  }

  return nights;
};

const sameStayDates = (left, right) => {
  const leftIn = toUtcDay(left.checkIn);
  const leftOut = toUtcDay(left.checkOut);
  const rightIn = toUtcDay(right.checkIn);
  const rightOut = toUtcDay(right.checkOut);

  return (
    leftIn &&
    rightIn &&
    leftIn.getTime() === rightIn.getTime() &&
    leftOut.getTime() === rightOut.getTime()
  );
};

module.exports = {
  listingNights,
  sameStayDates,
  toUtcDay,
};
