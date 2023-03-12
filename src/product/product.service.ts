import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return await this.repository.save(dto);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.repository.findOneOrFail({ where: { id } });
  }

  async update(id: number, dto: UpdateProductDto) {
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
