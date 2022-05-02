import type { colors as colorsBase } from './tokens';

export const colorsDark: Readonly<Record<keyof typeof colorsBase, string>> = {
  colorAccent: '#007fff',
  colorBorder: '#394146',
  colorDelimiter: '#394146',
  colorDrawer: '#394146',
  colorHighlight: 'rgba(0, 127, 255, 0.2)',
  colorIcon: '#e2e6e9',
  colorOverlay: 'rgba(0, 0, 0, 0.4)',
  colorSurface1: '#2c2f31',
  colorSurface2: '#0d161c',
  colorText: '#e2e6e9',
  colorThumbHighlight: 'rgba(255, 255, 255, 0.075)',
  colorTint: 'rgba(0, 127, 255, 0.1)',
};
