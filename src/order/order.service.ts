import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from "../product/product.service";
import { EntityNotFoundError, Repository } from "typeorm";
import { OrderDto } from "./dto/order.dto";
import { Order } from "./entities/order.entity";

const relations = { products: true, referenceOrder: { products: true } };

@Injectable()
export class OrderService {
  @Inject(ProductService)
  private readonly productService: ProductService;

  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>
  ) {}

  async create(dto: OrderDto): Promise<Order> {
    try {
      const products = await Promise.all(dto.products.map(async (p) => await this.productService.findOne(Number(p))));
      dto.products = products;
      return await this.repository.save(dto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          "One or more entities are not available to setup a relationship",
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async findAll(): Promise<Order[]> {
    return await this.repository.find({ relations });
  }

  async findOne(id: number): Promise<Order> {
    return await this.repository.findOneOrFail({ where: { id }, relations });
  }

  async update(id: number, dto: OrderDto) {
    await this.repository.update({ id }, dto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.repository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
