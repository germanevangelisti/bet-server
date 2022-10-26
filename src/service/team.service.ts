import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entity/Team';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async findByTeamClass(teamClass: string): Promise<Team[]> {
    return this.teamRepository.find({
      where: {
        teamClass,
      },
    });
  }

  async findClassByTeam(team: string): Promise<Team> {
    return this.teamRepository.findOne({
      select: {
        teamClass: true,
      },
      where: {
        code: team,
      },
    });
  }

  async findLogoByTeam(team: string): Promise<Team> {
    return this.teamRepository.findOne({
      select: {
        logo: true,
      },
      where: {
        code: team,
      },
    });
  }

  async getTeamClassStandingByWinnPerc(winningPerc: number): Promise<string> {
    if (winningPerc <= 0.35) return 'L';
    if (winningPerc > 0.35 && winningPerc < 0.6) return 'M';
    if (winningPerc > 0.61) return 'C';
  }

  getIsPotentialPivotGame(
    homeTeamClass: string,
    awayTeamClass: string,
  ): boolean {
    if (homeTeamClass === 'C' && awayTeamClass === 'L') return true;
    if (awayTeamClass === 'C' && homeTeamClass === 'L') return true;
    if (homeTeamClass === 'L' && awayTeamClass === 'C') return true;
    if (homeTeamClass === 'L' && awayTeamClass === 'M') return true;
    if (awayTeamClass === 'L' && homeTeamClass === 'C') return true;
    if (awayTeamClass === 'L' && homeTeamClass === 'M') return true;
    return false;
  }

  async getCurrentTeamsClass(): Promise<any> {
    const currentContenderTeams = await this.findByTeamClass('C');
    const currentMediumTeams = await this.findByTeamClass('M');
    const currentLooserTeams = await this.findByTeamClass('L');

    return [
      {
        currentContenderTeams,
        currentMediumTeams,
        currentLooserTeams,
      },
    ];
  }
}
