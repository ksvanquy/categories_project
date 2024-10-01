// src/categories/schemas/category.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  parentId?: string;

  @Prop({ type: [{ type: String, ref: 'Category' }] })
  children?: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
