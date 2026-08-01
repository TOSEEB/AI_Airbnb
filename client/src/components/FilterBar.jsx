const categories = [
  "All",
  "Featured",
  "Beach",
  "Cabin",
  "Luxury",
  "Cozy",
  "City",
  "Family",
];

const FilterBar = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 my-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-2 rounded-full border transition
            ${
              selected === category
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar; 