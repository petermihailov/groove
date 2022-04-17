import type { colors as colorsBase } from './tokens';

export const colors: Readonly<Record<keyof typeof colorsBase, string>> = {
  colorAccent: '#007fff',
  colorHighlight: '#007fff',
  colorBorder: '#394146',
  colorDrawer: '#394146',
  colorIcon: '#e2e6e9',
  colorOverlay: 'rgba(0, 0, 0, 0.4)',
  colorSurface1: '#171a1c',
  colorSurface2: '#111',
  colorText: '#e2e6e9',
  colorThumbHighlight: 'rgba(255, 255, 255, 0.075)',
};
