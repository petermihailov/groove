import type * as React from 'react';

export type DrawerRefElement = HTMLDivElement;

export interface DrawerProps extends React.HTMLAttributes<DrawerRefElement> {
  /**
   * Целевой DOM-элемент для контента.
   * Если внутри Drawer лежит кастомный компонент с областью скролла, то нужно передать
   * `contentElement` чтобы скролл внутри работал
   * */
  contentRef?: React.RefObject<HTMLElement>;

  /** Делает drawer "статичным" */
  dragDisabled?: boolean;

  /** Оставить в DOM после закрытия */
  keepMounted?: boolean;

  /** Коллбэк на закрытие */
  onClose?: () => void;

  /** Флаг видимости */
  open: boolean;
}
