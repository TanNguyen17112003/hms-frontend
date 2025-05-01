export interface MedicalRecord {
  id: string;
  symptoms: string;
  diagnoses: string;
  treatments: string;
  notes: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  createdAt: string;
}
