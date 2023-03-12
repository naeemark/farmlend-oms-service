import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
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

  it("should create a new product", () => {
    const createProductDto: CreateProductDto = {
      category: "TestProduct",
      variety: "testing",
      packaging: "Box"
    };
    const product = new Product();
    product.id = 1;
    product.category = createProductDto.category;
    product.variety = createProductDto.variety;
    product.packaging = createProductDto.packaging;
    jest
      .spyOn(repository, "save")
      .mockImplementation(() => Promise.resolve(product));

    service.create(createProductDto).subscribe((result) => {
      expect(result).toEqual(product);
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
