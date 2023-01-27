import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PageRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number | 1;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  size?: number | 10;

  getOffset(): number {
    if (this.page < 1 || this.page === null || this.page === undefined) {
      this.page = 1;
    }

    if (this.size < 1 || this.size === null || this.size === undefined) {
      this.size = 10;
    }

    return (Number(this.page) - 1) * Number(this.size);
  }

  getLimit(): number {
    if (this.size < 1 || this.size === null || this.size === undefined) {
      this.size = 10;
    }
    return Number(this.size);
  }
}
