/**
 * Token values mirrored in TypeScript.
 *
 * CSS is the source of truth for anything you can style with a class — reach
 * for these where CSS custom properties cannot go: charts and canvas, email
 * templates, generated Word/PowerPoint/PDF files, native surfaces, or docs.
 */

/** The eight brand colours, exactly. Four main, four alt. */
export const brand = {
  /** Main — page and surface white. */
  white: '#FCFCFD',
  /** Main — text and the strongest action on light grounds. */
  black: '#15181A',
  /** Main — the brand ground: dark theme, covers, hero and title bands. */
  deepTeal: '#08242B',
  /** Main — THE accent. One rose element per page, slide or view. */
  rose: '#EE4065',
  /** Alt — support, info, second data series. */
  teal: '#0FA2BF',
  /** Alt — categorical. */
  orange: '#FF8102',
  /** Alt — warning, highlight, categorical. */
  yellow: '#FAB400',
  /** Alt — categorical, data. */
  indigo: '#4F46E5',
} as const;

export const palette = {
  neutral: {
    0: '#FCFCFD',
    50: '#F6F7F8',
    100: '#EEF0F1',
    200: '#E1E4E6',
    300: '#CBD0D3',
    400: '#9EA5AA',
    500: '#6B7278',
    600: '#555C62',
    700: '#3E4449',
    800: '#2A2E32',
    900: '#1D2023',
    950: '#15181A',
  },
  deep: {
    50: '#E6EEF0',
    100: '#C3D4D8',
    200: '#A9C0C5',
    300: '#7E9AA1',
    400: '#4E6B72',
    500: '#346672',
    600: '#23525E',
    700: '#1A4450',
    750: '#12383F',
    800: '#0C2E36',
    900: '#08242B',
    950: '#051A1F',
  },
  rose: {
    50: '#FCF0F3',
    100: '#F8E0E5',
    200: '#F9B9C6',
    300: '#F58AA1',
    400: '#F05677',
    500: '#EE4065',
    600: '#DE143F',
    700: '#B11032',
    800: '#8B0C27',
    900: '#69091E',
  },
  teal: {
    50: '#F0FAFC',
    100: '#E0F4F8',
    200: '#B8EFF9',
    300: '#89E4F6',
    400: '#55D8F2',
    500: '#0FA2BF',
    600: '#0C7B99',
    700: '#0A5D7A',
    800: '#084460',
    900: '#063149',
  },
  orange: {
    50: '#FDF6EF',
    100: '#FAECDE',
    200: '#FFD9B2',
    300: '#FFC080',
    400: '#FFA447',
    500: '#FF8102',
    600: '#CE5800',
    700: '#A43B00',
    800: '#802500',
    900: '#621500',
  },
  yellow: {
    50: '#FDF9EF',
    100: '#FAF2DE',
    200: '#FFEAB2',
    300: '#FFDB80',
    400: '#FFCC47',
    500: '#FAB400',
    600: '#C87800',
    700: '#A04D00',
    800: '#7D2D00',
    900: '#5F1700',
  },
  indigo: {
    50: '#F2F1FB',
    100: '#E2E1F7',
    200: '#BFBCF6',
    300: '#958FEF',
    400: '#665EE8',
    500: '#4F46E5',
    600: '#281DD2',
    700: '#2018A8',
    800: '#191283',
    900: '#130E64',
  },
  green: {
    50: '#F1FBF7',
    100: '#E1F7EE',
    200: '#BCF5DF',
    300: '#90EFC9',
    400: '#5EE8B2',
    500: '#17A06A',
    600: '#128059',
    700: '#0F664A',
    800: '#0C503C',
    900: '#093D30',
  },
  red: {
    50: '#FBF2F1',
    100: '#F6E4E2',
    200: '#F3C3BE',
    300: '#EC9B93',
    400: '#E36E63',
    500: '#D93A2B',
    600: '#B02C20',
    700: '#8D2319',
    800: '#6E1C14',
    900: '#54150F',
  },
} as const;

/**
 * Categorical series colours for charts, in the order they should be used.
 * Rose leads because it is the accent; dark teal is the quiet second series.
 * A one-series chart is rose, a two-series chart is rose and dark teal —
 * the alt colours enter only when the data needs to be told apart. On a dark
 * ground, swap the second entry for `palette.neutral[0]`.
 */
export const chartSeries = [
  brand.rose,
  brand.deepTeal,
  brand.teal,
  brand.yellow,
  brand.indigo,
  brand.orange,
] as const;

/** The signature rose surface: hero bands and call-to-action strips. */
export const roseGradient =
  'linear-gradient(90deg, #E63A5F 0%, #B61639 100%)';

/** Rose through the warm alts. Covers, strips and hero accents only. */
export const brandGradient =
  'linear-gradient(120deg, #EE4065 0%, #FF8102 55%, #FAB400 100%)';

export const typography = {
  fontFamily: {
    sans: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    /** Emphasis words in headlines only, set in italic. */
    serif: "'DM Serif Display', Georgia, serif",
  },
  fontSize: {
    '2xs': '0.6875rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.375rem',
    '2xl': '1.75rem',
    '3xl': '2.25rem',
    '4xl': '3rem',
    '5xl': '3.75rem',
  },
  fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 1.1, snug: 1.25, normal: 1.5, relaxed: 1.7 },
} as const;

export const space = {
  0: '0',
  '3xs': '0.125rem',
  '2xs': '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
} as const;

export const radius = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '18px',
  xl: '24px',
  '2xl': '48px',
  pill: '999px',
} as const;

/**
 * Type sizes for fixed-size media, in points. The web scale above is in rem;
 * documents and slides need absolute sizes.
 */
export const mediaType = {
  /** Word, PDF reports, letters, one-pagers (A4 / Letter). */
  document: { title: 28, h1: 20, h2: 15, h3: 12, body: 10.5, small: 9, caption: 8 },
  /** 16:9 slides at 13.333 × 7.5 in. */
  slides: { display: 54, title: 36, subtitle: 22, body: 18, small: 14, caption: 11 },
} as const;

/**
 * Office theme (Word / PowerPoint / Excel "Colors" + "Fonts"). Apply it as the
 * file's theme so built-in styles, charts and SmartArt pick up the brand.
 */
export const officeTheme = {
  dk1: brand.black,
  lt1: brand.white,
  dk2: brand.deepTeal,
  lt2: palette.neutral[100],
  accent1: brand.rose,
  accent2: brand.teal,
  accent3: brand.orange,
  accent4: brand.yellow,
  accent5: brand.indigo,
  accent6: palette.neutral[600],
  hlink: brand.black,
  folHlink: palette.neutral[600],
  majorFont: 'DM Sans',
  minorFont: 'DM Sans',
  /** Italic emphasis words in titles. */
  emphasisFont: 'DM Serif Display',
  fallbackFont: 'Arial',
  emphasisFallbackFont: 'Georgia',
} as const;

export const tokens = {
  brand,
  palette,
  chartSeries,
  brandGradient,
  roseGradient,
  typography,
  space,
  radius,
  mediaType,
  officeTheme,
} as const;

export type InsightureTokens = typeof tokens;
