import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ShopCategoryDto {
  @ApiProperty({ description: '카테고리명', maxLength: 100 })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '카테고리 이미지' })
  @IsString()
  @IsOptional()
  readonly imageUrl?: string;
}

export class ShopCategoryResponse extends ShopCategoryDto {
  @ApiProperty({ description: '가게 카테고리 ID' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: ShopCategoryDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  readonly shops?: ShopCategoryDto[];

  @ApiProperty({ description: '생성일자' })
  readonly createdDate: Date;

  @ApiProperty({ description: '수정일자', required: false, nullable: true })
  readonly updatedDate?: Date;

  @ApiProperty({ description: '삭제일자', required: false, nullable: true })
  readonly deletedDate?: Date;
}
