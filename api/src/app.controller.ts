import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  heartbeat() {
    return { ok: true, time: Date.now };
  }
}
