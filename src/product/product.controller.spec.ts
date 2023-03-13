import { Test, TestingModule } from "@nestjs/testing";
import { ProductDto } from "./dto/product.dto";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("ProductController", () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockImplementation((dto: ProductDto) => Promise.resolve({ id: 1, ...dto })),
            findAll: jest.fn().mockImplementation(() => Promise.resolve([new Product()])),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(new Product())),
            update: jest.fn().mockImplementation((id: number, dto: ProductDto) => Promise.resolve({ id, ...dto })),
            remove: jest.fn().mockImplementation(() => Promise.resolve({ deleted: true }))
          }
        }
      ]
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it("should create a new product", () => {
    const dto: ProductDto = { category: "test", variety: "Gold", packaging: "Box" };
    const product = new Product();
    product.id = 1;
    product.category = dto.category;
    product.variety = dto.variety;
    product.packaging = dto.packaging;

    const result = controller.create(dto);
    expect(result).resolves.toEqual(product);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should get product list", () => {
    const product = new Product();
    const result = controller.findAll();
    expect(result).resolves.toEqual([product]);
  });

  it("should get product by id", () => {
    const product = new Product();
    const result = controller.findOne(String(1));
    expect(result).resolves.toEqual(product);
  });

  it("should get product by id - error", async () => {
    const exception = new HttpException("Not found", HttpStatus.NOT_FOUND);
    const spy = jest.spyOn(service, "findOne").mockRejectedValueOnce(exception);

    await expect(controller.findOne(String(1))).rejects.toThrow(exception);
    expect(spy).toBeCalledTimes(1);
  });

  it("should update product", () => {
    const dto: ProductDto = { category: "test", variety: "Gold", packaging: "Box" };
    const product = new Product();
    product.id = 1;
    product.category = dto.category;
    product.variety = dto.variety;
    product.packaging = dto.packaging;
    const result = controller.update(String(1), product);
    expect(result).resolves.toEqual(product);
  });

  it("should delete product", () => {
    const result = controller.remove(String(1));
    expect(result).resolves.toEqual({ deleted: true });
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
