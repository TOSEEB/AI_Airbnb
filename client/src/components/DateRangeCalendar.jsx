import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const toYmd = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseYmd = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date, count) =>
  new Date(date.getFullYear(), date.getMonth() + count, 1);

const isSameDay = (a, b) => a && b && toYmd(a) === toYmd(b);

const isBeforeToday = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

const MonthGrid = ({
  monthDate,
  checkIn,
  checkOut,
  hoverDate,
  onSelect,
  onHover,
}) => {
  const start = startOfMonth(monthDate);
  const startWeekday = start.getDay();
  const daysInMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  ).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
  }

  const startDate = parseYmd(checkIn);
  const endDate = parseYmd(checkOut) || (checkIn ? hoverDate : null);

  const inRange = (date) => {
    if (!startDate || !endDate) return false;
    const from = startDate <= endDate ? startDate : endDate;
    const to = startDate <= endDate ? endDate : startDate;
    return date > from && date < to;
  };

  return (
    <div className="w-full min-w-[260px]">
      <h3 className="text-center font-semibold mb-4">
        {monthDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
      </h3>

      <div className="grid grid-cols-7 mb-2 text-center text-xs text-gray-500">
        {WEEKDAYS.map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-10" />;
          }

          const disabled = isBeforeToday(date);
          const selected =
            isSameDay(date, startDate) || isSameDay(date, parseYmd(checkOut));
          const between = inRange(date);

          return (
            <button
              key={toYmd(date)}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              onMouseEnter={() => onHover(date)}
              className={`h-10 text-sm rounded-full transition ${
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : selected
                    ? "bg-gray-900 text-white font-semibold"
                    : between
                      ? "bg-gray-100"
                      : "hover:border hover:border-gray-900"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DateRangeCalendar = ({ checkIn, checkOut, onChange }) => {
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const [hoverDate, setHoverDate] = useState(null);

  const currentMonth = startOfMonth(new Date());
  const canGoBack = viewMonth > currentMonth;

  const nextMonth = useMemo(() => addMonths(viewMonth, 1), [viewMonth]);

  const selectDate = (date) => {
    const value = toYmd(date);

    if (!checkIn || (checkIn && checkOut)) {
      onChange(value, "");
      return;
    }

    if (value <= checkIn) {
      onChange(value, "");
      return;
    }

    onChange(checkIn, value);
  };

  return (
    <div className="absolute left-1/2 z-50 mt-3 w-[min(92vw,720px)] -translate-x-1/2 rounded-3xl bg-white p-6 shadow-2xl border border-gray-100">
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full bg-gray-100 p-1 text-sm font-medium">
          <span className="px-5 py-2 rounded-full bg-white shadow-sm">Dates</span>
          <span className="px-5 py-2 text-gray-500">Flexible</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          disabled={!canGoBack}
          onClick={() => setViewMonth(addMonths(viewMonth, -1))}
          className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
        >
          <FaChevronLeft size={12} />
        </button>
        <button
          type="button"
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          <FaChevronRight size={12} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MonthGrid
          monthDate={viewMonth}
          checkIn={checkIn}
          checkOut={checkOut}
          hoverDate={hoverDate}
          onSelect={selectDate}
          onHover={setHoverDate}
        />
        <MonthGrid
          monthDate={nextMonth}
          checkIn={checkIn}
          checkOut={checkOut}
          hoverDate={hoverDate}
          onSelect={selectDate}
          onHover={setHoverDate}
        />
      </div>
    </div>
  );
};

export { DateRangeCalendar, toYmd, parseYmd };
