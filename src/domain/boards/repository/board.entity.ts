import { TagMappingEntity } from 'src/domain/tags/repository/tag.mapping.entity';
import { UserEntity } from 'src/domain/users/repository/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { BoardLikeEntity } from './board.like.entity';

@Entity('board')
export class BoardEntity {
    @PrimaryGeneratedColumn()
    board_no: number;

    @Column()
    category: string;

    @Column()
    thumbnail: string;

    @Column()
    title: string;

    @Column()
    summary: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ default: 0 })
    readcnt: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //Transient Field, 좋아요 개수 저장용
    likecnt: number;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'writer', referencedColumnName: 'id' })
    writer: UserEntity;

    @OneToMany(() => TagMappingEntity, (tagMapping) => tagMapping.board)
    tagMappings: TagMappingEntity[];

    @OneToMany(() => BoardLikeEntity, (boardLike) => boardLike.board)
    boardLikes: BoardLikeEntity[];
}
