import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { DateRangeCalendar, parseYmd } from "./DateRangeCalendar";
import { getStayLocations } from "../api/stayApi";
import { suggestLocations } from "../utils/locationSuggest";

const formatRange = (checkIn, checkOut) => {
  const start = parseYmd(checkIn);
  const end = parseYmd(checkOut);

  if (!start) return "Add dates";

  const startLabel = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (!end) return startLabel;

  const endLabel = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${startLabel} – ${endLabel}`;
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const wrapRef = useRef(null);

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [openWhen, setOpenWhen] = useState(false);
  const [openWhere, setOpenWhere] = useState(false);
  const [locations, setLocations] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setLocation(params.get("location") || "");
    setCheckIn(params.get("checkIn") || "");
    setCheckOut(params.get("checkOut") || "");
    setGuests(params.get("guests") || "");
  }, [params]);

  useEffect(() => {
    let cancelled = false;

    getStayLocations()
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res?.data?.locations) ? res.data.locations : [];
        setLocations(list);
      })
      .catch(() => {
        if (!cancelled) setLocations([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const close = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpenWhen(false);
        setOpenWhere(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const suggestions = useMemo(
    () => suggestLocations(location, locations),
    [location, locations]
  );

  const runSearch = (destination) => {
    setOpenWhen(false);
    setOpenWhere(false);

    if (checkIn && checkOut && checkOut <= checkIn) {
      return;
    }

    const query = new URLSearchParams();
    if (destination.trim()) query.set("location", destination.trim());
    if (checkIn) query.set("checkIn", checkIn);
    if (checkOut) query.set("checkOut", checkOut);
    if (guests) query.set("guests", guests);

    navigate(`/?${query.toString()}`);

    setTimeout(() => {
      document.getElementById("stays-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 50);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const match =
      (openWhere && suggestions[activeIndex]) || suggestions[0] || location;
    if (match && match !== location) setLocation(match);
    runSearch(match);
  };

  const pickSuggestion = (value) => {
    setLocation(value);
    runSearch(value);
  };

  return (
    <div ref={wrapRef} className="relative w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row md:items-center bg-white border border-gray-200 rounded-full shadow-md"
      >
        <label className="relative flex-1 px-6 py-3 cursor-text">
          <span className="block text-xs font-semibold text-gray-900">Where</span>
          <input
            type="text"
            value={location}
            onChange={(e) => {
              const value = e.target.value;
              setLocation(value);
              setOpenWhere(value.trim().length > 0);
              setOpenWhen(false);
              setActiveIndex(0);
            }}
            onFocus={() => {
              setOpenWhere(location.trim().length > 0);
              setOpenWhen(false);
            }}
            onKeyDown={(e) => {
              if (!openWhere || suggestions.length === 0) return;

              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Escape") {
                setOpenWhere(false);
              }
            }}
            placeholder="Search destinations"
            autoComplete="off"
            className="w-full text-sm text-gray-600 outline-none bg-transparent"
          />
        </label>

        <div className="hidden md:block w-px self-stretch bg-gray-200 my-3" />

        <button
          type="button"
          onClick={() => {
            setOpenWhere(false);
            setOpenWhen((open) => !open);
          }}
          className={`flex-1 px-6 py-3 text-left rounded-full ${
            openWhen ? "bg-white shadow-md" : ""
          }`}
        >
          <span className="block text-xs font-semibold text-gray-900">When</span>
          <span className="block text-sm text-gray-500 truncate">
            {formatRange(checkIn, checkOut)}
          </span>
        </button>

        <div className="hidden md:block w-px self-stretch bg-gray-200 my-3" />

        <label className="flex-1 px-6 py-3 cursor-text">
          <span className="block text-xs font-semibold text-gray-900">Who</span>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Add guests"
            className="w-full text-sm text-gray-600 outline-none bg-transparent"
          />
        </label>

        <button
          type="submit"
          className="m-2 self-end md:self-center bg-rose-500 hover:bg-rose-600 text-white h-12 px-4 rounded-full flex items-center justify-center gap-2 shrink-0 font-medium"
        >
          <FaSearch />
          <span className="hidden md:inline">Search</span>
        </button>
      </form>

      {openWhere && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 md:right-auto md:w-[min(100%,22rem)] z-30 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2">
          {suggestions.map((place, index) => (
            <li key={place}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pickSuggestion(place)}
                className={`w-full text-left px-4 py-2.5 text-sm ${
                  index === activeIndex
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {place}
              </button>
            </li>
          ))}
        </ul>
      )}

      {openWhen && (
        <DateRangeCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(start, end) => {
            setCheckIn(start);
            setCheckOut(end);
            if (start && end) setOpenWhen(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
