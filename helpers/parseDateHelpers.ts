import moment from "moment";

export function parseDate(timestamp: number) {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export function parseDateTime(timestamp:any) {
  return moment(timestamp).format('HH:mm DD-MM-YYYY');
}