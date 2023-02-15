import clsx from 'clsx';
import type { Dispatch, SetStateAction } from 'react';
import { memo, useEffect } from 'react';

import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';
import { Logo } from '../../Logo';

import classes from './Controls.css';

export interface ControlsProps {
  canRedo: boolean;
  canUndo: boolean;
  className?: string;
  onRedo: () => void;
  onUndo: () => void;
  setEditorScaleValue: Dispatch<SetStateAction<number>>;
}

const zoomStep = 0.1;

const Controls = ({
  canRedo,
  canUndo,
  className,
  setEditorScaleValue,
  onUndo,
  onRedo,
}: ControlsProps) => {
  const zoomIn = () => {
    setEditorScaleValue((val) => (val + zoomStep));
  };

  const zoomOut = () => {
    setEditorScaleValue((val) => (val >= .2 ? val - zoomStep : val));
  };

  useEffect(() => {
    const undoListener = (event: KeyboardEvent) => {
      if (event.code == 'KeyZ' && !event.shiftKey && (event.ctrlKey || event.metaKey)) {
        onUndo();
      }
    };

    const redoListener = (event: KeyboardEvent) => {
      if (event.code == 'KeyZ' && event.shiftKey && (event.ctrlKey || event.metaKey)) {
        onRedo();
      }
    };

    document.addEventListener('keydown', undoListener);
    document.addEventListener('keydown', redoListener);

    return () => {
      document.removeEventListener('keydown', undoListener);
      document.removeEventListener('keydown', redoListener);
    };
  }, [onRedo, onUndo]);

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.group}>
        <ButtonIcon
          aria-label="undo"
          className={clsx({ [classes.hidden]: !canRedo && !canUndo })}
          disabled={!canUndo}
          onClick={onUndo}
        >
          <Icon name="icon.undo" />
        </ButtonIcon>

        <ButtonIcon
          aria-label="redo"
          className={clsx({ [classes.hidden]: !canRedo })}
          disabled={!canRedo}
          onClick={onRedo}
        >
          <Icon name="icon.redo" />
        </ButtonIcon>
      </div>

      <Logo />

      <div className={classes.group}>
        <ButtonIcon aria-label="zoom in" onClick={zoomIn}>
          <Icon name="icon.zoom-in" />
        </ButtonIcon>

        <ButtonIcon aria-label="zoom out" onClick={zoomOut}>
          <Icon name="icon.zoom-out" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default memo(Controls);
