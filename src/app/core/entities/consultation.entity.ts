import { Person } from "./person.entity";

export interface Consultation {
  idConsultation: number;
  consultationDate: Date;
  person: Person;                  // Relación
  reason: string;
  details: string;
}
