import { Controller, Get } from '@nestjs/common';
import { Season } from '../entity/Season';
import { SeasonService } from '../service/season.service';

@Controller()
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get('/currentSeason')
  findAll(): Promise<Season> {
    return this.seasonService.findCurrentSeason();
  }

  @Get('/seasonSchedule')
  async getSeasonSchedule(): Promise<any> {
    const response = await this.seasonService.getSeasonSchedule();

    return response.data;
  }

  @Get('/teamsStanding')
  async getTeamsStandingCurrentSeason(): Promise<any> {
    return this.seasonService.getTeamsStandingCurrentSeason();
  }
}
