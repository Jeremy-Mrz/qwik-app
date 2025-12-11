export interface Option {
  key: string;
  label: string;
  next?: string;
}

interface Step {
  id?: number;
  description: string;
  next?: string;
  options: Record<string, Option>;
}

const task = {
  next: "intervention",
  type: 'choice',
  description: "Type de travaux",
  options: {
    supply: { key: "supply", label: "Fourniture" },
    installation: { key: "installation", label: "Pose" },
    complete: { key: "complete", label: "Fourniture & Pose" },
    repairs: { key: "repairs", label: "Réparation" },
    replacement: { key: "replacement", label: "Remplacement" },
  }
}

const intervention = {
  description: "Type d'intervention",
  options: {
    inner: { key: "inner", label: "Intérieur", next: "interior" },
    outer: { key: "outer", label: "Extérieur", next: "exterior" },
  }
}

const interior = {
  description: "Ouvrage",
  options: {
    door: { key: "door", label: "Porte", next: "interiorDoorDimensions" },
    stairs: { key: "stairs", label: "Escalier", next: "interiorStairsDimensions" },
    furnishings: { key: "furnishings", label: "Ameublement", next: "furnishingType" },
    flooring: { key: "flooring", label: "Sol", next: "floorDimensions" },
    wall: { key: "wall", label: "Murs" },
    ceiling: { key: "ceiling", label: "Plafond" },
  }
}

const exterior = {
  description: "Type d'intervention",
  options: {
    window: { key: "window", label: "Fenêtre" },
    blinds: { key: "blinds", label: "Volets" },
    door: { key: "door", label: "Porte" },
    fence: { key: "fence", label: "Cloture" },
    deck: { key: "deck", label: "Terrasse" },
  }
}

const interiorDoorDimensions = {
  description: "Dimensions",
  next: "interiorDoorMaterials",
  options: {
    classic: { key: "classic", label: "Standard" },
    custom: { key: "custom", label: "Sur-mesure" },
  }
}

const interiorDoorMaterials = {
  description: "Type de matériaux",
  next: "interiorDoorType",
  options: {
    low: { key: "low", label: "Entrée de gamme" },
    mid: { key: "mid", label: "Moyenne gamme" },
    high: { key: "high", label: "Haut de gamme" },
  }
}

const interiorDoorType = {
  description: "Type de porte",
  next: "interiorDoorFinitions",
  options: {
    battant: { key: "battant", label: "Battante" },
    sliding: { key: "sliding", label: "Coulissante" },
    other: { key: "other", label: "Autre" },
  }
}

const interiorDoorFinitions = {
  description: "Finitions",
  next: "confirmation",
  options: {
    varnish: { key: "varnish", label: "Vernis" },
    paint: { key: "paint", label: "Peinture" },
    raw: { key: "raw", label: "Brut" },
  }
}

const interiorStairsDimensions = {
  description: "Hauteur sous plafond",
  next: "interiorStairsMaterials",
  options: {
    little: { key: "little", label: "Petite" },
    standard: { key: "standard", label: "Standard" },
    high: { key: "high", label: "Haute" },
  }
}

const interiorStairsMaterials = {
  description: "Type de matériaux",
  next: "interiorStairsFinitions",
  options: {
    low: { key: "low", label: "Entrée de gamme" },
    mid: { key: "mid", label: "Moyenne gamme" },
    high: { key: "high", label: "Haut de gamme" },
  }
}

const interiorStairsFinitions = {
  description: "Type de finition",
  next: "confirmation",
  options: {
    varnish: { key: "varnish", label: "Vernis" },
    paint: { key: "paint", label: "Peinture" },
    raw: { key: "raw", label: "Brut" },
  }
}

const furnishingType = {
  description: "Type de meuble",
  next: "furnishingDimensions",
  options: {
    table: { key: "table", label: "Table" },
    chair: { key: "chair", label: "Chaise" },
    storage: { key: "storage", label: "Rangement" },
    kitchen: { key: "kitchen", label: "Cuisine" },
  }
}

const furnishingDimensions = {
  description: "Dimensions du meuble",
  next: "furnishingMaterials",
  options: {
    small: { key: "small", label: "Petite" },
    medium: { key: "medium", label: "Moyenne" },
    big: { key: "big", label: "Grande" },
  }
}

const furnishingMaterials = {
  description: "Type de matériaux",
  next: "confirmation",
  options: {
    low: { key: "low", label: "Entrée de gamme" },
    mid: { key: "mid", label: "Moyenne gamme" },
    high: { key: "high", label: "Haut de gamme" },
  }
}

const floorDimensions = {
  description: "Taille de la pièce",
  next: "floorType",
  options: {
    small: { key: "small", label: "Petite" },
    medium: { key: "medium", label: "Moyenne" },
    big: { key: "big", label: "Grande" },
  }
}

const floorType = {
  description: "Type de parquet",
  next: "confirmation",
  options: {
    solid: { key: "solid", label: "Massif" },
    laminated: { key: "laminated", label: "Stratifié" },
    floating: { key: "floating", label: "Flottant" },
  }
}

const confirmation = {
  description: "Validation",
  options: {
    confirm: { key: "confirm", label: "Contacter Erwan" },
    more: { key: "more", label: "Ajouter d'autres éléments au devis", next: "task" },
  }
}

export const steps: Record<string, Step> = {
  task,
  intervention,
  interior,
  exterior,
  interiorDoorDimensions,
  interiorDoorMaterials,
  interiorDoorType,
  interiorDoorFinitions,
  interiorStairsDimensions,
  interiorStairsMaterials,
  interiorStairsFinitions,
  furnishingType,
  furnishingDimensions,
  furnishingMaterials,
  floorDimensions,
  floorType,
  confirmation
}
