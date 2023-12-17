import {Controller, Get, Request, Req} from '@nestjs/common';

@Controller('leaderboard')
export class LeaderboardController {
    @Get()
    getLeaderboard(@Req() request: Request): string {
        return request["user"]["username"]
    }
}
