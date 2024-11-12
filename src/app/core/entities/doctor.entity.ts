import { Person } from "./person.entity";

export class Doctor {
  idDoctor: number = 0;
  person: Person = new Person();
  specialty: string = '';
}
