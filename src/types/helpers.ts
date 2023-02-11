import type { MouseEvent } from 'react';

export type MouseEventHandler<T extends HTMLElement> = (
  event: MouseEvent<T> & { target: T },
) => void;
