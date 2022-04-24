import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';

import type { ButtonIconProps } from '../ButtonIcon';
import { ButtonIcon } from '../ButtonIcon';

import { useStyles } from './ButtonPlay.styles';

type ButtonPlayProps = Omit<ButtonIconProps, 'aria-label'> & {
  playing: boolean;
};

const animationProps = {
  begin: 'indefinite',
  fill: 'freeze',
  attributeName: 'points',
  dur: '150ms',
};

export const ButtonPlay = memo(function ButtonPlay({
  className,
  playing,
  ...props
}: ButtonPlayProps) {
  const classes = useStyles();

  const playAnimationRef = useRef<SVGAnimateElement>(null);
  const stopAnimationRef = useRef<SVGAnimateElement>(null);

  const playPolygon = '6 6, 18 12, 18 12, 6 18';
  const stopPolygon = '6 6, 18 6, 18 18, 6 18';

  useEffect(() => {
    if (playing) {
      stopAnimationRef.current?.beginElement();
    } else {
      playAnimationRef.current?.beginElement();
    }
  }, [playing]);

  return (
    <ButtonIcon className={clsx(className)} aria-label={playing ? 'stop' : 'play'} {...props}>
      <svg
        className={classes.icon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
      >
        <polygon points={playPolygon} strokeLinejoin="round" strokeWidth="5">
          <animate ref={stopAnimationRef} to={stopPolygon} {...animationProps} />
          <animate ref={playAnimationRef} to={playPolygon} {...animationProps} />
        </polygon>
      </svg>
    </ButtonIcon>
  );
});
