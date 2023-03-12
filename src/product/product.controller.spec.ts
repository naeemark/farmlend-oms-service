import { Test, TestingModule } from "@nestjs/testing";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

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
            create: jest
              .fn()
              .mockImplementation((dto: CreateProductDto) =>
                Promise.resolve({ id: 1, ...dto })
              )
          }
        }
      ]
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
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

    const result = controller.create(createProductDto);
    expect(result).resolves.toEqual(product);
    expect(service.create).toHaveBeenCalledWith(createProductDto);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
