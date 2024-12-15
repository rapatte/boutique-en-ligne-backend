import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
    name: string;
    description: string;
    price: number;
    category: string;
}

export class SearchProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsNumber()
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    maxPrice?: number;
}