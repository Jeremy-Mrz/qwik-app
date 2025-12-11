export interface Option {
  key: string;
  label: string;
  next?: number;
}

export interface FormField {
  key: string;
  label: string;
  type: "number";
  min?: number;
  max?: number;
  placeholder?: string;
  value?: number;
}

type StepType = 'choice' | 'form';

interface ChoiceStep {
  id?: number;
  type: StepType;
  description: string;
  next?: number;
  options: Option[];
}

interface FormStep {
  id?: number;
  type: StepType;
  description: string;
  next?: number;
  fields: FormField[];
}

export type Step = ChoiceStep | FormStep;


export const kitchenSimulator = [
  {
    description: "Type de matérieux",
    options: [
      "haut de gamme",
      "bas de gamme",
      "milieu de gamme"
    ]
  },
  {
    description: "Type de travaux",
    options: [
      "construction",
      "rénovation",
    ]
  }
]

const task: ChoiceStep = {
  next: 1,
  type: 'choice',
  description: "Type de travaux",
  options: [
    { key: "supply", label: "fourniture" },
    { key: "installation", label: "pose" },
    { key: "supplyAnInstallation", label: "fourniture et pose" },
    { key: "repairs", label: "réparation" },
    { key: "replacement", label: "remplacement" },
  ]
}
const intervention: ChoiceStep = {
  type: 'choice',
  description: "Type d'intervention",
  options: [
    { key: "interior", label: "intérieur", next: 2 },
    { key: "exterior", label: "extérieur", next: 3 },
  ]
}

const interior: ChoiceStep = {
  type: 'choice',
  description: "Ouvrage",
  next: 3,
  options: [
    { key: "door", label: "porte" },
    { key: "stairs", label: "escalier" },
    { key: "furnishings", label: "ameublement" },
    { key: "flooring", label: "sol" },
    { key: "wall", label: "murs" },
    { key: "ceiling", label: "plafond" },
  ]
}

const exterior: ChoiceStep = {
  type: 'choice',
  description: "Type d'intervention",
  options: [
    { key: "window", label: "fenêtre" },
    { key: "blinds", label: "volets" },
    { key: "door", label: "porte" },
    { key: "fence", label: "cloture" },
    { key: "deck", label: "terrasse" },
  ]
}

const interiorInfo: FormStep = {
  type: 'form',
  next: 1,
  description: "Information complémentaire",
  fields: [
    { key: "unit", label: "nombre d'unité", type: "number", min: 0, max: 100 },
    { key: "width", label: "largeur", type: "number", min: 0, max: 100 },
    { key: "length", label: "longueur", type: "number", min: 0, max: 100 },
    { key: "height", label: "hauteur", type: "number", min: 0, max: 100 },
  ]
}

export const steps: Record<number, Step> = {
  0: task,
  1: intervention,
  2: interior,
  4: exterior,
  3: interiorInfo
}
