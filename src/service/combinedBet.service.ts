import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CombinedBet } from '../entity/CombinedBet';
import { TeamService } from './team.service';

@Injectable()
export class CombinedBetService {
  constructor(
    @InjectRepository(CombinedBet)
    private readonly combinedBetRepository: Repository<CombinedBet>,
    private readonly teamService: TeamService,
    private readonly httpService: HttpService,
  ) {}

  async getGamesByDate(date: string): Promise<any> {
    const { API_SPORTSDATA_URL, API_SPORTSDATA_KEY } = process.env;
    const gamesByDate = await this.httpService.axiosRef.get(
      `${API_SPORTSDATA_URL}GamesByDate/${date}?key=${API_SPORTSDATA_KEY}`,
    );
    const standingResponse = await this.httpService.axiosRef.get(
      `${API_SPORTSDATA_URL}Standings/2023?key=${API_SPORTSDATA_KEY}`,
    );
    const gamesByClass = await Promise.all(
      gamesByDate.data.map(async (game) => {
        // const homeTeam = await this.teamService.findClassByTeam(game.HomeTeam);
        // const awayTeam = await this.teamService.findClassByTeam(game.AwayTeam);
        // const homeTeamClass = homeTeam?.teamClass || '';
        // const awayTeamClass = awayTeam?.teamClass || '';
        const homeTeamID = game.HomeTeamID;
        const awayTeamID = game.AwayTeamID;

        const homeTeam = await standingResponse.data.filter(
          (team) => team.TeamID === homeTeamID,
        );
        const homeTeamClass =
          await this.teamService.getTeamClassStandingByWinnPerc(
            homeTeam[0]?.Percentage,
          );

        const awayTeam = await standingResponse.data.filter(
          (team) => team.TeamID === awayTeamID,
        );
        const awayTeamClass =
          await this.teamService.getTeamClassStandingByWinnPerc(
            awayTeam[0]?.Percentage,
          );

        const isPotentialPivotGame = this.teamService.getIsPotentialPivotGame(
          homeTeamClass,
          awayTeamClass,
        );

        return {
          gameID: game.GameID,
          status: game.Status,
          startsAt: game.DateTime,
          isPotentialPivotGame,
          homeTeam: {
            code: game.HomeTeam,
            score: game.HomeTeamScore,
            teamClass: homeTeamClass,
          },
          awayTeam: {
            code: game.AwayTeam,
            score: game.AwayTeamScore,
            teamClass: awayTeamClass,
          },
        };
      }),
    );

    return [
      {
        gamesByDate: gamesByClass,
      },
    ];
  }
}
