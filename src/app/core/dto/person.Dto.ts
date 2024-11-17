export interface PersonDTO {
    idPerson: number;
    firstName: string;
    lastNameFather: string;
    lastNameMother: string;
    gender: string; // Nuevo campo agregado
    birthDate: Date;
    phone?: string;
    dni: string;
    address: string;
  }
  