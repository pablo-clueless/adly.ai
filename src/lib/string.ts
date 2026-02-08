export const normalize = (path: string): string => {
  if (!path) return "";
  const qIndex = path.indexOf("?");
  const hIndex = path.indexOf("#");
  const end =
    qIndex === -1 ? (hIndex === -1 ? path.length : hIndex) : hIndex === -1 ? qIndex : Math.min(qIndex, hIndex);
  const cleanPath = path.slice(0, end);
  if (cleanPath.length <= 3) return cleanPath;

  let firstPart = "";
  let secondPart = "";
  let partCount = 0;
  const start = cleanPath.startsWith("/") ? 1 : 0;

  for (let i = start; i < cleanPath.length; i++) {
    if (cleanPath[i] === "/") {
      if (partCount === 0 && firstPart) {
        partCount++;
        continue;
      }
      if (partCount === 1 && secondPart) {
        break;
      }
      continue;
    }

    if (partCount === 0) {
      firstPart += cleanPath[i];
    } else if (partCount === 1) {
      secondPart += cleanPath[i];
    }
  }

  if (!firstPart) return "";
  if (!secondPart) return `/${firstPart}`;
  return `/${firstPart}/${secondPart}`;
};

export const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-NG", {
    currency,
    currencyDisplay: "symbol",
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getTitle = (pathname?: string) => {
  if (!pathname) return "Dashboard";
  const paths = pathname.split("/").filter(Boolean);
  if (paths.length === 0) return "Dashboard";
  return paths[paths.length - 1].charAt(0).toUpperCase() + paths[paths.length - 1].slice(1);
};

export const getInitials = (fullName?: string) => {
  if (!fullName) return "";
  let names = fullName.split(" ");
  if (names.length > 2) names = names.slice(0, 2);
  return names.map((word) => word.substring(0, 1)).join("");
};
