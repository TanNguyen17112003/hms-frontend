import PatientProfileCard from "./PatientProfileCard";
import { Page as PageType } from 'src/types/page';
import React from "react";

const PatientDetail: PageType = () => {
  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Profile Section */}
      <div className="flex lg:justify-center md:w-full">
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
      {/* <div className="flex justify-end w-full">

      </div> */}
    </div>
  );
};

PatientDetail.getLayout = (page) => <PatientDetail />;

export default PatientDetail;
