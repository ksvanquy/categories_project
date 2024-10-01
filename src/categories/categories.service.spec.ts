import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from '../schemas/category.schema';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;

  const mockCategoryModel = {
    find: jest.fn().mockReturnValue([ { name: 'Category 1', parentId: null } ]), // Giả lập phương thức find
    create: jest.fn((category: Category) => ({ _id: '1', ...category })), // Giả lập phương thức create
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken('Category'),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });
});
