import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get mongoUri(): string {
    return process.env.MONGO_URI!;
  }

  get port(): number {
    return parseInt(process.env.PORT ?? '3000');
  }
}
