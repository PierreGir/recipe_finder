import React from 'react';

const Recipes = ({ recipes, expandedRecipe, selectedRecipeRef, onExpandIngredients }) => {
  return (
    <div className="container mx-auto my-10 px-5">
      <div className={`grid ${expandedRecipe ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-8`}>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className={`bg-white p-4 rounded-lg shadow-md ${expandedRecipe === recipe.id ? 'border-2 border-blue-500' : ''}`}
            ref={expandedRecipe === recipe.id ? selectedRecipeRef : null}
          >
            <img
              src={recipe.image}
              className={`w-full ${expandedRecipe ? 'h-96' : 'h-60'} object-cover mb-4 rounded-md`}
              alt={`Recipe: ${recipe.title}`}
            />
            <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Prep Time: {recipe.prep_time} mins</p>
              <p className="text-gray-600">Cook Time: {recipe.cook_time} mins</p>
            </div>
            <div className="flex justify-center mb-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={() => onExpandIngredients(recipe.id)}
              >
                {expandedRecipe === recipe.id ? 'Hide Ingredients' : 'View Ingredients'}
              </button>
            </div>
            {expandedRecipe === recipe.id && (
              <ul className="mt-4">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="text-gray-700">
                    - {ingredient.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
