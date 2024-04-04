import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from './board.entity';

@Entity('board_like')
export class BoardLikeEntity {
    @PrimaryGeneratedColumn()
    like_no: number;

    @Column()
    ip: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => BoardEntity, { nullable: false })
    @JoinColumn({ name: 'board_no', referencedColumnName: 'board_no' })
    board: BoardEntity;
}
