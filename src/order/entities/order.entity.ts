import { ApiProperty } from "@nestjs/swagger";
import { Product } from "./../../product/entities/product.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from "typeorm";

@Entity("orders")
export class Order {
  @ApiProperty({
    example: "123",
    description: "The Order Id (System Generated)"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "seller", description: "The Order type" })
  @Column({ nullable: false })
  type: string;

  @ApiProperty({
    example: "2023-03-12T14:32:55.346Z",
    description: "The Order creation date"
  })
  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
