import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StatusEnum } from '../entities/user.entity';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly nickname: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsEnum(StatusEnum)
  readonly status: number;

  @Type(() => UserPhotoDto)
  @ValidateNested({ each: true })
  readonly photos: UserPhotoDto[];
}

export class UserPhotoDto {
  @IsString()
  readonly url: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
