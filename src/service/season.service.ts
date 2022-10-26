import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from '../entity/Season';
import { TeamService } from './team.service';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
    private readonly httpService: HttpService,
    private readonly teamService: TeamService,
  ) {}

  async findCurrentSeason(): Promise<Season> {
    return this.seasonRepository.findOne({
      where: {
        description: '2022-23',
      },
    });
  }

  async getSeasonSchedule(): Promise<any> {
    const { API_SPORTSDATA_URL, API_SPORTSDATA_KEY } = process.env;

    return await this.httpService.axiosRef.get(
      `${API_SPORTSDATA_URL}Games/2023?key=${API_SPORTSDATA_KEY}`,
    );
  }

  async getTeamsStandingCurrentSeason(): Promise<any> {
    const { API_SPORTSDATA_URL, API_SPORTSDATA_KEY } = process.env;
    const standingResponse = await this.httpService.axiosRef.get(
      `${API_SPORTSDATA_URL}Standings/2023?key=${API_SPORTSDATA_KEY}`,
    );

    const teamsStanding = await Promise.all(
      standingResponse.data.map(async (team) => {
        const teamClass = await this.teamService.getTeamClassStandingByWinnPerc(
          team.Percentage,
        );
        const teamLogo = await this.teamService.findLogoByTeam(team.Key);
        const teamLogoValue = teamLogo?.logo || '';

        return {
          code: team.Key,
          logo: teamLogoValue,
          teamClass: teamClass,
          name: `${team.City} ${team.Name}`,
          record: `${team.Wins} - ${team.Losses}`,
          winningPerc: team.Percentage,
          streak: team.StreakDescription,
          conferenceRank: team.ConferenceRank,
        };
      }),
    );

    const contenderTeams = teamsStanding
      .filter((team) => team.teamClass === 'C')
      .sort((a, b) => a.conferenceRank - b.conferenceRank)
      .sort((a, b) => b.winningPerc - a.winningPerc);
    const mediumTeams = teamsStanding
      .filter((team) => team.teamClass === 'M')
      .sort((a, b) => a.conferenceRank - b.conferenceRank)
      .sort((a, b) => b.winningPerc - a.winningPerc);
    const looserTeams = teamsStanding
      .filter((team) => team.teamClass === 'L')
      .sort((a, b) => a.conferenceRank - b.conferenceRank)
      .sort((a, b) => b.winningPerc - a.winningPerc);

    return {
      contenderTeams,
      mediumTeams,
      looserTeams,
    };
  }
}
