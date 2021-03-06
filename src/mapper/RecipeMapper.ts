import { IngredientEntryDTO } from "../models/DTOs/ingredient-entry.dto";
import { RatingInfoDTO } from "../models/DTOs/rating-info.dto";
import { RecipeDTO } from "../models/DTOs/recipe.dto";
import { Recipe } from "../models/entities/recipe";
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
}
private calcRatingOfRecipe(recipe:Recipe):RatingInfoDTO{
    const length = recipe.ratings?.length;
    if(!length){return {stars:0,votes:0} }
    let sum =0;
    for(const rating of recipe?.ratings){
        sum+= rating.stars;
    }
    const finalRating : RatingInfoDTO = {stars:0,votes:0};
    if(length>0){
        finalRating.stars= sum/length;
    }else{
        finalRating.stars =0;
    }
    finalRating.votes= length;

    return finalRating;
}
private insertIngredients(recipe:Recipe):IngredientEntryDTO[]{
    
        const allIngredients = [];
        if(!recipe.ingredients) {return allIngredients}
        for(const item of recipe?.ingredients){
            const result: IngredientEntryDTO = this.ingredientEntryMapper.toDTO(item);
            allIngredients.push(result);
        }
        return allIngredients;
}
}