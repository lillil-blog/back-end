import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_no: number;

    @Column({ unique: true })
    id: string;

    @Column()
    password: string;

    @Column()
    thumbnail: string;

    @Column()
    introduce: string;

    @CreateDateColumn()
    created_at: Date;
}
