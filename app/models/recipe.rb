class Recipe < ApplicationRecord
  has_many :recipe_ingredients, class_name: 'RecipeIngredient'
  has_many :ingredients, through: :recipe_ingredients
end
  