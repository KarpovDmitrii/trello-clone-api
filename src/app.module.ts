import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module'
import { ModelsModule } from './database/models/database-models.module';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    ModelsModule,
    UsersModule,
    ColumnsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
