import { CACHE_MANAGER, Inject, Injectable, Query } from '@nestjs/common';
import { GET } from './axios/request';
import { Cache } from 'cache-manager';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly redis: Cache) {}

  async getPhotos(@Query('id') id: string): Promise<Photo[]> {
    const key = id ? `photos::${id}` : 'photos';

    console.log('key', key);

    const cachedPhotos = await this.redis.get(key);
    if (cachedPhotos) {
      return JSON.parse(cachedPhotos);
    }

    const response = await GET('https://jsonplaceholder.typicode.com/photos');

    if (!id) {
      await this.redis.set('photos', JSON.stringify(response), { ttl: 60 });
      return response;
    }

    const filteredResponse = response.filter(
      (photo: Photo) => photo.albumId === Number(id),
    );

    await this.redis.set(key, JSON.stringify(filteredResponse), {
      ttl: 60,
    });
    return filteredResponse;
  }
}
