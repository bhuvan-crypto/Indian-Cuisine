import { useMemo, useState } from "react";
import { dishes } from "../dishes";

// Collect all unique ingredients from all dishes
const allIngredients = Array.from(
  new Set(
    dishes.flatMap(d =>
      d.ingredients
        .split(",")
        .map(i => i.trim().toLowerCase())
    )
  )
).sort();

const DishSuggester = () => {
  const [selected, setSelected] = useState<string[]>([]);

  // Dishes that can be made with ALL selected ingredients
  const possibleDishes = useMemo(() => {
    if (selected.length === 0) return [];
    return dishes.filter(dish => {
      const dishIngredients = dish.ingredients
        .split(",")
        .map(i => i.trim().toLowerCase());
      return selected.every(sel => dishIngredients.includes(sel));
    });
  }, [selected]);

  const toggleIngredient = (ingredient: string) => {
    setSelected(sel =>
      sel.includes(ingredient)
        ? sel.filter(i => i !== ingredient)
        : [...sel, ingredient]
    );
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white rounded shadow p-6 w-full max-w-xl">
        <h3 className="text-2xl font-bold mb-4">Dish Suggester</h3>
        <div className="mb-4">
          <div className="font-semibold mb-2">Select available ingredients:</div>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border p-2 rounded bg-gray-50">
            {allIngredients.map(ing => (
              <button
                key={ing}
                className={`px-2 py-1 rounded border text-sm ${selected.includes(ing) ? 'bg-blue-600 text-white' : 'bg-white'}`}
                onClick={() => toggleIngredient(ing)}
                type="button"
              >
                {ing}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">Possible dishes:</div>
          {selected.length === 0 ? (
            <div className="text-gray-500">Select ingredients to see suggestions.</div>
          ) : possibleDishes.length === 0 ? (
            <div className="text-red-500">No dishes found with all selected ingredients.</div>
          ) : (
            <ul className="list-disc pl-5">
              {possibleDishes.map(dish => (
                <li key={dish.id} className="mb-1">
                  <a href={`/dish/${dish.id}`} className="text-blue-600 underline">{dish.name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishSuggester;
