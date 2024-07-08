// funcation and arr for email or phone steps register
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/; // Assumes the phone number should be exactly 10 digits long
  return phoneRegex.test(phone);
}

export const arr_addressEmail = [
  "@gmail.com",
  "@hotmail.com",
  "@outlook.com",
  "@yahoo.com",
];

const currentMonth = new Date().getMonth(); // Month indices start from 0

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const month_ar = [
  ...Array.from({ length: currentMonth + 1 }, (_, index) => ({
    name: monthNames[currentMonth - index],
  })),
];

export const day_ar = Array.from({ length: 30 }, (_, index) => ({
  name: (index + 1).toString(),
}));

const currentYear = new Date().getFullYear();

export const year_ar = [
  ...Array.from({ length: currentYear - 1990 + 1 }, (_, index) => ({
    name: (currentYear - index).toString(),
  })),
];

function generateRandomCharacter() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const minLength = 3;
  const maxLength = 10;
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

const randomCharacter = generateRandomCharacter();
console.log(randomCharacter);
