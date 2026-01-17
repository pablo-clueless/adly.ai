export const normalize = (path: string): string => {
  if (!path) return "";
  if (path.length <= 3) return path;

  let firstPart = "";
  let secondPart = "";
  let partCount = 0;
  const start = path.startsWith("/") ? 1 : 0;

  for (let i = start; i < path.length; i++) {
    if (path[i] === "/") {
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
      firstPart += path[i];
    } else if (partCount === 1) {
      secondPart += path[i];
    }
  }

  if (!firstPart) return "";
  if (!secondPart) return `/${firstPart}`;
  return `/${firstPart}/${secondPart}`;
};

export const capitalize = (str?: string): string => {
  if (!str?.length) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str?: string) => {
  if (!str?.length) return "";
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

export const mask = (value?: string) => {
  if (!value) return "";
  return value.replace(/./g, "*");
};

export const fromKebabCase = (str: string) => {
  return str.replace(/-/g, " ");
};

export const fromPascalCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const fromCamelCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
};

export const fromSnakeCase = (str: string) => {
  return str.replace(/_/g, " ");
};

export const toKebabCase = (str: string) => {
  return str.toLowerCase().replace(/ /g, "-");
};

export const toPascalCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/ /g, "")
    .replace(/^./, (str) => str.toUpperCase());
};

export const toCamelCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/ /g, "")
    .replace(/^./, (str) => str.toLowerCase());
};

export const toSnakeCase = (str: string) => {
  return str.toLowerCase().replace(/ /g, "_");
};

export const formatCurrency = (amount: number, currency = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    currency,
    currencyDisplay: "symbol",
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};
