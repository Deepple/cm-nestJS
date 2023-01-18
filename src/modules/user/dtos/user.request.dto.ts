import { IsNumber, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: '한 개 이상의 특수문자, 영어 대/소문자가 포함되고 8자 이상이어야 합니다.',
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly nickname: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @Type(() => UserPhotoDto)
  @ValidateNested({ each: true })
  readonly photos: UserPhotoDto[];
}

export class UserPhotoDto {
  @IsOptional()
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly url: string;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password', 'photos'] as const)) {}
