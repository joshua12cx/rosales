import { Person } from "./person.entity";


export interface User {
  idUser: number;
  person?: Person;  // Opcional en caso de que sea nulo
  username: string;
  password: string;
  role: string;
}
