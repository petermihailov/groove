import type { Rule, StyleSheet, Styles, Classes } from 'jss';
import { paramCase } from 'param-case';
import { createUseStyles as jssCreateUseStyles } from 'react-jss';

const generateId = (rule: Rule, sheet?: StyleSheet) => {
  return `${paramCase(sheet.options.classNamePrefix)}_${paramCase(rule.key)}`;
};

export const createUseStyles = <C extends string = string>(
  name: string,
  styles: Styles<C>
): (() => Classes<C>) => {
  return jssCreateUseStyles(styles, { name, generateId });
};
