import {Controller, Get} from '@nestjs/common';

@Controller('leaderboard')
export class LeaderboardController {
    @Get()
    getLeaderboard(): string {
        return "OK"
    }
}
