import { paramCase } from 'param-case';

import {
  colors,
  easing,
  radius,
  shadow,
  spacing,
  transition,
  typography,
  zIndex,
} from './tokens';
import { colors as colorsDark } from './tokens-dark';

function makeVariableName(name: string) {
  return `--${paramCase(name)}`;
}

const tokens = {
  ...colors,
  ...radius,
  ...shadow,
  ...spacing,
  ...easing,
  ...transition,
  ...typography,
  ...zIndex,
} as const;

type Theme = Record<keyof typeof tokens, string>;
type CssRootVars = Record<string, string | number>;

export const { rootVars, rootVarsDark, theme } = Object.entries(tokens).reduce<{
  rootVars: CssRootVars;
  rootVarsDark: CssRootVars;
  theme: Theme;
}>(
  (acc, [name, value]) => {
    const varName = makeVariableName(name);
    
    return {
      theme: { ...acc.theme, [name]: `var(${varName})` },
      rootVars: { ...acc.rootVars, [varName]: value },
      rootVarsDark: {
        ...acc.rootVarsDark,
        ...(name in colorsDark
          ? { [varName]: colorsDark[name as keyof typeof colors] }
          : undefined),
      },
    };
  },
  {
    rootVars: {} as CssRootVars,
    rootVarsDark: {} as CssRootVars,
    theme: {} as Theme,
  }
);
