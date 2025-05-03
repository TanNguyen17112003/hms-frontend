import { UserDetail, PatientDetail, initialUser } from '../types/user';
import {
  Appointment,
  TimeSlot,
  AppointmentStatus,
  TimeSlotStatus,
  AppointmentType
} from '../types/appointment';
import { v4 as uuidv4 } from 'uuid';
import { initialStaff, Staff } from 'src/types/staff';

const appointmentStatusList: AppointmentStatus[] = [
  'REJECTED',
  'PENDING',
  'COMPLETED',
  'ACCEPTED',
  'RESCHEDULED',
  'CANCELLED'
];
const timeSlotStatusList: TimeSlotStatus[] = ['AVAILABLE', 'BOOKED'];
const appointmentTypeList: AppointmentType[] = ['FIRST_VISIT', 'FOLLOW_UP'];

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomTimeSlot = (): TimeSlot => {
  const startTime = generateRandomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 minutes slot
  return {
    id: uuidv4(),
    week: 14,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    date: startTime.toISOString().split('T')[0],
    totalMaxAppointment: 3
  };
};

const generatePatients = (): PatientDetail[] => {
  const patients: PatientDetail[] = [];
  for (let i = 0; i < 10; i++) {
    patients.push({
      ...initialUser,
      id: uuidv4(),
      fullName: `Patient ${i + 1}`,
      photoUrl:
        'https://static.vecteezy.com/system/resources/previews/027/245/520/original/male-3d-avatar-free-png.png',
      phoneNumber: `123456789${i}`,
      dateOfBirth: generateRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1)).toISOString(),
      address: `Address ${i + 1}`,
      email: `patient${i + 1}@gmail.com`,
      role: 'PATIENT',
      ssn: `SSN${i + 1}`,
      sex: i % 2 === 0 ? 'MALE' : 'FEMALE'
    });
  }
  return patients;
};

const generateDoctors = (patients: PatientDetail[]): Staff[] => {
  const doctors: Staff[] = [];
  for (let i = 0; i < 10; i++) {
    doctors.push(initialStaff);
  }
  return doctors;
};

const generateAppointments = (patients: PatientDetail[], doctors: Staff[]): Appointment[] => {
  const appointments: Appointment[] = [];
  doctors.forEach((doctor) => {});
  return appointments;
};

const doctorData = {
  biography:
    'Jacob Jones, FPCNPC, is a pediatric nurse practitioner who was born and raised in the Maryland and Washington, DC area...',
  education: [
    {
      institution: 'Chattagram International Dental College & Hospital',
      degree: 'MDS - Periodontology and Oral Implantology, BDS',
      year: '1998-2003'
    },
    {
      institution: 'US Dental Medical University',
      degree: 'Oral And MaxilloFacial Surgeon, Dentist',
      year: '2003-2005'
    }
  ],
  workExperience: [
    {
      hospital: 'Ibn Sina Specialized Hospital',
      period: '2010 - Present',
      duration: '5 years'
    },
    {
      hospital: 'Dhaka Dental College and Hospital',
      period: '2007-2010',
      duration: '3 years'
    },
    {
      hospital: 'Smile Dental Care',
      period: '2005-2007',
      duration: '2 years'
    }
  ],
  achievements: [
    {
      title: 'Best Dentist Award 2021',
      date: 'July 2019',
      description:
        'Dr. Firstname and his team are the proud recipients of the New Jersey Top Dentist award for 2019'
    },
    {
      title: 'The Dental Professional of The Year Award',
      date: 'May 2010',
      description:
        'Nicole Elting and Doron True are finalists for the Student Dentist of the Year and Student Dental Hygienist of the Year 2020 respectively'
    }
  ],
  services: [
    'Tooth cleaning',
    'Root Canal Therapy',
    'Implants',
    'Surgical Extraction',
    'Fissure Sealants',
    'Composite Bonding',
    'Orthodontics',
    'Tooth extractions',
    'Wisdom tooth removal'
  ],
  specializations: [
    'Dental Care',
    'Children Care',
    'Oral and Maxillofacial Surgery',
    'Orthodontics',
    'Prosthodontics',
    'Periodontist',
    'Pediatric Dentistry'
  ]
};

const weekDays = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
const timeSlots = [
  '09:00 am',
  '09:30 am',
  '10:00 am',
  '10:30 am',
  '11:00 am',
  '11:30 am',
  '12:00 pm',
  '12:30 pm',
  '01:00 pm',
  '01:30 pm',
  '02:00 pm'
];

const archivements = [
  {
    title: 'Best Dentist Award 2021',
    date: 'May 2019',
    description:
      'Dr. Friedman and his team are the proud recipients of the New Jersey Top Dentist award for 2019. We are proud to be selected for this honor by our wonderful patients.'
  },
  {
    title: 'The Dental Professional of The Year Award',
    date: 'May 2010',
    description:
      'Nicole Elango and Deeon Trute are finalists for the Student Dentist of the year and Student Dental Hygienist and/or Therapist of the Year 2020 respectively.'
  }
];

const educations = [
  {
    institution: 'Chattagram International Dental College & Hospital',
    degree: 'MDS - Periodonyology and Oral Implantology, BDS',
    year: '1998 - 2003'
  },
  {
    institution: 'US Dental Medical University',
    degree: 'Oral And MaxilloFacial Surgeon, Dentist',
    year: '1998 - 2003'
  }
];

const works = [
  {
    company: 'Chattagram International Dental College & Hospital',
    year: '1998 - 2003'
  },
  {
    company: 'Ibn Sina Specialized Hospital',
    year: '2010 - Present (5 years)'
  },
  {
    company: 'Smile Dental Cares',
    year: '2005 - 2007 (3 years)'
  }
];

const patients = generatePatients();
const doctors = generateDoctors(patients);
const appointments = generateAppointments(patients, doctors);

export {
  patients,
  doctors,
  appointments,
  doctorData,
  weekDays,
  timeSlots,
  archivements,
  educations,
  works
};
