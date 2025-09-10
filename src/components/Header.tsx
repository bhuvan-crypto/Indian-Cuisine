import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { dishes } from "../dishes";

const Header = () => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Find dishes matching name, ingredients, or origin (state/region)
  const suggestions = useMemo(() => {
     return query.length === 0 ? [] : dishes.filter(dish => {
    const q = query.toLowerCase();
    return (
      dish.name.toLowerCase().includes(q) ||
      dish.ingredients.toLowerCase().includes(q) ||
      (dish.state && dish.state.toLowerCase().includes(q)) ||
      (dish.region && dish.region.toLowerCase().includes(q))
    );
  }).slice(0, 8)}, [query]);

  return (
    <header className="bg-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between shadow relative z-10">
      <h2 className="text-2xl font-bold mb-2 md:mb-0 cursor-pointer" onClick={() => navigate("/")}>Indian Dishes Explorer</h2>
      <div className="relative w-full md:w-96">
        <input
          ref={inputRef}
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Search dishes, ingredients, or origin..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setShow(true);
          }}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 150)}
        />
        {show && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto">
            {suggestions.map(dish => (
              <li
                key={dish.id}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                onMouseDown={() => {
                  setShow(false);
                  setQuery("");
                  navigate(`/dish/${dish.id}`);
                }}
              >
                {dish.name}
                <span className="block text-xs text-gray-500">{dish.state || dish.region || dish.ingredients.split(",")[0]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
