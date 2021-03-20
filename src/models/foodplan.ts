import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    OneToOne, JoinColumn
} from "typeorm";
import {User} from "./user";
import {Grocerylist} from "./grocerylist";
import {Cookday} from "./cookday";

@Entity()
export class Foodplan extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    startDate: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    endDate: Date;

    @OneToOne(type => User, user => user.foodplan)
    @JoinColumn()
    user: User;

    @OneToMany(()=>Grocerylist,grocerylist=>grocerylist.foodplan)
    grocerylists: Grocerylist[];

    @OneToMany(()=>Cookday,cookday=>cookday.foodplan)
    cookdays: Cookday[];
}