import React, { useState } from 'react';

const RecipeList = () => {
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== '') {
      setIngredientList([...ingredientList, ingredient.trim()]);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredientList];
    updatedIngredients.splice(index, 1);
    setIngredientList(updatedIngredients);
  };

  const handleFetchRecipes = async () => {
    try {
      const queryString = ingredientList.map((ingredient) => `ingredients[]=${encodeURIComponent(ingredient)}`).join('&');
      const url = `http://localhost:3001/api/recipes?${queryString}`;
  
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
      setRecipes(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
      setError('Error fetching recipes. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter ingredient(s)"
          value={ingredient}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddIngredient}>
          Add
        </button>
      </div>

      <ul>
        {ingredientList.map((item, index) => (
          <li key={index}>
            {item}{' '}
            <button type="button" onClick={() => handleRemoveIngredient(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleFetchRecipes}>
        Search Recipes
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
