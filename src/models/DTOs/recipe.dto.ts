import { IngredientEntryDTO } from "./ingredient-entry.dto";
import { RatingInfoDTO } from "./rating";
import { RecipePreviewDTO } from "./recipe-preview.dto";
import { TagDTO } from "./tag.dto";

export interface RecipeDTO extends RecipePreviewDTO{
    ingredients: IngredientEntryDTO[];
}