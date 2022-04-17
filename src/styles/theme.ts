import { uncamelcase } from '../utils';
import { colorsDark } from './colors-dark';
import {
  colors,
  easing,
  radius,
  sizes,
  shadow,
  spacing,
  transition,
  typography,
  zIndex,
} from './tokens';

function makeVariableName(name: string) {
  return `--${uncamelcase(name)}`;
}

const tokens = {
  ...colors,
  ...easing,
  ...radius,
  ...sizes,
  ...shadow,
  ...spacing,
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
