export const convertFromISO = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Pad day and month with leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  // Return the formatted date in dd/mm/yyyy format
  return `${formattedDay}/${formattedMonth}/${year}`;
};