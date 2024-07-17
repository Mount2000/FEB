export const truncateStr = (str, n = 6) => {
  if (!str) return "";
  return str.length > n
    ? str.substr(0, n - 1) + "..." + str.substr(str.length - n, str.length - 1)
    : str;
};

export const formatBalacne = (value) => {
  let num = parseFloat(value);
  num = num.toFixed(3);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const addressShortener = (addr = "", digits = 5) => {
  digits = 2 * digits >= addr.length ? addr.length : digits;
  return `${addr.substring(0, digits)}...${addr.slice(-digits)}`;
};