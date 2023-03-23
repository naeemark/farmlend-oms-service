import { Test, TestingModule } from "@nestjs/testing";
import { OrderDto } from "./dto/order.dto";
import { Order } from "./entities/order.entity";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("OrderController", () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            create: jest.fn().mockImplementation((dto: OrderDto) => Promise.resolve({ id: 1, ...dto })),
            findAll: jest.fn().mockImplementation(() => Promise.resolve([new Order()])),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(new Order())),
            update: jest.fn().mockImplementation((id: number, dto: OrderDto) => Promise.resolve({ id, ...dto })),
            remove: jest.fn().mockImplementation(() => Promise.resolve({ deleted: true }))
          }
        }
      ]
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it("should Create new order", () => {
    const dto: OrderDto = { type: "seller" };
    const order = new Order();
    order.id = 1;
    order.type = dto.type;

    const result = controller.create(dto);
    expect(result).resolves.toEqual(order);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should get order list", () => {
    const order = new Order();
    const result = controller.findAll();
    expect(result).resolves.toEqual([order]);
  });

  it("should get order by id", () => {
    const order = new Order();
    const result = controller.findOne(String(1));
    expect(result).resolves.toEqual(order);
  });

  it("should get order by id - error", async () => {
    const exception = new HttpException("Not found", HttpStatus.NOT_FOUND);
    const spy = jest.spyOn(service, "findOne").mockRejectedValueOnce(exception);

    await expect(controller.findOne(String(1))).rejects.toThrow(exception);
    expect(spy).toBeCalledTimes(1);
  });

  it("should update order", () => {
    const dto: OrderDto = { type: "seller" };
    const order = new Order();
    order.id = 1;
    order.type = dto.type;
    const result = controller.update(String(1), order);
    expect(result).resolves.toEqual(order);
  });

  it("should delete order", () => {
    const result = controller.remove(String(1));
    expect(result).resolves.toEqual({ deleted: true });
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
