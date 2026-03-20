export interface FormState {
  anrede: "herr" | "frau" | "divers" | "";
  vorname: string;
  familienname: string;
  email: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  country: string;
  selectedService: string;
  agbAccepted: boolean;
}

export type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "SET_ANREDE"; value: FormState["anrede"] }
  | { type: "SET_SERVICE"; value: string }
  | { type: "TOGGLE_AGB" }
  | { type: "RESET" };

export interface FormErrors {
  [key: string]: string;
}
