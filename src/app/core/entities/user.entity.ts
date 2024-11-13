import { Person } from "./person.entity";

export interface User {
  idUser: number;
  person?: Person;                // Relación opcional
  username: string;
  password: string;               // Para creación/edición
  role: string;
}
