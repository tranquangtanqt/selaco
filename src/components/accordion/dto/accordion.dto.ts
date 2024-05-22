import { AccordionDetailDto } from './accordion-detail.dto';

export class AccordionDto {
  id: number;
  name: string;
  display: string;
  order: number;
  startIndex: number;
  collapse: boolean;
  details: AccordionDetailDto[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.display = '';
    this.order = 0;
    this.startIndex = 0;
    this.collapse = false;
    this.details = [];
  }
}
