import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('board')
export class BoardEntity {
    @PrimaryGeneratedColumn()
    board_no: number;

    @Column()
    category: string;

    @Column()
    thumbnail: string;

    @Column()
    writer: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    readcnt: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
