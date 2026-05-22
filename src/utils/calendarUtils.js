/**
 * Calendar Utilities for Burnout Inc.
 * Base Date: Monday, January 4, 2027
 */

const BASE_DATE = new Date('2027-01-04T00:00:00');

export const getCalendarDate = (day, hour) => {
  const date = new Date(BASE_DATE);
  date.setDate(BASE_DATE.getDate() + (day - 1));
  date.setHours(hour);
  return date;
};

export const formatCalendarDate = (date, lang) => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const locale = lang === 'en' ? 'en-US' : 'id-ID';
  return date.toLocaleDateString(locale, options);
};

export const formatTime = (hour) => {
  const h = hour % 24;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 || 12;
  const padH = String(displayHour).padStart(2, '0');
  return padH + ":00 " + ampm;
};
