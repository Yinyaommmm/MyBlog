import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello() {
    console.log(this.configService.get('DATABASE_URL'));
    console.log(process.env.DATABASE_URL);

    return {
      a: 1,
    };
  }
}
