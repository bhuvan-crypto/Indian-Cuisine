import React from "react";
import { useParams, Link } from "react-router-dom";
import { dishes, Dish } from "../dishes";

const DishDetails = () => {
  const { id } = useParams();
  // Since JSON data has no id, use name as unique param (or index)
  // Try to find by index if id is a number, else by name
  let dish: Dish | undefined;
  if (id) {
    const idx = Number(id);
    if (!isNaN(idx)) {
      dish = dishes[idx];
    } else {
      dish = dishes.find(d => d.name === id);
    }
  }

  if (!dish) {
    return (
      <div className="p-6 flex justify-center">
        <div className="bg-white rounded shadow p-6 w-full max-w-xl">
          <h3 className="text-2xl font-bold mb-4">Dish Not Found</h3>
          <Link to="/" className="text-blue-600 underline">Back to list</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white rounded shadow p-6 w-full max-w-xl">
        <h3 className="text-2xl font-bold mb-4">{dish.name}</h3>
        <div className="mb-2"><span className="font-semibold">Ingredients:</span> {dish.ingredients}</div>
        <div className="mb-2"><span className="font-semibold">Diet type:</span> {dish.diet}</div>
        <div className="mb-2"><span className="font-semibold">Preparation time:</span> {dish.prep_time} min</div>
        <div className="mb-2"><span className="font-semibold">Cooking time:</span> {dish.cook_time} min</div>
        <div className="mb-2"><span className="font-semibold">Flavor:</span> {dish.flavor_profile}</div>
        <div className="mb-2"><span className="font-semibold">Course:</span> {dish.course}</div>
        <div className="mb-2"><span className="font-semibold">State:</span> {dish.state || 'N/A'}</div>
        <div className="mb-2"><span className="font-semibold">Region:</span> {dish.region || 'N/A'}</div>
        
        <Link to="/" className="text-blue-600 underline mt-4 inline-block">Back to list</Link>
      </div>
    </div>
  );
};

export default DishDetails;
