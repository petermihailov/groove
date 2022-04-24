import type { colors as colorsBase } from './tokens';

export const colorsDark: Readonly<Record<keyof typeof colorsBase, string>> = {
  colorAccent: '#007fff',
  colorHighlight: 'rgba(0, 127, 255, 0.2)',
  colorBorder: '#394146',
  colorDrawer: '#394146',
  colorIcon: '#e2e6e9',
  colorOverlay: 'rgba(0, 0, 0, 0.4)',
  colorSurface1: '#2c2f31',
  colorSurface2: '#070c0f',
  colorText: '#e2e6e9',
  colorThumbHighlight: 'rgba(255, 255, 255, 0.075)',
};
