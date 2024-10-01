import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategoriesService implements OnModuleInit {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    ) { }

    // Chèn dữ liệu mẫu khi module khởi động
    async onModuleInit() {
        const count = await this.categoryModel.countDocuments();

        if (count === 0) {
            console.log('Thêm dữ liệu mẫu cho categories...');
            await this.categoryModel.insertMany([
                { name: 'Electronics', parentId: null },
                { name: 'Laptops', parentId: null },
                { name: 'Mobile Phones', parentId: null },
                { name: 'Gaming Laptops', parentId: 'Laptops' },
                { name: 'Office Laptops', parentId: 'Laptops' },
                { name: 'Smartphones', parentId: 'Mobile Phones' },
            ]);
        } else {
            console.log('Dữ liệu mẫu đã tồn tại.');
        }
    }

    // Các phương thức khác cho service
    async create(name: string, parentId?: string): Promise<Category> {
        const newCategory = new this.categoryModel({ name, parentId });
        return newCategory.save();
    }

    // Hàm tạo nhiều categories
    async createCategories(categories: Partial<Category>[]): Promise<Category[]> {
        const createdCategories = await this.categoryModel.insertMany(categories);
        console.log(createdCategories);  // Kiểm tra dữ liệu trả về
        return createdCategories as Category[];  // Sử dụng ép kiểu nếu cần
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async findOne(id: string): Promise<Category> {
        return this.categoryModel.findById(id).exec();
    }

    async delete(id: string): Promise<Category> {
        return this.categoryModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, name: string, parentId?: string): Promise<Category> {
        return this.categoryModel
            .findByIdAndUpdate(id, { name, parentId }, { new: true })
            .exec();
    }
}
