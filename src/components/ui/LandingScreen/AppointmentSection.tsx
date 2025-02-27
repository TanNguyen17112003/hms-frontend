const AppointmentSection = () => {
  return (
    <div className='w-full h-[800px] sm:h-[700px] relative'>
      <img src='/ui/Landing/AppointmentLandingBg.png' className='w-full h-full object-cover' />
      <div className='bg-white absolute top-0 left-0 w-full h-full opacity-80'></div>
      <div className='absolute top-0 left-0 w-full h-full flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1140px] py-10 px-4 sm:px-10 min-[1140px]:px-0'>
          <div className='flex flex-col justify-center mr-0 sm:mr-20'>
            <div className='text-2xl font-bold text-[#0E1680] mb-5 text-center sm:text-start'>
              Book an Appointment
            </div>
            <div className='text-center sm:text-start'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque
              tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa
              in. Consequat faucibus porttitor enim et.
            </div>
          </div>
          <div className='w-full h-full py-5 sm:py-16'>
            <div className='bg-[#0E1680] h-full w-full text-white grid grid-cols-2 rounded-xl'>
              <input
                placeholder='Name'
                className='bg-transparent border-r-2 border-b-2 border-white h-18 p-5'
              ></input>
              <select className='bg-transparent border-b-2 border-white h-18 p-5 outline-none'>
                <option value='' disabled selected>
                  Gender
                </option>
                <option value='male' className='text-black'>
                  Male
                </option>
                <option value='female' className='text-black'>
                  Female
                </option>
              </select>
              <input
                placeholder='Email'
                className='bg-transparent border-r-2 border-b-2 border-white h-18 p-5'
              ></input>
              <input
                placeholder='Phone'
                className='bg-transparent border-b-2 border-white h-18 p-5'
              ></input>
              <select className='bg-transparent border-r-2 border-b-2 border-white h-18 p-5 outline-none'>
                <option value='' disabled selected>
                  Date
                </option>
                <option value='male' className='text-black'>
                  Male
                </option>
                <option value='female' className='text-black'>
                  Female
                </option>
              </select>
              <select className='bg-transparent border-b-2 border-white h-18 p-5 outline-none'>
                <option value='' disabled selected>
                  Time
                </option>
                <option value='male' className='text-black'>
                  Male
                </option>
                <option value='female' className='text-black'>
                  Female
                </option>
              </select>
              <select className='bg-transparent border-r-2 border-b-2 border-white h-18 p-5 outline-none'>
                <option value='' disabled selected>
                  Doctor
                </option>
                <option value='male' className='text-black'>
                  Male
                </option>
                <option value='female' className='text-black'>
                  Female
                </option>
              </select>
              <select className='bg-transparent border-b-2 border-white h-18 p-5 outline-none'>
                <option value='' disabled selected>
                  Department
                </option>
                <option value='male' className='text-black'>
                  Male
                </option>
                <option value='female' className='text-black'>
                  Female
                </option>
              </select>
              <textarea
                className='col-span-2 bg-transparent border-b-2 border-white p-6 outline-none'
                rows={5}
                placeholder='Message'
              ></textarea>
              <button className='col-span-2 bg-transparent p-5 transition duration-300 hover:bg-white hover:bg-opacity-30'>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;
