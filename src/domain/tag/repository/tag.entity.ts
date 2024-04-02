import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagMappingEntity } from './tag.mapping.entity';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    tag_no: number;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => TagMappingEntity, (tagMapping) => tagMapping.tag)
    tagMappings: TagMappingEntity[];
}
