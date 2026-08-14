/**
 * Token values mirrored in TypeScript.
 *
 * CSS is the source of truth for anything you can style with a class — reach
 * for these only where CSS custom properties cannot go: canvas/chart libraries,
 * email templates, native surfaces, or generated documentation.
 */

/** The Insighture mark, exactly as drawn. */
export const brand = {
  azure: '#0182CB',
  coral: '#FC773B',
  amber: '#FC9B1F',
  yellow: '#FFD438',
  navy: '#004166',
  white: '#FFFFFF',
  black: '#101315',
} as const;

export const palette = {
  azure: {
    50: '#F1F7FB',
    100: '#DFEFF9',
    200: '#B9E0F9',
    300: '#83CCFB',
    400: '#46B5FE',
    500: '#0182CB',
    600: '#015FA2',
    700: '#01437E',
    800: '#01305E',
    900: '#022245',
  },
  orange: {
    50: '#FBF5F1',
    100: '#F9E9DF',
    200: '#F8D1B9',
    300: '#FAB185',
    400: '#FC8C48',
    500: '#FC773B',
    600: '#F54604',
    700: '#BE3103',
    800: '#8F2304',
    900: '#691904',
  },
  yellow: {
    50: '#FBF9F1',
    100: '#F9F4DE',
    200: '#F9EDB8',
    300: '#FCE683',
    400: '#FFDD45',
    500: '#FFD438',
    600: '#F9AF00',
    700: '#C17A00',
    800: '#915501',
    900: '#6A3C03',
  },
  green: {
    50: '#F1F9F6',
    100: '#DCF1EA',
    200: '#B4E3D6',
    300: '#7FCFBB',
    400: '#3FB79B',
    500: '#0FA37F',
    600: '#0C826A',
    700: '#096555',
    800: '#084C41',
    900: '#073831',
  },
  red: {
    50: '#FAF2F3',
    100: '#F6E2E3',
    200: '#F1C1C4',
    300: '#EC9299',
    400: '#E75D67',
    500: '#E23D4F',
    600: '#C81E34',
    700: '#9B172B',
    800: '#741323',
    900: '#560F1B',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFB',
    100: '#F3F4F5',
    200: '#E5E7E9',
    300: '#D0D3D6',
    400: '#A4A9AE',
    500: '#787E84',
    600: '#585E64',
    700: '#414750',
    800: '#292E34',
    900: '#1A1E22',
    950: '#101315',
  },
  /** The dark-mode ground. */
  ink: {
    canvas: '#0B0D0F',
    surface: '#131619',
    raised: '#1B1F23',
    sunken: '#070809',
  },
} as const;

/**
 * Categorical series colours for charts, in the order they should be used.
 * Orange leads because it is the accent; azure holds a single slot, in keeping
 * with the small dose of blue the system allows. A one-series chart is orange,
 * a two-series chart is orange and near-black — colour enters only when the
 * data actually needs to be told apart.
 */
export const chartSeries = [
  palette.orange[500],
  palette.neutral[800],
  palette.azure[500],
  palette.yellow[500],
  palette.green[500],
  palette.orange[700],
] as const;

/** The four segments of the mark, in mark order. */
export const brandGradient =
  'linear-gradient(120deg, #FC773B 0%, #FC9B1F 32%, #FFD438 62%, #0182CB 100%)';

export const typography = {
  fontFamily: {
    sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
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
  lg: '16px',
  xl: '24px',
  pill: '999px',
} as const;

export const tokens = {
  brand,
  palette,
  chartSeries,
  brandGradient,
  typography,
  space,
  radius,
} as const;

export type InsightureTokens = typeof tokens;
