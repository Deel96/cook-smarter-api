import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from "typeorm";
import {Tag} from "./tag";

@Entity()
export class Recipe extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    directions: string;

    @Column()
    preparationtime: number;

    @Column()
    cookingtime: number;

    @Column()
    difficulty: number;

    @Column()
    datePosted: string;

    @Column()
    online: boolean;

    @Column({default:"Test"})
    author:string;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];
}