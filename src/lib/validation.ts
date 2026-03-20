import type { FormState, FormErrors } from "@/types/form";

export function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!state.anrede) {
    errors.anrede = "Bitte wählen Sie eine Anrede.";
  }
  if (!state.vorname.trim()) {
    errors.vorname = "Bitte geben Sie Ihren Vornamen ein.";
  }
  if (!state.familienname.trim()) {
    errors.familienname = "Bitte geben Sie Ihren Familiennamen ein.";
  }
  if (!state.email.trim()) {
    errors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }
  if (!state.selectedService) {
    errors.selectedService = "Bitte wählen Sie einen Service aus.";
  }
  if (!state.agbAccepted) {
    errors.agbAccepted = "Bitte akzeptieren Sie die AGB.";
  }

  return errors;
}
