export function formatPrice(price) {
  if (!price) return "";

  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let numberStr = price.toString();
  persianNumbers.forEach((p, i) => {
    const regex = new RegExp(p, "g");
    numberStr = numberStr.replace(regex, englishNumbers[i]);
  });

  const number = Number(numberStr);
  if (isNaN(number)) return "";

  return number.toLocaleString("fa-IR");
}

export function parsePersianNumber(str) {
  if (!str) return "0"; 

  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  const arabicNumbers = "٠١٢٣٤٥٦٧٨٩";

  return String(str)
    .split("")
    .map((c) => {
      if (persianNumbers.includes(c))
        return persianNumbers.indexOf(c);
      if (arabicNumbers.includes(c))
        return arabicNumbers.indexOf(c);
      return c;
    })
    .join("");
}


export function parsePriceToNumber(price) {
  if (price == null) return 0;

  const normalized = parsePersianNumber(price.toString())
    .replace(/,/g, "");

  return Number(normalized) || 0;
}
