import { Person } from "./person.entity";


export interface Doctor {
  idDoctor: number;
  person: Person;
  specialty: string;
}
