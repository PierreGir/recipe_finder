require 'rails_helper'

RSpec.describe Api::RecipesController, type: :controller do
  before do
    # Create ingredients and recipes (not in order)
    @ingredient1 = create(:ingredient, name: 'one cup of ingredient_1, shredded')
    @ingredient2 = create(:ingredient, name: 'ingredient_2')
    @ingredient3 = create(:ingredient, name: 'a teaspoon of ingredient_3')
    @recipe1 = create(:recipe, ingredients: [@ingredient1])
    @recipe2 = create(:recipe, ingredients: [@ingredient3])
    @recipe3 = create(:recipe, ingredients: [@ingredient1, @ingredient2, @ingredient3])
    @recipe4 = create(:recipe, ingredients: [@ingredient1, @ingredient2])
    @recipe5 = create(:recipe, ingredients: [@ingredient1, @ingredient3])
  end

  describe 'GET #index' do
    it 'returns recipes sorted correctly' do
      # Make the API Call
      get :index, params: { ingredients: ['ingredient_1', 'ingredient_2'] }

      # Verify the order
      expect(response).to be_successful
      json_response = JSON.parse(response.body)
      expect(json_response.length).to eq(4)
      expect(json_response[0]['id']).to eq(@recipe4.id)
      expect(json_response[1]['id']).to eq(@recipe3.id)
      expect(json_response[2]['id']).to eq(@recipe1.id)
      expect(json_response[3]['id']).to eq(@recipe5.id)
    end

    it 'paginates correctly' do
      # Make the API Call
      get :index, params: { ingredients: ['ingredient_1', 'ingredient_2'], page: 2, per_page: 2 }

      # Verify the pagination
      expect(response).to be_successful
      json_response = JSON.parse(response.body)
      expect(json_response.length).to eq(2)
      expect(json_response[0]['id']).to eq(@recipe1.id)
      expect(json_response[1]['id']).to eq(@recipe5.id)
    end
  end
end
