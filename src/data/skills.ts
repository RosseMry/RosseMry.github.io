import { siPython, siPandas, siNumpy, siGithub, siDocker } from 'simple-icons';

export interface TechIcon {
  name: string;
  path: string;
  viewBox: string;
  hex: string;
}

// SQL, Power BI and Matplotlib have no brand mark in simple-icons; these are
// generic, non-trademarked glyphs standing in for the tool rather than a
// traced logo.
const DATABASE_PATH =
  'M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9.5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4zm0 5.5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z';
const BAR_CHART_PATH = 'M4 20V10h4v10H4zm6 0V4h4v16h-4zm6 0v-7h4v7h-4z';
const TREND_LINE_PATH = 'M3 17l6-6 4 4 8-8v4h2V3h-8v2h4l-6 6-4-4-8 8z';

export const SKILLS: TechIcon[] = [
  { name: 'Python', path: siPython.path, viewBox: '0 0 24 24', hex: `#${siPython.hex}` },
  { name: 'Pandas', path: siPandas.path, viewBox: '0 0 24 24', hex: `#${siPandas.hex}` },
  { name: 'NumPy', path: siNumpy.path, viewBox: '0 0 24 24', hex: `#${siNumpy.hex}` },
  { name: 'SQL', path: DATABASE_PATH, viewBox: '0 0 24 24', hex: 'var(--petal-blue-deep)' },
  { name: 'Power BI', path: BAR_CHART_PATH, viewBox: '0 0 24 24', hex: 'var(--petal-yellow-deep)' },
  { name: 'Matplotlib', path: TREND_LINE_PATH, viewBox: '0 0 24 24', hex: 'var(--petal-orange-deep)' },
  //{ name: 'Scikit-learn', path: siScikitlearn.path, viewBox: '0 0 24 24', hex: `#${siScikitlearn.hex}` },
  { name: 'GitHub', path: siGithub.path, viewBox: '0 0 24 24', hex: `#${siGithub.hex}` },
  { name: 'Docker', path: siDocker.path, viewBox: '0 0 24 24', hex: `#${siDocker.hex}` },
  //{ name: 'Go', path: siGo.path, viewBox: '0 0 24 24', hex: `#${siGo.hex}` },
  //{ name: 'React', path: siReact.path, viewBox: '0 0 24 24', hex: `#${siReact.hex}` },
];
