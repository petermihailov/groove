import type { Rule, StyleSheet, Styles, Classes } from 'jss';
import { createUseStyles as jssCreateUseStyles } from 'react-jss';

import { uncamelcase } from '../utils';

const generateId = (rule: Rule, sheet?: StyleSheet) => {
  const prefix = sheet?.options.classNamePrefix || '';
  return `${uncamelcase(prefix.slice(0, -1))}_${uncamelcase(rule.key)}`;
};

export const createUseStyles = <C extends string = string>(
  name: string,
  styles: Styles<C>
): (() => Classes<C>) => {
  return jssCreateUseStyles(styles, { name, generateId });
};
