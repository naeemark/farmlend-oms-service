import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "../product/entities/product.entity";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { OrderService } from "./order.service";
import { OrderDto } from "./dto/order.dto";

describe("OrderService", () => {
  let service: OrderService;
  let repository: Repository<Order>;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
          useValue: {
            findOneBy: jest.fn().mockImplementation(() => Promise.resolve())
          }
        }
      ]
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it("should Create new order", () => {
    const dto: OrderDto = { type: "seller", products: [] };
    const order = new Order();
    order.id = 1;
    order.type = dto.type;
    order.products = [];
    jest.spyOn(repository, "save").mockImplementation(() => Promise.resolve(order));

    service.create(dto).then((result) => {
      expect(result).toEqual(order);
    });
  });

  it("should get order list", () => {
    const order = new Order();
    jest.spyOn(repository, "find").mockImplementation(() => Promise.resolve([order]));

    service.findAll().then((result) => {
      expect(result.length).toEqual([order].length);
      expect(result).toEqual([order]);
    });
  });

  it("should get order by id", () => {
    const order = new Order();
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.resolve(order));
    service.findOne(1).then((result) => {
      expect(result).toEqual(order);
    });
  });

  it("should get order by id - error", () => {
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.reject(new Error()));
    service.findOne(1).catch((error) => {
      expect(error).toBeInstanceOf(Error);
    });
  });

  it("should update order", () => {
    const dto: OrderDto = { type: "seller", products: [] };
    const order = new Order();
    order.id = 1;
    order.type = dto.type;
    order.products = [];

    jest.spyOn(repository, "update").mockImplementation(() => Promise.resolve(null));
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.resolve(order));

    service.update(1, dto).then((result) => {
      expect(result).toEqual(order);
    });
  });

  it("should delete order", () => {
    jest.spyOn(repository, "delete").mockImplementation(() => Promise.resolve(null));
    service.remove(1).then((result) => {
      expect(result).toEqual({ deleted: true });
    });
  });

  it("should delete order - error", () => {
    jest.spyOn(repository, "delete").mockImplementation(() => Promise.reject(new Error()));
    service.remove(1).catch((result) => {
      expect(result.deleted).toEqual(false);
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
