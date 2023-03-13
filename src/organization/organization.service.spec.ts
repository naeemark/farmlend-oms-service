import { Test, TestingModule } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrganizationDto } from "./dto/organization.dto";
import { Organization } from "./entities/organization.entity";
import { OrganizationService } from "./organization.service";

describe("OrganizationService", () => {
  let service: OrganizationService;
  let repository: Repository<Organization>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: getRepositoryToken(Organization),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    repository = module.get<Repository<Organization>>(getRepositoryToken(Organization));
  });

  it("should create a new organization", () => {
    const dto: OrganizationDto = { name: "Test", type: "seller" };
    const organization = new Organization();
    organization.id = 1;
    organization.name = dto.name;
    organization.type = dto.type;
    jest.spyOn(repository, "save").mockImplementation(() => Promise.resolve(organization));

    service.create(dto).then((result) => {
      expect(result).toEqual(organization);
    });
  });

  it("should get organization list", () => {
    const organization = new Organization();
    jest.spyOn(repository, "find").mockImplementation(() => Promise.resolve([organization]));

    service.findAll().then((result) => {
      expect(result.length).toEqual([organization].length);
      expect(result).toEqual([organization]);
    });
  });

  it("should get organization by id", () => {
    const organization = new Organization();
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.resolve(organization));
    service.findOne(1).then((result) => {
      expect(result).toEqual(organization);
    });
  });

  it("should get organization by id - error", () => {
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.reject(new Error()));
    service.findOne(1).catch((error) => {
      expect(error).toBeInstanceOf(Error);
    });
  });

  it("should update organization", () => {
    const dto: OrganizationDto = { name: "Test", type: "seller" };
    const organization = new Organization();
    organization.id = 1;
    organization.name = dto.name;
    organization.type = dto.type;

    jest.spyOn(repository, "update").mockImplementation(() => Promise.resolve(null));
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.resolve(organization));

    service.update(1, dto).then((result) => {
      expect(result).toEqual(organization);
    });
  });

  it("should delete organization", () => {
    jest.spyOn(repository, "delete").mockImplementation(() => Promise.resolve(null));
    service.remove(1).then((result) => {
      expect(result).toEqual({ deleted: true });
    });
  });

  it("should delete organization - error", () => {
    jest.spyOn(repository, "delete").mockImplementation(() => Promise.reject(new Error()));
    service.remove(1).catch((result) => {
      expect(result.deleted).toEqual(false);
    });
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
