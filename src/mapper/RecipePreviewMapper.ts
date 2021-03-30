
import { RatingInfoDTO } from "../models/DTOs/rating-info.dto";
import {RecipePreviewDTO} from "../models/DTOs/recipe-preview.dto"
import { Recipe } from "../models/entities/recipe";
export class RecipePreviewMapper{

    toDTO(item: Recipe): RecipePreviewDTO {
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
                author: item.author.username
    }
}
private calcRatingOfRecipe(recipe:Recipe):RatingInfoDTO{
    const length = recipe.ratings?.length;
    let sum =0;
    for(const rating of recipe.ratings){
        sum+= rating.stars;
    }
    const finalRating: RatingInfoDTO = {stars:0,votes:0};
    if(length>0){
        finalRating.stars= sum/length;
    }else{
        finalRating.stars =0;
    }
    finalRating.votes= length;

    return finalRating;
}
}
