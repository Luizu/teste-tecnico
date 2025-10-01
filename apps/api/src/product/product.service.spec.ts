import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './entities';
import { ProductNotFoundException } from './exceptions';
import { ProductsRepository } from './interfaces';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductsRepository;

  const mockProduct = new Product({
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    image: 'test.jpg',
    quantity: 10,
    price: 99.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const mockProductsRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [mockProduct];
      mockProductsRepository.findAll.mockResolvedValue(products);

      const result = await service.findAll();

      expect(result).toEqual(products);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no products exist', async () => {
      mockProductsRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a product when found', async () => {
      mockProductsRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw ProductNotFoundException when product not found', async () => {
      mockProductsRepository.findById.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(
        ProductNotFoundException,
      );
      await expect(service.findOne('999')).rejects.toThrow(
        'Product with ID 999 not found',
      );
      expect(repository.findById).toHaveBeenCalledWith('999');
      expect(repository.findById).toHaveBeenCalledTimes(2);
    });
  });
});
