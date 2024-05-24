export class StudentDto {
  id: number;
  name: string;
  birthday: string;
  address: string;
  gender: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.birthday = '';
    this.address = '';
    this.gender = '';
  }
}
