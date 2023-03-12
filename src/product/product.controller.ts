import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./entities/product.entity";

@Controller({ version: "1", path: "products" })
@ApiTags("Products")
@ApiResponse({ status: 400, description: "Bad Request: validation error!" })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: "Create a product" })
  @ApiResponse({ status: 201, description: "Created", type: Product })
  async create(@Body() dto: ProductDto) {
    return await this.productService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "List all products" })
  @ApiResponse({
    status: 200,
    description: "List of Products",
    type: [Product]
  })
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by id" })
  @ApiResponse({ status: 200, description: "Product found", type: Product })
  @ApiResponse({ status: 404, description: "Product not found" })
  async findOne(@Param("id") id: string) {
    try {
      return await this.productService.findOne(+id);
    } catch (err) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update product" })
  @ApiResponse({
    status: 200,
    description: "Updated the product",
    type: Product
  })
  async update(@Param("id") id: string, @Body() dto: ProductDto) {
    return await this.productService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete product" })
  @ApiResponse({
    status: 200,
    description: "Deleted the product",
    type: Product
  })
  async remove(@Param("id") id: string): Promise<{ deleted: boolean }> {
    return await this.productService.remove(+id);
  }
}
