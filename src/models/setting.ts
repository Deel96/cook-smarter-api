import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {User} from "./user";
import {Recipe} from "./recipe";

@Entity()
export class Setting extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: string;

    @ManyToOne(()=>User,user=>user.createdComments)
    author:User

    @ManyToOne(()=>Recipe,recipe=>recipe.comments)
    recipe:Recipe
}