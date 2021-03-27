
import { IngredientEntryDTO } from "../models/DTOs/ingredient-entry.dto";
import { RatingInfo } from "../models/DTOs/rating";
import {RecipePreviewDTO} from "../models/DTOs/recipe-preview.dto"
import { RecipeDTO } from "../models/DTOs/recipe.dto";
import { Recipe } from "../models/recipe";
import { IngredientEntryMapper } from "./IngredientMapper";
export class RecipeMapper{
    private ingredientEntryMapper = new IngredientEntryMapper();

    toDTO(item: Recipe): RecipeDTO {
        return {
                id:item.id,
                name: item.name,
                picture: item.picture,
                rating: this.calcRatingOfRecipe(item),
                directions:item.directions,
                preparationtime:item.preparationtime,
                cookingtime:item.cookingtime,
                difficulty: item.difficulty,
                datePosted: item.datePosted,
                online: item.online,
                tags : item.tags,
                ingredients: this.insertIngredients(item),
                author: item.author.username
    }

    // toPersistence(u: RecipePreviewDTO): RecipePreview {
    //     return undefined;
    // }


}
private calcRatingOfRecipe(recipe:Recipe):RatingInfo{
    //if(!recipe.rating) return new RatingInfo();
    const length = recipe.ratings?.length;
    let sum =0;
    for(const rating of recipe.ratings){
        sum+= rating.stars;
    }
    const finalRating = new RatingInfo();
    if(length>0){
        finalRating.rating= sum/length;
    }else{
        finalRating.rating =0;
    }
    finalRating.votes= length;

    return finalRating;
}
private insertIngredients(recipe:Recipe):IngredientEntryDTO[]{
    
        const allIngredients = [];
        for(const item of recipe.ingredients){
            const result: IngredientEntryDTO = this.ingredientEntryMapper.toDTO(item);
            allIngredients.push(result);
        }
        return allIngredients;
}
}
