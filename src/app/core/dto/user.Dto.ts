export interface UserDTO {
    personId?: number;
    username: string;
    password: string; // Solo para creación/edición
    role: string;
}
