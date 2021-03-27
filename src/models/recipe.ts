import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    AfterLoad, AfterInsert, AfterUpdate
} from "typeorm";
import {Tag} from "./tag";
import {IngredientEntry} from "./ingredientEntry";
import {User} from "./user";
import {Rating} from "./rating";
import {Comment} from "./comment";
import {RatingInfoDTO} from "./DTOs/rating-info.dto";

@Entity()
export class Recipe extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type:"longtext"})
    directions: string;

    @Column()
    preparationtime: number;

    @Column()
    cookingtime: number;

    @Column()
    difficulty: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    datePosted: Date;

    @Column()
    online: boolean;

    @Column({type:"longtext"})
    picture: string;

    @ManyToOne(()=>User,user => user.createdRecipes)
    author:User;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

    @OneToMany(()=>IngredientEntry, ingredientEntry => ingredientEntry.recipe,{onDelete: 'CASCADE', cascade: true })
    ingredients: IngredientEntry[];

    @OneToMany(()=>Comment, comment => comment.recipe,{onDelete: 'CASCADE'})
    comments: Comment[];

    @OneToMany(()=>Rating, rating => rating.recipe,{onDelete: 'CASCADE'})
    ratings: Rating[];

    rating: RatingInfoDTO


}