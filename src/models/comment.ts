import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {User} from "./user";

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({type:"date"})
    date: Date;

    @ManyToOne(()=>User,user=>user.createdComments)
    author:User
}