import type { MouseEvent } from 'react';

export type MouseEventHandler<T extends HTMLElement> = (
  event: MouseEvent<T> & { target: HTMLElement }
) => void;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exhaustiveCheck = (_: never): void => undefined;
