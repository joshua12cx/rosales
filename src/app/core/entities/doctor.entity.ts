import { Person } from "./person.entity";

export interface Doctor {
  idDoctor: number;
  person: Person;                 // Relación
  specialty: string;
}
