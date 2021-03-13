import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {Foodplan} from "./foodplan";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    servingsize: number;

    @Column()
    planday: string;

    @OneToMany(type => Foodplan, foodplan => foodplan.user) foodplans: Foodplan[];

}