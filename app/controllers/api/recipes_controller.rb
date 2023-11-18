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

        # Count all the recipes
        total_count = Recipe
            .joins(:ingredients)
            .where(matching_conditions)
            .group("recipes.id")
            .distinct
            .count
        response.headers['X-Total-Count'] = total_count.values.sum

        render json: sorted_recipes, include: 'ingredients'
    end
end
  