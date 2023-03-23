import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Order } from "./entities/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../product/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
