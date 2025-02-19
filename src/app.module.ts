import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './communs/database/config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), EnterpriseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
