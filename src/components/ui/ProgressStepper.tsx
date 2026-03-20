interface ProgressStepperProps {
  currentStep: number;
}

const steps = [
  "Persönliche Daten",
  "Adresse & Versicherung",
  "Unterlagen & Bestellung",
];

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  return (
    <div className="px-6 pt-6 sm:px-8 sm:pt-8">
      <p className="text-sm font-medium text-slate-500">
        Schritt {currentStep} von {steps.length}
        <span className="ml-1 text-slate-700"> &mdash; {steps[currentStep - 1]}</span>
      </p>
      <div className="mt-3 flex gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentStep ? "bg-accent" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
