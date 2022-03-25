import { createUseStyles, DefaultTheme } from 'react-jss';
import { Rule, StyleSheet, Styles, Classes } from 'jss';
import { paramCase } from 'param-case';

const generateId = (rule: Rule, sheet: StyleSheet) => {
  return `${paramCase(sheet.options.classNamePrefix)}_${paramCase(rule.key)}`;
};

export const makeSyles = <C extends string = string, Props = never, Theme = DefaultTheme>(name: string, styles: Styles<C, Props, Theme>): () => Classes<C> => createUseStyles(styles, { name, generateId });
