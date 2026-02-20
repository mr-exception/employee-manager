import { Global, Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ConfigService } from './config.service';

config();

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
