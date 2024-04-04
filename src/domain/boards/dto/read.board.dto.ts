import { ReadTagDTO } from 'src/domain/tags/dto/read.tag.dto';

export class ReadBoardDTO {
    board_no: number;

    category: string;

    thumbnail: string;

    title: string;

    content: string;

    readcnt: number;

    created_at: Date;

    updated_at: Date;

    likecnt: number;

    tags: ReadTagDTO[];
}
