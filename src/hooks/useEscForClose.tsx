import * as React from 'react';

export function useEscForClose(open: boolean, onClose?: () => void) {
  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [open, onClose]);
}
