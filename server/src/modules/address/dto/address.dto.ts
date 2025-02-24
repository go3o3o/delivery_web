import { ApiProperty } from '@nestjs/swagger';

export class AddressResponse {
  @ApiProperty({ description: '지번 주소' })
  readonly address: string;

  @ApiProperty({ description: '도로명 주소' })
  readonly roadAddress: string;

  @ApiProperty({ description: '영문 주소' })
  readonly englishAddress?: string;

  @ApiProperty({ description: '우편번호' })
  readonly zipCode?: string;
}
