import { Injectable } from '@nestjs/common';
import { GET } from './axios/request';

@Injectable()
export class AppService {
  async getPhotos(): Promise<Photo[]> {
    const response = await GET('https://jsonplaceholder.typicode.com/photos');

    return response;
  }
}
