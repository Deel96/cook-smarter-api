import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Tag extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    name: string;

    @Column()
    description: string;
}