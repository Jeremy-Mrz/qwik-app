export interface Option {
  key: string;
  label: string;
  next?: number[];
}

interface Step {
  id?: number;
  description: string;
  next?: number[];
  options: Option[];
}

const task = {
  next: [1],
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

const intervention = {
  description: "Type d'intervention",
  options: [
    { key: "interior", label: "intérieur", next: [2] },
    { key: "exterior", label: "extérieur", next: [3] },
  ]
}

const interior = {
  description: "Ouvrage",
  options: [
    { key: "door", label: "porte", next: [4, 5, 2] },
    { key: "stairs", label: "escalier" },
    { key: "furnishings", label: "ameublement" },
    { key: "flooring", label: "sol" },
    { key: "wall", label: "murs" },
    { key: "ceiling", label: "plafond" },
  ]
}

const exterior = {
  description: "Type d'intervention",
  options: [
    { key: "window", label: "fenêtre" },
    { key: "blinds", label: "volets" },
    { key: "door", label: "porte" },
    { key: "fence", label: "cloture" },
    { key: "deck", label: "terrasse" },
  ]
}

const dimensions = {
  description: "Dimensions",
    options: [
    { key: "standard", label: "standard" },
    { key: "custom", label: "sur-mesure" },
  ]
}

const materials = {
  description: "Type de matériaux",
    options: [
    { key: "low", label: "entrée de gamme" },
    { key: "mid", label: "moyenne gamme" },
    { key: "high", label: "haut de gamme" },
  ]
}

export const steps: Record<string, Step> = {
  "0": task,
  "1": intervention,
  "2": interior,
  "3": exterior,
  "4": dimensions,
  "5": materials
}
