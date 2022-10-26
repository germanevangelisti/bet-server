import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from '../controller/team.controller';
import { Team } from '../entity/Team';
import { TeamService } from '../service/team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService, TypeOrmModule],
})
export class TeamModule {}
