import { TagEntity } from 'src/domain/tag/repository/tag.entity';
import { UserEntity } from 'src/domain/user/repository/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
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

    @ManyToMany(() => TagEntity)
    @JoinTable({
        name: 'tag_mapping',
        joinColumn: { name: 'board_no', referencedColumnName: 'board_no' },
        inverseJoinColumn: { name: 'tag_no', referencedColumnName: 'tag_no' }
    })
    tags: TagEntity[];
}
