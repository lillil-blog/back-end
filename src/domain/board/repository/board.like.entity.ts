import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity('board_like')
export class BoardLikeEntity {
    @Column()
    board_no: number;

    @Column()
    ip: string;

    @CreateDateColumn()
    created_at: Date;
}
