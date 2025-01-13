import { mixin } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

class PaginationResponse {
  @ApiProperty({ description: '총 결과수' })
  @IsNumber()
  readonly totalRow: number;

  @ApiProperty({ description: '현 페이지의 결과수' })
  @IsNumber()
  readonly pageRow: number;

  @ApiProperty({ description: '다음 페이지 있는지 여부' })
  @IsBoolean()
  readonly hasNext: boolean;

  @ApiProperty({ description: '총 페이지수' })
  @IsNumber()
  readonly totalPage: number;

  @ApiProperty({ description: '현 페이지' })
  @IsNumber()
  readonly page: number;

  @ApiProperty({ description: '요청한 페이지당 사이즈' })
  @IsNumber()
  readonly size: number;
}

type Constructor<T = object> = new (...args: any[]) => T;

export function withListResponse<T extends Constructor>(Base: T) {
  class BasicPaginationResDto {
    @ApiProperty({
      nullable: false,
      type: [Base],
    })
    list!: T[];

    @ApiProperty({ description: '페이지' })
    readonly pagination: PaginationResponse;
  }

  return mixin(BasicPaginationResDto);
}
