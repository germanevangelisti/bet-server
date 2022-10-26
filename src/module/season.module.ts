import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonController } from '../controller/season.controller';
import { Season } from '../entity/Season';
import { SeasonService } from '../service/season.service';
import { TeamModule } from './team.module';

@Module({
  imports: [TypeOrmModule.forFeature([Season]), TeamModule, HttpModule],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
