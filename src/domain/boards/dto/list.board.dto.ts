import { BoardEntity } from '../repository/board.entity';

export class ListBoardDTO {
    boards: Array<BoardEntity>;

    totalcnt: number;
}
