import { IJusoResponse } from 'src/modules/common/services/business-juso/search-address.interface';
import { AddressResponse } from '../dto/address.dto';

export const addressMapper = (juso: IJusoResponse): AddressResponse => {
  return {
    address: juso.jibunAddr, // 지번 주소
    roadAddress: juso.roadAddr, // 도로명 주소
    englishAddress: juso?.engAddr, // 영문 주소
    zipCode: juso?.zipNo, // 우편번호
  };
};
