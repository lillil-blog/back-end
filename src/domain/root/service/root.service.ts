import { Injectable } from '@nestjs/common';
import { ReadBoardDTO } from 'src/domain/boards/dto/read.board.dto';
import { BoardRepository } from 'src/domain/boards/repository/board.repository';
import { ReadUserDTO } from 'src/domain/users/dto/read.user.dto';
import { UserRepository } from 'src/domain/users/repository/user.repository';

@Injectable()
export class RootService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly boardRepository: BoardRepository
    ) {}

    async getMainPageProps(count: number) {
        const userEntities: ReadUserDTO[] = await this.userRepository.listAllUsers();
        const boardEntities: ReadBoardDTO[] = await this.boardRepository.listRecent(count);

        const props = Object.assign({ users: userEntities }, { boards: boardEntities });

        console.log(props);

        return props;
    }
}
