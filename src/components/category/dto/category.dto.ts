import { CategoryDetailDto } from './category-detail.dto';

export class CategoryDto {
  id: number;
  parent_id: number;
  parent_name: string;
  name: string;
  order: number;
  details: CategoryDetailDto[];
  startIndex: number;

  constructor() {
    this.id = 0;
    this.parent_id = 0;
    this.parent_name = '';
    this.name = '';
    this.order = 0;
    this.details = [];
    this.startIndex = 0;
  }
}
