import clsx from 'clsx';
import type { Dispatch, SetStateAction } from "react";
import { memo } from "react";

import { ButtonIcon } from "../../ButtonIcon";
import { Icon } from "../../Icon";
import { Logo } from "../../Logo";

import classes from './Controls.css';

export interface ControlsProps {
  className?: string;
  setEditorScaleValue: Dispatch<SetStateAction<number>>;
}

const Controls = ({
  className,
  setEditorScaleValue,
}: ControlsProps) => {
  const zoomIn = () => {
    setEditorScaleValue(val => val += 0.1);
  }

  const zoomOut = () => {
    setEditorScaleValue(val => val -= 0.1);
  }

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.group}>
        <ButtonIcon aria-label="undo">
          <Icon name="ui-undo" />
        </ButtonIcon>

        <ButtonIcon aria-label="redo">
          <Icon name="ui-redo" />
        </ButtonIcon>
      </div>

      <div className={classes.group}>
        <Logo />
      </div>

      <div className={classes.group}>
        <ButtonIcon aria-label='zoom in' onClick={zoomIn}>
          <Icon name="ui-zoom-in" />
        </ButtonIcon>

        <ButtonIcon aria-label='zoom out' onClick={zoomOut}>
          <Icon name="ui-zoom-out" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default memo(Controls);
