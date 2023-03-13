import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductDto } from "./dto/product.dto";
import { Product } from "./entities/product.entity";

describe("ProductService", () => {
  let service: ProductService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it("should Create new product", () => {
    const dto: ProductDto = { category: "Test", variety: "Red", packaging: "Box Pck" };
    const product = new Product();
    product.id = 1;
    product.category = dto.category;
    product.variety = dto.variety;
    product.packaging = dto.packaging;
    jest.spyOn(repository, "save").mockImplementation(() => Promise.resolve(product));

    service.create(dto).then((result) => {
      expect(result).toEqual(product);
    });
  });

  it("should get product list", () => {
    const product = new Product();
    jest.spyOn(repository, "find").mockImplementation(() => Promise.resolve([product]));

    service.findAll().then((result) => {
      expect(result.length).toEqual([product].length);
      expect(result).toEqual([product]);
    });
  });

  it("should get product by id", () => {
    const product = new Product();
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.resolve(product));
    service.findOne(1).then((result) => {
      expect(result).toEqual(product);
    });
  });

  it("should get product by id - error", () => {
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.reject(new Error()));
    service.findOne(1).catch((error) => {
      expect(error).toBeInstanceOf(Error);
    });
  });

  it("should update product", () => {
    const dto: ProductDto = { category: "test", variety: "Gold", packaging: "Box" };
    const product = new Product();
    product.id = 1;
    product.category = dto.category;
    product.variety = dto.variety;
    product.packaging = dto.packaging;

    jest.spyOn(repository, "update").mockImplementation(() => Promise.resolve(null));
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.resolve(product));

    service.update(1, dto).then((result) => {
      expect(result).toEqual(product);
    });
  });

  it("should delete product", () => {
    jest.spyOn(repository, "delete").mockImplementation(() => Promise.resolve(null));
    service.remove(1).then((result) => {
      expect(result).toEqual({ deleted: true });
    });
  });

  it("should delete product - error", () => {
    jest.spyOn(repository, "delete").mockImplementation(() => Promise.reject(new Error()));
    service.remove(1).catch((result) => {
      expect(result.deleted).toEqual(false);
    });
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
