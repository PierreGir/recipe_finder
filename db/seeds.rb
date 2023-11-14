# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'json'
require_relative '../app/models/recipe'
require_relative '../app/models/ingredient'

recipes_data = JSON.parse(File.read(Rails.root.join('db', 'recipes-en.json')))

recipes_data.each do |recipe_data|
  # Create recipe record
  recipe = Recipe.create!(
    title: recipe_data['title'],
    cook_time: recipe_data['cook_time'],
    prep_time: recipe_data['prep_time'],
    ratings: recipe_data['ratings'],
    cuisine: recipe_data['cuisine'],
    category: recipe_data['category'],
    author: recipe_data['author'],
    image: recipe_data['image']
  )

  # Create ingredients and associate with the recipe
  recipe_data['ingredients'].each do |ingredient_name|
    ingredient = Ingredient.find_or_create_by(name: ingredient_name)
    recipe.ingredients << ingredient
  end

  puts "Added Recipe: #{recipe.title} (ID: #{recipe.id})"
end
