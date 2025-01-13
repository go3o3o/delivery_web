import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { StringToNumber } from '../decorators/transform/query.decorator';

export class PaginationQuery {
  @ApiProperty({
    description: '한 페이지에서 보여주려고 하는 row 개수',
    required: false,
    default: 10,
  })
  @StringToNumber()
  @IsOptional()
  readonly size?: number;

  @ApiProperty({
    description: '페이지 번호',
    required: false,
    nullable: true,
  })
  @StringToNumber()
  @IsOptional()
  readonly page?: number;

  @ApiProperty({
    description:
      '"컬럼명-ASC || DESC" 형태로 복수 시, 구분자 \',\'를 사용하여 표현',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly sortBy?: string;
}
