import { IngredientEntryDTO } from "./ingredient-entry.dto";
import { RecipePreviewDTO } from "./recipe-preview.dto";
export interface RecipeDTO extends RecipePreviewDTO{
    ingredients: IngredientEntryDTO[];
}