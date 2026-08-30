export function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

export function isValidName(name: string): boolean {
  const value = normalizeName(name);
  return value.length >= 2 && value.length <= 80;
}

export function isValidEmail(email: string): boolean {
  const value = email.trim();
  if (value.length < 5 || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
