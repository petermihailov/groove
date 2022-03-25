import * as React from 'react';

import { getScrollbarWidth } from '../utils';

let counter = 0;
let originalOverflow: CSSStyleDeclaration['overflow'];
let originalPaddingRight: CSSStyleDeclaration['paddingRight'];

const lock = () => {
  const originalStyles = window.getComputedStyle(document.body);
  originalPaddingRight = originalStyles.paddingRight;
  originalOverflow = originalStyles.overflow;
  // если у body уже есть padding нужно это учесть
  const paddingRight = (parseFloat(originalPaddingRight) || 0) + getScrollbarWidth();
  document.body.style.paddingRight = `${paddingRight}px`;
  document.body.style.overflow = 'hidden';
};

const unlock = () => {
  document.body.style.overflow = originalOverflow;
  document.body.style.paddingRight = originalPaddingRight;
};

/**
 *  Одновременно хук может быть вызван из разных компонентов.
 *  Считаем количество вызовов чтобы случайно не сбросить overflow
 */
const increment = () => {
  counter++;
  if (counter === 1) {
    lock();
  }
};

const decrement = () => {
  counter--;
  if (counter === 0) {
    unlock();
  }
};

export function useLockBodyScroll(enabled = true) {
  React.useEffect(() => {
    if (enabled) {
      increment();
      return decrement;
    }
    return undefined;
  }, [enabled]);
}
