type UserRole = "ADMIN" | "STAFF" | "PATIENT";
interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  dob: string;
  address: string;
  role: UserRole;
}

export interface UserDetail extends User {}

export const initialUser: UserDetail = {
  id: "",
  name: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  role: "PATIENT"
}