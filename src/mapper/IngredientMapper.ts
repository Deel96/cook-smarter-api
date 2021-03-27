
import { IngredientEntryDTO } from "../models/DTOs/ingredient-entry.dto";
import { IngredientEntry } from "../models/ingredientEntry";

export class IngredientEntryMapper{

    toDTO(item: IngredientEntry): IngredientEntryDTO {
        return {
                id:item.id,
                name: item.name,
               amount: item.amount,
               freshness : item.freshness,
               unit :item.unit
            }

    // toPersistence(u: RecipePreviewDTO): RecipePreview {
    //     return undefined;
    // }


}

}
