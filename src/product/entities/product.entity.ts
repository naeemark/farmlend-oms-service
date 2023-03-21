import { ApiProperty } from "@nestjs/swagger";
import { Organization } from "./../../organization/entities/organization.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

@Entity("products")
export class Product {
  @ApiProperty({
    example: "123",
    description: "The Product Id (System Generated)"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Apple", description: "The Product category" })
  @Column()
  category: string;

  @ApiProperty({ example: "Gala", description: "The Product variety" })
  @Column()
  variety: string;

  @ApiProperty({ example: "18KG Boxes", description: "The Product packaging" })
  @Column()
  packaging: string;

  @ApiProperty({
    example: "2023-03-12T14:32:55.346Z",
    description: "The Product creation date"
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: "1", description: "The Product Organization", type: Organization })
  @ManyToOne(() => Organization, (organization) => organization.products)
  organization: Organization;
}
