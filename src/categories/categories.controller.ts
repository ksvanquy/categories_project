import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../schemas/category.schema'; 


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Post()
  async createCategories(@Body() categories: Partial<Category>[]): Promise<Category[]> {
    return this.categoriesService.createCategories(categories); // Sử dụng categoriesService
  }

  @Post()
  async create(@Body() body: { name: string; parentId?: string }): Promise<Category> {
    return this.categoriesService.create(body.name, body.parentId);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('seed')
  async seedCategories(): Promise<string> {
    await this.categoriesService.create('Electronics');
    await this.categoriesService.create('Laptops', 'Electronics');
    await this.categoriesService.create('Mobile Phones', 'Electronics');
    await this.categoriesService.create('Gaming Laptops', 'Laptops');
    await this.categoriesService.create('Office Laptops', 'Laptops');
    await this.categoriesService.create('Smartphones', 'Mobile Phones');
    
    return 'Dữ liệu mẫu đã được chèn vào!';
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; parentId?: string },
  ): Promise<Category> {
    return this.categoriesService.update(id, body.name, body.parentId);
  }
}
