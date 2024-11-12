import { Person } from "./person.entity";



export interface Consultation {
  idConsultation: number;
  consultationDate: Date;
  person: Person;
  reason: string;
  details: string;
}
