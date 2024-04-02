import { BoardEntity } from 'src/domain/board/repository/board.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TagEntity } from './tag.entity';

@Entity('tag_mapping')
export class TagMappingEntity {
    @PrimaryGeneratedColumn()
    mapping_no: number;

    @ManyToOne(() => BoardEntity, (board) => board.tagMappings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'board_no', referencedColumnName: 'board_no' })
    board: BoardEntity;

    @ManyToOne(() => TagEntity, (tag) => tag.tagMappings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tag_no', referencedColumnName: 'tag_no' })
    tag: TagEntity;
}
