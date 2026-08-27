/**
 * Deterministic pseudo-random in [0, 1) derived from a numeric seed.
 *
 * Uses an integer avalanche hash rather than the classic fract(sin(x)*C)
 * trick — that trig-based hash is smooth, so seeds spaced a fixed distance
 * apart (as FlowerField generates: seedBase + i * step) come out visibly
 * correlated instead of scattered, which read as flowers clustering by
 * color/size in a row instead of a mixed garden.
 */
export function seededRandom(seed: number): number {
  let h = Math.floor(seed * 1000);
  h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d) >>> 0;
  h = Math.imul(h ^ (h >>> 12), 0x297a2d39) >>> 0;
  h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

/** Deterministic value in [min, max) derived from a seed. */
export function seededRange(seed: number, min: number, max: number): number {
  return min + seededRandom(seed) * (max - min);
}
