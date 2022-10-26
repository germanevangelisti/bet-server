import { Controller, Get, Param } from '@nestjs/common';
import { CombinedBetService } from '../service/combinedBet.service';

@Controller()
export class CombinedBetController {
  constructor(private readonly combinedBetService: CombinedBetService) {}

  @Get('gamesByDate/:date')
  async getGamesByDate(@Param('date') date): Promise<any> {
    const data = await this.combinedBetService.getGamesByDate(date);

    return data[0];
  }
}
