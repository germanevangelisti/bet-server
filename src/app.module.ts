import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entity/Team';
import { User } from './entity/User';
import { Season } from './entity/Season';
import { CombinedBet } from './entity/CombinedBet';
import { TeamModule } from './module/team.module';
import { SeasonModule } from './module/season.module';
import { CombinedBetModule } from './module/combinedBet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'sys',
      synchronize: true,
      logging: false,
      entities: [User, Team, Season, CombinedBet],
      migrations: [],
      subscribers: [],
    }),
    TeamModule,
    SeasonModule,
    CombinedBetModule,
  ],
})
export class AppModule {}
