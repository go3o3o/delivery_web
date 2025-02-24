import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { responsePagination } from 'src/libs/helpers/pagination.helper';
import { HttpService } from '../http.service';
import { ISearchAddressResponse } from './search-address.interface';

/**
 * https://business.juso.go.kr/addrlink/openApi/searchApi.do
 */
@Injectable()
export class BusinessJusoService {
  private apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get('BUSINESS_JUSO_API_KEY');
  }

  async searchAddress({ keyword, page = 1, size = 10 }) {
    const request = {
      url: 'https://business.juso.go.kr/addrlink/addrLinkApi.do',
      method: 'POST',
      params: {
        confmKey: this.apiKey,
        currentPage: page,
        countPerPage: size,
        keyword: keyword,
        resultType: 'json',
      },
    };

    try {
      const { data } =
        await this.httpService.request<ISearchAddressResponse>(request);

      const { common, juso } = data.results;
      const pagination = responsePagination(common?.totalCount, juso?.length, {
        size,
        page,
      });

      return { list: juso, pagination };
    } catch (error) {
      throw new Error('주소 검색 실패: ' + error.message);
    }
  }
}
