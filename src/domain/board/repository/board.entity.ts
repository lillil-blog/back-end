import { TagEntity } from 'src/domain/tag/repository/tag.entity';
import { TagMappingEntity } from 'src/domain/tag/repository/tag.mapping.entity';
import { UserEntity } from 'src/domain/user/repository/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

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

    @Column({ type: 'text' })
    content: string;

    @Column({ default: 0 })
    readcnt: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'writer', referencedColumnName: 'id' })
    writer: UserEntity;

    @OneToMany(() => TagMappingEntity, (tagMapping) => tagMapping.board)
    tagMappings: TagMappingEntity[];
}
