import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CombinedBetController } from '../controller/combinedBet.controller';
import { CombinedBet } from '../entity/CombinedBet';
import { CombinedBetService } from '../service/combinedBet.service';
import { TeamModule } from './team.module';

@Module({
  imports: [TypeOrmModule.forFeature([CombinedBet]), TeamModule, HttpModule],
  controllers: [CombinedBetController],
  providers: [CombinedBetService, Repository],
})
export class CombinedBetModule {}
