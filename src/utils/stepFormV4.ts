export interface Option {
  key: string;
  label: string;
  next?: string;
}

interface Step {
  id?: number;
  description: string;
  next?: string;
  options: Option[];
}

const task = {
  next: "1",
  type: 'choice',
  description: "Type de travaux",
  options: [
    { key: "supply", label: "Fourniture" },
    { key: "installation", label: "Pose" },
    { key: "complete", label: "Fourniture & Pose" },
    { key: "repairs", label: "Réparation" },
    { key: "replacement", label: "Remplacement" },
  ]
}

const intervention = {
  description: "Type d'intervention",
  options: [
    { key: "interior", label: "Intérieur", next: "2" },
    { key: "exterior", label: "Extérieur", next: "3" },
  ]
}

const interior = {
  description: "Ouvrage",
  options: [
    { key: "door", label: "Porte", next: "4" },
    { key: "stairs", label: "Escalier", next: "8" },
    { key: "furnishings", label: "Ameublement", next: "11" },
    { key: "flooring", label: "Sol", next: "14" },
    { key: "wall", label: "Murs" },
    { key: "ceiling", label: "Plafond" },
  ]
}

const exterior = {
  description: "Type d'intervention",
  options: [
    { key: "window", label: "Fenêtre" },
    { key: "blinds", label: "Volets" },
    { key: "door", label: "Porte" },
    { key: "fence", label: "Cloture" },
    { key: "deck", label: "Terrasse" },
  ]
}

const interiorDoorDimensions = {
  description: "Dimensions",
  next: "5",
  options: [
    { key: "standard", label: "Standard" },
    { key: "custom", label: "Sur-mesure" },
  ]
}

const interiorDoorMaterials = {
  description: "Type de matériaux",
  next: "6",
  options: [
    { key: "low", label: "Entrée de gamme" },
    { key: "mid", label: "Moyenne gamme" },
    { key: "high", label: "Haut de gamme" },
  ]
}

const interiorDoorType = {
  description: "Type de porte",
  next: "7",
  options: [
    { key: "standard", label: "Battante" },
    { key: "sliding", label: "Coulissante" },
    { key: "other", label: "Autre" },
  ]
}

const interiorDoorFinitions = {
  description: "Finitions",
  next: "16",
  options: [
    { key: "varnish", label: "Vernis" },
    { key: "paint", label: "Peinture" },
    { key: "raw", label: "Brut" },
  ]
}

const interiorStairsDimensions = {
  description: "Hauteur sous plafond",
  next: "9",
  options: [
    { key: "little", label: "Petite" },
    { key: "standard", label: "Standard" },
    { key: "high", label: "Haute" },
  ]
}

const interiorStairsMaterials = {
  description: "Type de matériaux",
  next: "10",
  options: [
    { key: "low", label: "Entrée de gamme" },
    { key: "mid", label: "Moyenne gamme" },
    { key: "high", label: "Haut de gamme" },
  ]
}

const interiorStairsFinitions = {
  description: "Type de finition",
  next: "16",
  options: [
    { key: "varnish", label: "Vernis" },
    { key: "paint", label: "Peinture" },
    { key: "raw", label: "Brut" },
  ]
}

const furnishingType = {
  description: "Type de meuble",
  next: "12",
  options: [
    { key: "table", label: "Table" },
    { key: "chair", label: "Chaise" },
    { key: "storage", label: "Rangement" },
    { key: "kitchen", label: "Cuisine" },
  ]
}

const furnishingDimensions = {
  description: "Dimensions du meuble",
  next: "13",
  options: [
    { key: "small", label: "Petite" },
    { key: "medium", label: "Moyenne" },
    { key: "big", label: "Grande" },
  ]
}

const furnishingMaterials = {
  description: "Type de matériaux",
  next: "16",
  options: [
    { key: "low", label: "Entrée de gamme" },
    { key: "mid", label: "Moyenne gamme" },
    { key: "high", label: "Haut de gamme" },
  ]
}

const floorDimensions = {
  description: "Taille de la pièce",
  next: "15",
  options: [
    { key: "small", label: "Petite" },
    { key: "medium", label: "Moyenne" },
    { key: "big", label: "Grande" },
  ]
}

const floorType = {
  description: "Type de parquet",
  next: "16",
  options: [
    { key: "solid", label: "Massif" },
    { key: "laminated", label: "Stratifié" },
    { key: "floating", label: "Flottant" },
  ]
}

const confirmation = {
  description: "Validation",
  options: [
    { key: "confirm", label: "Confirmer le devis" },
    { key: "more", label: "Ajouter d'autres éléments au devis", next: "0" },
  ]
}

export const steps: Record<string, Step> = {
  "0": task,
  "1": intervention,
  "2": interior,
  "3": exterior,
  "4": interiorDoorDimensions,
  "5": interiorDoorMaterials,
  "6": interiorDoorType,
  "7": interiorDoorFinitions,
  "8": interiorStairsDimensions,
  "9": interiorStairsMaterials,
  "10": interiorStairsFinitions,
  "11": furnishingType,
  "12": furnishingDimensions,
  "13": furnishingMaterials,
  "14": floorDimensions,
  "15": floorType,
  "16": confirmation
}
