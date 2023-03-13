import { Test, TestingModule } from "@nestjs/testing";
import { OrganizationDto } from "./dto/organization.dto";
import { Organization } from "./entities/organization.entity";
import { OrganizationService } from "./organization.service";
import { OrganizationController } from "./organization.controller";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("OrganizationController", () => {
  let controller: OrganizationController;
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [
        {
          provide: OrganizationService,
          useValue: {
            create: jest.fn().mockImplementation((dto: OrganizationDto) => Promise.resolve({ id: 1, ...dto })),
            findAll: jest.fn().mockImplementation(() => Promise.resolve([new Organization()])),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(new Organization())),
            update: jest.fn().mockImplementation((id: number, dto: OrganizationDto) => Promise.resolve({ id, ...dto })),
            remove: jest.fn().mockImplementation(() => Promise.resolve({ deleted: true }))
          }
        }
      ]
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
    service = module.get<OrganizationService>(OrganizationService);
  });

  it("should Create new organization", () => {
    const dto: OrganizationDto = { name: "Test", type: "seller" };
    const organization = new Organization();
    organization.id = 1;
    organization.name = dto.name;
    organization.type = dto.type;

    const result = controller.create(dto);
    expect(result).resolves.toEqual(organization);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should get organization list", () => {
    const organization = new Organization();
    const result = controller.findAll();
    expect(result).resolves.toEqual([organization]);
  });

  it("should get organization by id", () => {
    const organization = new Organization();
    const result = controller.findOne(String(1));
    expect(result).resolves.toEqual(organization);
  });

  it("should get organization by id - error", async () => {
    const exception = new HttpException("Not found", HttpStatus.NOT_FOUND);
    const spy = jest.spyOn(service, "findOne").mockRejectedValueOnce(exception);

    await expect(controller.findOne(String(1))).rejects.toThrow(exception);
    expect(spy).toBeCalledTimes(1);
  });

  it("should update organization", () => {
    const dto: OrganizationDto = { name: "Test", type: "seller" };
    const organization = new Organization();
    organization.id = 1;
    organization.name = dto.name;
    organization.type = dto.type;
    const result = controller.update(String(1), organization);
    expect(result).resolves.toEqual(organization);
  });

  it("should delete organization", () => {
    const result = controller.remove(String(1));
    expect(result).resolves.toEqual({ deleted: true });
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
