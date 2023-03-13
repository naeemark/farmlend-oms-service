import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrganizationDto } from "./dto/organization.dto";
import { Organization } from "./entities/organization.entity";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>
  ) {}

  async create(dto: OrganizationDto): Promise<Organization> {
    return await this.repository.save(dto);
  }

  async findAll(): Promise<Organization[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Organization> {
    return await this.repository.findOneOrFail({ where: { id } });
  }

  async update(id: number, dto: OrganizationDto) {
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
