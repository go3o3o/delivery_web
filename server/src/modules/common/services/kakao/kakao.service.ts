import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpService } from '../http.service';
import { IAddressToCoordinateResponse } from './address-to-coordinate.interface';

@Injectable()
export class KakaoService {
  private apiKey: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get('KAKAO_API_KEY');
  }

  async get(query: string) {
    const request = {
      url: `https://dapi.kakao.com/v2/local/search/address.json`,
      headers: {
        Authorization: `KakaoAK ${this.apiKey}`,
      },
      params: { query },
    };

    const { data } =
      await this.httpService.request<IAddressToCoordinateResponse>(request);
    return data;
  }
}
