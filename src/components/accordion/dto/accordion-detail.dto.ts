export class AccordionDetailDto {
  id: number;
  accordionId: number;
  accordionName: string;
  name: string;
  order: number;
  sheetId: string;

  constructor() {
    this.id = 0;
    this.accordionId = 0;
    this.accordionName = '';
    this.name = '';
    this.order = 0;
    this.sheetId = '';
  }
}
