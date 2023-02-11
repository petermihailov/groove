import type { RefObject } from 'react';

import { useDrag } from './useDrag';

interface DrawerRefs {
  content?: RefObject<HTMLElement>;
  curtain: RefObject<HTMLElement>;
  overlay: RefObject<HTMLElement>;
  root: RefObject<HTMLElement>;
}

/* Промежуточное состояние компонента между событиями touchstart и touchend */
interface IDragStateData {
  initialScrollPosition: number;
  isScrolled: boolean;
  isTargetUnderContent: boolean;
}

export function useDrawerBehavior(
  open: boolean,
  refs: DrawerRefs,
  onClose?: () => void,
  dragDisabled?: boolean,
) {
  /* Обработчик drag-событий с корневого DOM-элемента */
  useDrag<IDragStateData>(refs.root, (dragState) => {
    const contentEl = refs.content?.current ?? refs.curtain.current;
    const curtainEl = refs.curtain.current;
    const overlayEl = refs.overlay.current;

    if (!open || !contentEl || !curtainEl || !overlayEl) {
      return;
    }

    const onDrag = (progress: number) => {
      curtainEl.style.transitionDuration = '0s';
      curtainEl.style.transform = `translate3d(0,${100 * (1 - progress)}%,0)`;
      overlayEl.style.opacity = String(progress);
    };

    const resetPosition = () => {
      curtainEl.style.transitionDuration = '';
      curtainEl.style.transform = 'translate3d(0,0,0)';
      overlayEl.style.opacity = '1';
    };

    const {
      velocity: { y: vy },
      movement: { y: my },
      first,
      last,
      data,
      event,
    } = dragState;

    const drawerSize = contentEl.clientHeight;
    const movement = my;
    const velocity = vy;

    if (first) {
      data.isTargetUnderContent = contentEl.contains(event.target as HTMLElement);
      data.initialScrollPosition = contentEl.scrollTop;
      data.isScrolled = data.initialScrollPosition !== 0;
    } else {
      data.isScrolled = data.isScrolled || data.initialScrollPosition - contentEl.scrollTop < 0;
    }

    // предотвращает инерционный проскролл родительских элементов, если это возможно
    if (event.cancelable && event.type === 'touchmove') {
      if (data.isTargetUnderContent) {
        // элемент проскроллен до верхней границы
        if (contentEl.scrollTop <= 0 && my > 0) {
          event.preventDefault();
        }

        // элемент проскроллен до нижней границы
        if (contentEl.scrollHeight - contentEl.scrollTop <= contentEl.clientHeight && my < 0) {
          event.preventDefault();
        }
      } else {
        event.preventDefault();
      }
    }

    // ничего не делаем когда жест происходит одновременно с проскроллом
    // или если шторка в статичном состоянии
    if (dragDisabled || (data.isTargetUnderContent && data.isScrolled)) {
      return;
    }

    // жест завершен, возвращаем шторку в открытое положение, если
    // скорость была недостаточной, и закрываем если наоборот
    if (last) {
      if (Math.abs(velocity) >= 0.1) {
        velocity > 0 ? onClose?.() : resetPosition();
        return;
      } else if (movement / drawerSize >= 0.3) {
        onClose?.();
        return;
      }

      resetPosition();
      return;
    }

    if (movement > 0) {
      const progress = Math.max(0, 1 - movement / drawerSize);

      if (progress === 0) {
        onClose?.();
        return;
      }

      onDrag(progress);
    }
  });
}
