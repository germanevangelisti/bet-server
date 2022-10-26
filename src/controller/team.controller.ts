import { Controller, Get } from '@nestjs/common';
import { Team } from '../entity/Team';
import { TeamService } from '../service/team.service';

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/teams')
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get('/teamsbyclass')
  findByTeamClass(): Promise<Team[]> {
    return this.teamService.findByTeamClass('C');
  }

  @Get('/currentTeamsClass')
  async getCurrentTeamClass(): Promise<any> {
    const data = await this.teamService.getCurrentTeamsClass();

    return data[0] || 'Error';
  }
}
