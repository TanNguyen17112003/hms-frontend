import PatientProfileCard from "./PatientProfileCard";
import { Page as PageType } from 'src/types/page';
import React from "react";
const PatientDetail: PageType = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-start max-w-xl">
          <PatientProfileCard
            patientName="Mohammad Ali"
            patientOld={"22"}
            patientSexual="Male"
            patientEmail="jubead435@gmail.com"
            patientPhone="(704) 555-0127"
            patientDateOfBirth="14 February 2001"
            patientDiseases="Cardiology"
            patientBloodPressure="141/90 mmHg"
            patientHeight="5.6' inc"
            patientWeight="78kg"
            patientHeartRate="29°C" 
          />
        </div>

        <div className="flex justify-end">
          
        </div>
      </div>
    </div>
  )};

PatientDetail.getLayout = (page) => <PatientDetail />;

export default PatientDetail;