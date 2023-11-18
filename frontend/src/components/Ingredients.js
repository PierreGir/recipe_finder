import React, { useState } from 'react';

const Ingredients = ({ ingredientList, onAddIngredient, onRemoveIngredient }) => {
  const [ingredient, setIngredient] = useState('');

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== '') {
      onAddIngredient(ingredient.trim());
      setIngredient('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <label htmlFor="ingredient" className="text-sm font-medium">
        Ingredient
      </label>
      <div className="relative mt-2 rounded-md flex">
        <input
          type="text"
          name="ingredient"
          id="ingredient"
          className="w-full rounded-md py-1.5 pl-3 ring-1 ring-gray-300"
          placeholder="Enter ingredient"
          value={ingredient}
          onChange={handleInputChange}
        />
        <div className="ml-2">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            onClick={handleAddIngredient}
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-10 max-w-xs mx-auto">
        <ul>
          {ingredientList.map((item, index) => (
            <li key={index} className="flex justify-between items-center mt-2 rounded-md">
              <p className="ml-10 text-sm font-semibold leading-6 text-gray-900 text-right">{item}</p>
              <div className="mr-10">
                <button
                  type="submit"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400"
                  onClick={() => onRemoveIngredient(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    
  );
};

export default Ingredients;