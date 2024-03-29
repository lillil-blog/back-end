import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    tag_no: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;
}
