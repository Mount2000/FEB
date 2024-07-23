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

export const formatTextAmount = (value) => value?.replaceAll(",", "");
export function roundDown(number, decimals = 4) {
  decimals = decimals || 0;
  return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export const formatNumDynDecimal = (num = 0, dec = 4) => {
  try {
    const raw = formatTextAmount(num?.toString());
    let parts = raw?.split(".");
    if (parts?.length > 1 && +parts?.[1] > 0) {
      parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      parts[1] = roundDown(+`0.${parts[1]}`, dec).toString().split(".")[1];
      return parts?.join(".");
    } else return parts?.[0]?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    console.log(error);
    return num?.toString();
  }
};