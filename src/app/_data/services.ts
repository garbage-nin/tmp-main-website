export interface ServiceOption {
  id: string;
  label: string;
}

export const serviceOptions: ServiceOption[] = [
  { id: "versicherungsverlauf", label: "Versicherungsverlauf anfordern" },
  { id: "schufa-auskunft", label: "Schufa-Auskunft anfordern" },
  { id: "flensburger-punkte", label: "Flensburger Punkteauskunft beantragen" },
  { id: "sozialversicherungsausweis", label: "Sozialversicherungsausweis anfordern" },
  { id: "grundbuchauszug", label: "Grundbuchauszug anfordern" },
  { id: "malediven-reiseerklaerung", label: "Malediven-Reiseerklärung einreichen" },
  { id: "visum-australien", label: "Visum für Australien beantragen" },
  { id: "reisevisum", label: "Reisevisum beantragen" },
];
