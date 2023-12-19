import {Controller, Get} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {Public} from "../auth/constants";
import {User} from "../users/models/user.model";

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private usersService: UsersService) {
    }

    @Public()
    @Get()
    getLeaderboard(): Promise<User[]> {
        return this.usersService.getLeaderboard()
    }
}
