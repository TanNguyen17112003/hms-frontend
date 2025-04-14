export function formatUnixTimestamp(unixTimestamp: string): Date {
  const date = new Date(Number(unixTimestamp) * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedDate = new Date(
    year,
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes)
  );
  return formattedDate;
}

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}`;
}

export function unixTimestampToDate(unixTimestamp: string): Date {
  return new Date(Number(unixTimestamp) * 1000);
}

export function dateToUnixTimestamp(date: Date): string {
  return String(Math.floor(date.getTime() / 1000));
}

export function formatVNDcurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
}

export function getCurentUnixTimestamp(): string {
  return String(Math.floor(Date.now() / 1000));
}

export function formatTagName(name: string): string {
  return `@${name.split(' ')[0]}`;
}

export function formatTime(date: string): string {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  const formattedTime = new Date(date).toLocaleTimeString('en-GB', options);
  return formattedTime;
}

export function formatStandardDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
  return formattedDate;
}

export function calculateAge(date: string): number {
  const dateOfBirth = new Date(date);
  const ageDifMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const getWeekAndDay = (dateString: string) => {
  const date = new Date(dateString);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear =
    Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const week = Math.ceil(dayOfYear / 7);

  const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const day = daysOfWeek[date.getDay()];

  return {
    week,
    date: day
  };
};

export const extractDate = (date: string) => {
  // I want to conver to "yyyy:mm:dd" form
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
