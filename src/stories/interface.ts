export interface ValidationResult {
  isValid: boolean;
  message?: string;
  type?: "error" | "warning" | "success" | "info";
}
