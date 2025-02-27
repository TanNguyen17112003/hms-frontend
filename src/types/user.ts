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