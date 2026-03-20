"use client";

import { useReducer, useState } from "react";
import Input from "@/components/ui/Input";
import RadioGroup from "@/components/ui/RadioGroup";
import Checkbox from "@/components/ui/Checkbox";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { serviceOptions } from "../../_data/services";
import { validateForm } from "@/lib/validation";
import type { FormState, FormAction, FormErrors } from "@/types/form";

const initialState: FormState = {
  anrede: "",
  vorname: "",
  familienname: "",
  email: "",
  selectedService: "",
  agbAccepted: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ANREDE":
      return { ...state, anrede: action.value };
    case "SET_SERVICE":
      return { ...state, selectedService: action.value };
    case "TOGGLE_AGB":
      return { ...state, agbAccepted: !state.agbAccepted };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function EmbeddedFormSection() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = validateForm(state);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data: { error?: string } = await res.json();
        setErrors({ submit: data.error || "Ein Fehler ist aufgetreten." });
      }
    } catch {
      setErrors({ submit: "Verbindungsfehler. Bitte versuchen Sie es erneut." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section id="formular" className="bg-slate-50 py-10 md:py-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white border-t-4 border-accent shadow-soft overflow-hidden">
              <div className="p-5 sm:p-8 space-y-6">
                <div className="flex items-start gap-3 sm:gap-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4 sm:p-5">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-emerald-900 mb-1 font-[family-name:var(--font-barlow)]">
                      Ihre Anfrage wurde erfolgreich übermittelt
                    </h2>
                    <p className="text-sm text-emerald-800">
                      Wir haben Ihre Daten erhalten und werden uns in Kürze bei Ihnen melden.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-5">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">
                    Fragen oder Anliegen?
                  </h4>
                  <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700">
                    E-Mail:{" "}
                    <a
                      href="mailto:info@online-rentenauskunft.de"
                      className="text-primary hover:underline font-semibold"
                    >
                      info@online-rentenauskunft.de
                    </a>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-5">
                  <Button onClick={handleReset}>
                    Neue Anfrage stellen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="formular" className="bg-slate-50 py-10 md:py-14">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl font-[family-name:var(--font-barlow)]">
            Anfrage stellen
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Füllen Sie das Formular aus und wir kümmern uns um den Rest.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white border-t-4 border-accent shadow-soft overflow-hidden">
            <div className="p-6 sm:p-8 space-y-6">
              {/* Personal details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  Persönliche Daten
                </h3>
                <RadioGroup
                  name="anrede"
                  label="Anrede"
                  required
                  options={[
                    { value: "herr", label: "Herr" },
                    { value: "frau", label: "Frau" },
                    { value: "divers", label: "Divers" },
                  ]}
                  value={state.anrede}
                  onChange={(val) =>
                    dispatch({ type: "SET_ANREDE", value: val as FormState["anrede"] })
                  }
                  error={errors.anrede}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    id="vorname"
                    label="Vorname(n)"
                    required
                    value={state.vorname}
                    onChange={(e) =>
                      dispatch({ type: "SET_FIELD", field: "vorname", value: e.target.value })
                    }
                    error={errors.vorname}
                  />
                  <Input
                    id="familienname"
                    label="Familienname"
                    required
                    value={state.familienname}
                    onChange={(e) =>
                      dispatch({ type: "SET_FIELD", field: "familienname", value: e.target.value })
                    }
                    error={errors.familienname}
                  />
                </div>
                <Input
                  id="email"
                  label="E-Mail-Adresse"
                  type="email"
                  required
                  placeholder="ihre@email.de"
                  value={state.email}
                  onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
                  }
                  error={errors.email}
                />
              </div>

              {/* Service selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  Gewünschter Service
                </h3>
                <Select
                  id="selectedService"
                  label="Service auswählen"
                  required
                  value={state.selectedService}
                  onChange={(val) => dispatch({ type: "SET_SERVICE", value: val })}
                  options={serviceOptions.map((s) => ({
                    value: s.id,
                    label: s.label,
                  }))}
                  error={errors.selectedService}
                />
              </div>

              {/* AGB */}
              <div>
                <Checkbox
                  id="agb"
                  label="Ich akzeptiere die AGB und habe die Datenschutzerklärung gelesen."
                  checked={state.agbAccepted}
                  onChange={() => dispatch({ type: "TOGGLE_AGB" })}
                  error={errors.agbAccepted}
                />
              </div>

              {/* Submit error */}
              {errors.submit && (
                <p className="text-sm text-red-500 text-center">
                  {errors.submit}
                </p>
              )}

              {/* Submit */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-slate-400">
                  Ihre Daten werden sicher übertragen.
                </p>
                <Button
                  variant="accent"
                  className="w-full sm:w-auto"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Wird gesendet..." : "Anfrage absenden"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
