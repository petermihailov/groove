import { colors as colorsBase } from './tokens';

export const colors: Readonly<
  Partial<Record<keyof typeof colorsBase, string>>
> = {
  colorText: '#e2e6e9',
  colorIcon: '#e2e6e9',
  colorAccent: '#007fff',
  colorSurface1: '#171a1c',
  colorSurface2: '#394146',
  colorThumbHighlight: 'rgba(255, 255, 255, 0.075)',
  colorOverlay: 'rgba(0, 0, 0, 0.4)',
  colorDrawer: '#394146',
};
