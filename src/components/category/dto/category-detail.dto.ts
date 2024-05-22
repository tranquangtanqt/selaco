export class CategoryDetailDto {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  order: number;
  sheetId: string;

  constructor() {
    this.id = 0;
    this.categoryId = 0;
    this.categoryName = '';
    this.name = '';
    this.order = 0;
    this.sheetId = '';
  }
}
