import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { SearchAddressQuery } from './dto/search-address.dto';

@ApiTags('주소 API')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: '주소 좌표 값 가져오기' })
  @Get('/coordinate')
  async getKakaoCoordinate(@Query('keyword') keyword: string) {
    return this.addressService.getCoordinate(keyword);
  }

  @ApiOperation({ summary: '주소 검색' })
  @Get('/search')
  async searchAddress(@Query() query: SearchAddressQuery) {
    return this.addressService.searchAddress(query);
  }
}
