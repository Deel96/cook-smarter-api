import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {User} from "./user";

@Entity()
export class Rating extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stars: string;

    @Column({type:"date"})
    date: string;

    @ManyToOne(()=>User,user => user.createdRatings)
    author:User
}