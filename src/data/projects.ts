export type ProjectAccent = 'purple' | 'peach' | 'cornflower' | 'pink';
export type ProjectFilterGroup = 'Data Science' | 'Machine Learning' | 'AI' | 'Analytics';

export const FILTER_GROUPS: ProjectFilterGroup[] = ['Data Science', 'Machine Learning', 'AI', 'Analytics'];

/** Petal colors each accent resolves to — shared by the Home and Work project cards' corner flower and underline. */
export const PROJECT_ACCENT: Record<ProjectAccent, { petal: string; deep: string }> = {
  purple: { petal: 'var(--petal-purple)', deep: 'var(--petal-purple-deep)' },
  peach: { petal: 'var(--petal-peach)', deep: 'var(--petal-peach-deep)' },
  cornflower: { petal: 'var(--petal-cornflower)', deep: 'var(--petal-cornflower-deep)' },
  pink: { petal: 'var(--petal-pink)', deep: 'var(--petal-pink-deep)' },
};

export interface Project {
  name: string;
  category: string;
  tech: string[];
  description: string;
  /** Omitted when the repo isn't public yet. */
  link?: string;
  image: 'dslr' | 'linearRegression' | 'piscine' | 'ecommerce'| 'ecommerce2';
  /** Which petal color the project's corner flower and cute underline pick up. */
  accent: ProjectAccent;
  filterGroup: ProjectFilterGroup;
}

export const PROJECTS: Project[] = [
 /* {
    name: 'DSLR',
    category: 'Multiclass Classification',
    tech: ['Python', 'Machine Learning'],
    description:
      'A multiclass classifier built from scratch with logistic regression — gradient descent instead of a black box.',
    image: 'dslr',
    accent: 'purple',
    filterGroup: 'Machine Learning',
  },*/
  {
    name: 'ft_linear_regression',
    category: 'Linear Regression',
    tech: ['Python', 'NumPy'],
    description: 'Linear regression implemented from first principles to predict car prices from mileage.',
    link: 'https://github.com/RosseMry/ft_linear_regression',
    image: 'linearRegression',
    accent: 'peach',
    filterGroup: 'Machine Learning',
  },
  {
    name: 'Piscine Data Science',
    category: 'Python Piscine',
    tech: ['SQL', 'Python', 'Statistics'],
    description: "A deep dive into SQL, data analysis, statistics and visualization during 42's Python piscine.",
    link: 'https://github.com/RosseMry/Python',
    image: 'piscine',
    accent: 'cornflower',
    filterGroup: 'Data Science',
  },
  {
    name: 'E-commerce Sales Data',
    category: 'Data Analysis',
    tech: ['Python', 'Pandas', 'Visualization'],
    description: 'Exploring profit, quantity and seasonality trends across two years of e-commerce sales.',
    link: 'https://github.com/RosseMry/E-commerce-Sales-Data',
    image: 'ecommerce',
    accent: 'pink',
    filterGroup: 'Analytics',
  },
   {
    name: 'E-commerce Transaction Data',
    category: 'Data Analysis',
    tech: ['Python', 'PowerBI', 'Visualization'],
    description: 'Identifying top-selling products and categories to improve sales strategies',
    link: 'https://github.com/RosseMry/E-commerce-Sales-Transactions-Dataset',
    image: 'ecommerce2',
    accent: 'purple',
    filterGroup: 'Analytics',
  },
];
