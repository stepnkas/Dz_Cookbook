import { createEvent, createStore } from "effector";
import { Recipe } from "../types/types";
import { createRecipeFx, getRecipeFx } from "../api/recipe";

export const $recipes = createStore<Recipe[]>([]);
export const $recipeId = createStore<string>('');

export const filterRecipes = createEvent<string>();
export const setRecipeId = createEvent<string>();

$recipes.on(createRecipeFx.doneData, (recipes, newRecipe) => [...recipes, newRecipe]);

$recipes.on(getRecipeFx.doneData, (_, recipes) => recipes);

$recipes.on(filterRecipes, (recipes, recipeId) => recipes.filter((recipe) => recipe.id !== recipeId));

$recipeId.on(setRecipeId, (_, recipesId) => recipesId);