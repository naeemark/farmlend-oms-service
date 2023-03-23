import { ApiProperty } from "@nestjs/swagger";
import { Product } from "./../../product/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity("organizations")
export class Organization {
  @ApiProperty({
    example: "123",
    description: "The Organization Id (System Generated)"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Green Farms Ltd.", description: "The Organization category" })
  @Column()
  name: string;

  @ApiProperty({ example: "seller", description: "The Organization type" })
  @Column({ nullable: false })
  type: string;

  @ApiProperty({
    example: "2023-03-12T14:32:55.346Z",
    description: "The Organization creation date"
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: [Product] })
  @OneToMany(() => Product, (product) => product.organization)
  products: Product[];
}
