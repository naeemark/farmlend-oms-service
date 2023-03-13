import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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
  @Column({ nullable: true })
  type: string;

  @ApiProperty({
    example: "2023-03-12T14:32:55.346Z",
    description: "The Organization creation date"
  })
  @CreateDateColumn()
  createdAt: Date;
}