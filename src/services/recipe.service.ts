import {Recipe} from "../models/recipe";

class RecipeService {
    public async findAllRecipes(): Promise<Recipe[]> {

        const result = await Recipe.find();
        return result;
    }

    // public async findRecipeById(recipeId: number): Promise<Recipe> {
    //     const foundrecipe: Recipe = await Recipe.findOne({ where: { id: recipeId } });
    //     if (!foundrecipe) throw new HttpException(409, "You're not user");
    //
    //     return findUser;
    // }


}

export default RecipeService;
