import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, Repository } from "typeorm";
import { OrderDto } from "./dto/order.dto";
import { Order } from "./entities/order.entity";
import { Product } from "../product/entities/product.entity";

const relations = { products: { organization: true }, order: { products: { organization: true } } };

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async create(dto: OrderDto): Promise<Order> {
    try {
      if (dto.products) {
        const products = await Promise.all(
          dto.products.map(async (p) => await this.productRepository.findOneBy({ id: Number(p) }))
        );
        dto.products = products;
      }
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
