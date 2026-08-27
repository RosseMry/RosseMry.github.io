export type SizeClass = 'medium' | 'large' | 'xl';

export interface HeroFlowerSpec {
  /** % from top/left of the hero, centered on that point. Can go outside 0-100 so it bleeds off the edge. */
  topPct: number;
  leftPct: number;
  size: SizeClass;
  rotation: number;
  seed: number;
  side: 'left' | 'right';
  /** 1 = shown at every breakpoint, 2 = tablet and up, 3 = desktop only. */
  priority: 1 | 2 | 3;
}

// Hand-placed, not procedural: an organic, asymmetric bouquet framing each
// side. Only 2 xl anchor flowers (one per side) plus a third xl one tucked
// bottom-right — larges and mediums do the rest of the work, per the
// "large flowers are anchors, not the majority" guidance.
export const HERO_FLOWERS: HeroFlowerSpec[] = [
  // Left side — a tight cluster near the top corner, another near the
  // bottom corner, with the middle left clear for the hero text.
  { topPct: 2, leftPct: 2, size: 'xl', rotation: -12, seed: 5.2, side: 'left', priority: 1 },
  { topPct: 13, leftPct: 14, size: 'large', rotation: 18, seed: 8.9, side: 'left', priority: 2 },
  { topPct: 25, leftPct: 3, size: 'large', rotation: 6, seed: 12.4, side: 'left', priority: 2 },
  { topPct: 76, leftPct: 17, size: 'xl', rotation: -22, seed: 15.1, side: 'left', priority: 1 },
  { topPct: 88, leftPct: 2, size: 'large', rotation: 10, seed: 18.7, side: 'left', priority: 1 },

  // Right side — asymmetric: a different count and rhythm than the left.
  { topPct: 2, leftPct: 98, size: 'xl', rotation: 14, seed: 23.3, side: 'right', priority: 1 },
  { topPct: 14, leftPct: 86, size: 'large', rotation: -16, seed: 27.6, side: 'right', priority: 2 },
  { topPct: 27, leftPct: 77, size: 'large', rotation: 8, seed: 31.2, side: 'right', priority: 2 },
  { topPct: 66, leftPct: 91, size: 'large', rotation: 20, seed: 35.8, side: 'right', priority: 2 },
  { topPct: 77, leftPct: 81, size: 'xl', rotation: -9, seed: 39.4, side: 'right', priority: 1 },
  { topPct: 88, leftPct: 98, size: 'xl', rotation: -14, seed: 43.9, side: 'right', priority: 1 },
];

export const HERO_SIZES: Record<'mobile' | 'tablet' | 'desktop', Record<SizeClass, number>> = {
  mobile: { medium: 44, large: 64, xl: 92 },
  tablet: { medium: 64, large: 96, xl: 144 },
  desktop: { medium: 95, large: 140, xl: 210 },
};

// Watercolor Bloom (Flower2) proportions: pointier, narrower taper and a
// smaller center dot — per size class so xl flowers read as clear anchors
// rather than just a scaled-up medium one.
export const HERO_PETALS: Record<SizeClass, { length: number; width: number; center: number }> = {
  medium: { length: 33, width: 17, center: 4.5 },
  large: { length: 39, width: 20, center: 5 },
  xl: { length: 45, width: 23, center: 6 },
};

// Bolder, rounder proportions for the plain `Flower` mixed in alongside the
// Watercolor Bloom — a visibly different "species" so the side bouquets read
// as a real mixed garden instead of one repeated silhouette.
export const HERO_PETALS_FLOWER1: Record<SizeClass, { length: number; width: number; center: number }> = {
  medium: { length: 33, width: 23, center: 12.5 },
  large: { length: 39, width: 29, center: 14.5 },
  xl: { length: 45, width: 36, center: 17 },
};
