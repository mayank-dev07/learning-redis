import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getPhotos(@Query('id') id: string): Promise<Photo[]> {
    return await this.appService.getPhotos(id);
  }
}
