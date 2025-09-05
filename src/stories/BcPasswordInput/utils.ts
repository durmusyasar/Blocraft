export interface PasswordRules {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export function getPasswordStrength(
  password: string,
  minLength: number = 8,
  requireUppercase = true,
  requireLowercase = true,
  requireNumber = true,
  requireSpecial = false
): number {
  let score = 0;
  if (password.length >= minLength) score++;
  if (requireUppercase && /[A-Z]/.test(password)) score++;
  if (requireLowercase && /[a-z]/.test(password)) score++;
  if (requireNumber && /[0-9]/.test(password)) score++;
  if (requireSpecial && /[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export function getPasswordRules(
  password: string,
  minLength: number = 8,
  requireUppercase = true,
  requireLowercase = true,
  requireNumber = true,
  requireSpecial = false
): PasswordRules {
  return {
    minLength: password.length >= minLength,
    uppercase: !requireUppercase || /[A-Z]/.test(password),
    lowercase: !requireLowercase || /[a-z]/.test(password),
    number: !requireNumber || /[0-9]/.test(password),
    special: !requireSpecial || /[^A-Za-z0-9]/.test(password),
  };
} 