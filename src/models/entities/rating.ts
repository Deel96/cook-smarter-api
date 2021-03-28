import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {User} from "./user";
import {Recipe} from "./recipe";

@Entity()
export class Rating extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stars: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: string;

    @ManyToOne(()=>User,user => user.createdRatings)
    author:User

    @ManyToOne(()=>Recipe,recipe=>recipe.ratings)
    recipe:Recipe
}