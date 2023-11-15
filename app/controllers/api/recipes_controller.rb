class Api::RecipesController < ApplicationController
    def index
        # Parameters
        ingredient_names = params[:ingredients]
        page = params[:page] || 1
        per_page = params[:per_page] || 10

        # Get all the recipes sorted with most matched ingredients and least other ingredients first
        matching_conditions = ingredient_names.map { |name| "LOWER(ingredients.name) LIKE '%#{name}%'" }.join(' OR ')
        sorted_recipes = Recipe
            .select("recipes.*,
                    COUNT(CASE WHEN #{matching_conditions} THEN 1 END) AS matching_count,
                    (SELECT COUNT(*) FROM recipe_ingredients ri2 WHERE ri2.recipe_id = recipes.id) AS total_ingredients")
            .joins(:ingredients)
            .where(matching_conditions)
            .group("recipes.id")
            .order(Arel.sql("matching_count DESC, (total_ingredients - matching_count) ASC"))
            .paginate(page: page, per_page: per_page)
  
      render json: sorted_recipes, include: 'ingredients'
    end

    # def index
    #     ingredient_names = params[:ingredients]

    #     # Get all the recipes that contain at least one of the ingredients
    #     recipes = Recipe.joins(:ingredients).where(
    #     ingredient_names.map { |ingredient| "LOWER(ingredients.name) LIKE ?" }.join(" OR "),
    #     *ingredient_names.map { |ingredient| "%#{ingredient}%" }
    #     ).distinct
    
    #     # Sort the recipes with most matched ingredients and least other ingredients first
    #     sorted_recipes = recipes.sort_by do |recipe|
    #     matched_ingredients = recipe.ingredients.count { |ingredient| ingredient_names.any? { |name| ingredient.name.downcase.include?(name) } }
    #     non_matched_ingredients = recipe.ingredients.count - matched_ingredients
    
    #     [-matched_ingredients, non_matched_ingredients]
    #     end
  
    #   render json: sorted_recipes, include: 'ingredients'
    # end

end
  