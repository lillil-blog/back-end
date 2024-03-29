import { Entity, PrimaryColumn } from 'typeorm';

@Entity('tag_mapping')
export class TagMappingEntity {
    @PrimaryColumn()
    board_no: number;

    @PrimaryColumn()
    tag_no: number;
}
