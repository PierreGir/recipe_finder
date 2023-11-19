import React, { useState, useEffect, useRef } from 'react';
import Ingredients from './Ingredients';
import Pagination from './Pagination';
import Recipes from './Recipes';

const RecipeFinder = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 6;
  const selectedRecipeRef = useRef(null);

  const handleAddIngredient = (newIngredient) => {
    setIngredientList([...ingredientList, newIngredient]);
    setRecipes([]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredientList];
    updatedIngredients.splice(index, 1);
    setIngredientList(updatedIngredients);
    setRecipes([]);
  };

  const handleExpandIngredients = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);

    setTimeout(() => {
      if (selectedRecipeRef.current) {
        selectedRecipeRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  const handleFetchRecipes = async () => {
    try {
      setExpandedRecipe(null);
      const queryString = ingredientList.map((ingredient) => `ingredients[]=${encodeURIComponent(ingredient)}`).join('&');
      const paginationParams = `page=${currentPage}&per_page=${itemsPerPage}`;
      const baseUrl = process.env.NODE_ENV === 'production' ? 'https://recipe-finder-pierreg-rails.fly.dev' : 'http://localhost:3001';
      const url = `${baseUrl}/api/recipes?${queryString}&${paginationParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching recipes. Please try again.');
      }

      const data = await response.json();
      const totalCount = parseInt(response.headers.get('X-Total-Count'), 10);

      if (data.length === 0) {
        setError('No recipes found.');
      } else {
        setRecipes(data);
        setTotalCount(totalCount);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
      setError('Error fetching recipes. Please try again.');
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (currentPage && ingredientList.length > 0) {
      handleFetchRecipes();
    }
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow my-4 mb-4 mx-auto w-3/4 rounded-lg bg-gray-100">
        <h2 className="text-center pt-24 pb-16 text-4xl font-bold text-blue-500">Recipe Finder</h2>

        <Ingredients
          ingredientList={ingredientList}
          onAddIngredient={handleAddIngredient}
          onRemoveIngredient={handleRemoveIngredient}
        />

        <div className="mt-10 max-w-xs mx-auto">
          {ingredientList.length > 0 && (
            <button
              type="submit"
              className="mt-10 block w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
              onClick={handleFetchRecipes}
            >
              Search Recipes
            </button>
          )}
        </div>

        {error && (
          <p className="text-center text-lg font-bold text-red-600 mt-4">
            {error}
          </p>
        )}

        <Recipes
          recipes={recipes}
          expandedRecipe={expandedRecipe}
          selectedRecipeRef={selectedRecipeRef}
          onExpandIngredients={handleExpandIngredients}
        />

        {recipes.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeFinder;
