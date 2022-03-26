import type { Rule, StyleSheet, Styles, Classes } from 'jss';
import { paramCase } from 'param-case';
import type { DefaultTheme } from 'react-jss';
import { createUseStyles as jssCreateUseStyles } from 'react-jss';

const generateId = (rule: Rule, sheet?: StyleSheet) => {
  return `${paramCase(sheet.options.classNamePrefix)}_${paramCase(rule.key)}`;
};

export const createUseStyles = <
  C extends string = string,
  Props = never,
  Theme = DefaultTheme
>(
    name: string,
    styles: Styles<C, Props, Theme>
  ): (() => Classes<C>) => jssCreateUseStyles(styles, { name, generateId });
