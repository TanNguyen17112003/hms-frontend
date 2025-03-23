import { Page as PageType } from 'src/types/page';
import React from 'react';
import { DashboardLayout } from 'src/layouts';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { Breadcrumbs, Button, Link, Typography } from '@mui/material';
import GeneralInfoCard from './GeneralInfoCard';
import MedicalInfoCard from './MedicalInfoCard';
import { Box } from '@mui/system';
import RelativeInfoCard from './RelativeInfoCard';
import MedicalHistoryCard from './MedicalHistoryCard';
import MedicalRecordCard from './MedicalRecordCard';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const breadcrumbs = [
  <Link
    underline='hover'
    key='1'
    color='#0E1680'
    href='/'
    onClick={handleClick}
    className='!font-semibold'
  >
    Doctor Appointment
  </Link>,
  <Link
    underline='hover'
    key='2'
    color='#0E1680'
    href='/material-ui/getting-started/installation/'
    onClick={handleClick}
    className='!font-semibold'
  >
    Patients Details
  </Link>,
  <Typography key='3' sx={{ color: '#0E1680' }} className='!font-semibold'>
    Morshed Ali
  </Typography>
];

const PatientDetail: PageType = () => {
  return (
    <div className='ml-4'>
      <div className='w-full flex justify-between items-center mb-5'>
        <div className='flex gap-5'>
          <button className='text-[#0E1680]'>
            <ArrowLeft />
          </button>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <Button
          variant='contained'
          startIcon={<Calendar />}
          className='!bg-[#0E1680] hover:opacity-90'
        >
          Add new appointment
        </Button>
      </div>

      {/* Profile Section */}
      <div className='flex-col flex gap-5'>
        <GeneralInfoCard
          generalInfo={{
            name: 'Mohammad Ali',
            age: '22',
            ssn: '067703000000',
            dateOfBirth: '14 February 2001',
            gender: 'Male',
            email: 'jubead435@gmail.com',
            phone: '(704) 555-0127',
            address: '123 Le Dinh Huy, Ho Chi Minh City',
            job: 'Developer',
            maritalStatus: 'MARRIED',
            nationality: 'Viet Nam'
          }}
        />
        <Box className='grid grid-cols-2 gap-5'>
          <MedicalInfoCard
            medicalInfo={{
              weight: 65,
              height: 170,
              bloodPressure: '124/80',
              bloodType: 'O+',
              allergies: 'Penicillin, Aspirin',
              vaccination: [
                { name: 'Adacel', date: '1/2/2023' },
                { name: 'Gardasil', date: '1/2/2024' }
              ],
              insuranceType: 'Student',
              insuranceCardNumber: '012345678910',
              insurancePeriod: '02/02/2030'
            }}
          />
          <RelativeInfoCard
            relativeInfo={[
              {
                fullName: 'Lisa',
                relationship: 'Mother',
                phone: '0357677243'
              },
              {
                fullName: 'Rose',
                relationship: 'Sister',
                phone: '0357677243'
              },
              {
                fullName: 'Lisa',
                relationship: 'Wife',
                phone: '0357677243'
              },
              {
                fullName: 'Rose',
                relationship: 'Sister',
                phone: '0357677243'
              }
            ]}
          />
        </Box>
        <MedicalHistoryCard
          medicalInfo={{
            weight: 65,
            height: 170,
            bloodPressure: '124/80',
            bloodType: 'O+',
            allergies: 'Penicillin, Aspirin',
            vaccination: [
              { name: 'Adacel', date: '1/2/2023' },
              { name: 'Gardasil', date: '1/2/2024' }
            ],
            insuranceType: 'Student',
            insuranceCardNumber: '012345678910',
            insurancePeriod: '02/02/2030'
          }}
        />
        <MedicalRecordCard
          medicalInfo={{
            weight: 65,
            height: 170,
            bloodPressure: '124/80',
            bloodType: 'O+',
            allergies: 'Penicillin, Aspirin',
            vaccination: [
              { name: 'Adacel', date: '1/2/2023' },
              { name: 'Gardasil', date: '1/2/2024' }
            ],
            insuranceType: 'Student',
            insuranceCardNumber: '012345678910',
            insurancePeriod: '02/02/2030'
          }}
        />
      </div>
      {/* <div className="flex justify-end w-full">

      </div> */}
    </div>
  );
};

export default PatientDetail;
