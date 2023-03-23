import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "./dto/order.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Order } from "./entities/order.entity";

@Controller({ version: "1", path: "orders" })
@ApiTags("Orders")
@ApiResponse({ status: 400, description: "Bad Request: validation error!" })
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  @ApiOperation({ summary: "Create order" })
  @ApiResponse({ status: 201, description: "Created", type: Order })
  async create(@Body() dto: OrderDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "List all orders" })
  @ApiResponse({ status: 200, description: "List of orders", type: [Order] })
  async findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get order by id" })
  @ApiResponse({ status: 200, description: "Order found", type: Order })
  @ApiResponse({ status: 404, description: "Order not found" })
  async findOne(@Param("id") id: string) {
    try {
      return await this.service.findOne(+id);
    } catch (err) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update order" })
  @ApiResponse({ status: 200, description: "Updated the order", type: Order })
  async update(@Param("id") id: string, @Body() dto: OrderDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete order" })
  @ApiResponse({ status: 200, description: "Deleted the order", type: Order })
  async remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
