import { BadRequestException, Injectable } from '@nestjs/common';

import { BusinessJusoService } from '../common/services/business-juso/business-juso.service';
import { KakaoService } from '../common/services/kakao/kakao.service';
import { SearchAddressQuery } from './dto/search-address.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly businessJusoService: BusinessJusoService,
    private readonly kakaoService: KakaoService,
  ) {}

  async getCoordinate(keyword: string) {
    const response = await this.kakaoService.get(keyword);

    if (!response.documents?.length) {
      throw new BadRequestException('주소를 찾을 수 없습니다.');
    }

    const document = response.documents[0];
    return {
      address: document.address_name,
      lat: +document.y,
      lng: +document.x,
    };
  }

  async searchAddress(query: SearchAddressQuery) {
    const { keyword, page, size } = query;

    const response = await this.businessJusoService.searchAddress({
      keyword,
      page,
      size,
    });
    return response;
  }
}
