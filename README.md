# Recipe Finder User Stories

1.  **Inputting and Editing Ingredients:**
As a user, I want to input the ingredients that I have into a list that I can edit. 

2.  **Browsing Relevant Recipes:**
As a user, I want to browse through a list of relevant recipes based on the inputted ingredients. The list should be sorted from most relevant to least relevant.

3.  **Viewing Ingredients for Selected Recipe:**
As a user, I want to be able to view the ingredients required for each recipe that I select. 

# Database Structure : 

## Table: ingredients

- **Fields:**
  - `name` (String)
  - `created_at` (Datetime)
  - `updated_at` (Datetime)

## Table: recipe_ingredients

- **Fields:**
  - `recipe_id` (Bigint, foreign key referencing `recipes` table)
  - `ingredient_id` (Bigint, foreign key referencing `ingredients` table)
  - `created_at` (Datetime)
  - `updated_at` (Datetime)

- **Indexes:**
  - `index_recipe_ingredients_on_ingredient_id`
  - `index_recipe_ingredients_on_recipe_id`

## Table: recipes

- **Fields:**
  - `title` (String)
  - `cook_time` (Integer)
  - `prep_time` (Integer)
  - `ratings` (Float)
  - `cuisine` (String)
  - `category` (String)
  - `author` (String)
  - `image` (String)
  - `created_at` (Datetime)
  - `updated_at` (Datetime)

## Foreign Keys

- `recipe_ingredients` table has foreign keys:
  - `ingredient_id` references `ingredients` table
  - `recipe_id` references `recipes` table

# Getting Started Locally

## Using Docker:

1. Make sure you have Docker installed on your machine.
2. Open a terminal and navigate to the project directory.
3. Run the following commands:

```bash
docker-compose up
docker exec -it recipe_finder-rails-1 bundle exec rails db:migrate
docker exec -it recipe_finder-rails-1 bundle exec rails db:seed
```

## Running Rails and React Apps Separately:

1. Ensure that you have MySQL running on localhost with the specified requirements in the provided `docker-compose.yml` file.
2. Open a terminal and navigate to the project directory.
3. Run the following commands:

```bash
bundle install
rails db:migrate
rails db:seed
rails s -p 3001
```

4. Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm start
```

Now, you should have the Rails API server running on http://localhost:3001 and the React app running on http://localhost:3000. You can access the application through your web browser at http://localhost:3000.

## Running Tests:

1. Ensure you have a recipe_finder_dev database created.
2. Run the following command to execute RSpec tests:

```bash
rspec
```