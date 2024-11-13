import { Person } from "./person.entity";

export interface Patient {
  idPatient: number;
  person: Person;                 // Relación
}
