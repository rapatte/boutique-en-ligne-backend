import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100})
    lastname: string;

    @Column({length: 100})
    firstname: string;

    @Column({length: 100})
    country: string;

    @Column({length: 100})
    city: string;

    @Column({length: 100})
    street: string;

    @Column({length: 100})
    postcode: string;

    @Column({length: 100, unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}