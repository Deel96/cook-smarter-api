import { RatingInfoDTO } from "./rating";
import { TagDTO } from "./tag.dto";

export interface RecipePreviewDTO{
    id:number;
    name: string;
    picture: string;
    rating: RatingInfoDTO;
    directions:string;
    preparationtime:number;
    cookingtime:number;
    difficulty: string;
    datePosted: Date;
    online: boolean;
    tags: TagDTO[];
    author:string;
    
}