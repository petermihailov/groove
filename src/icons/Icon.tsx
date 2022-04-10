import { memo } from 'react';

type IconName =
  | 'cyBellRegular'
  | 'cyChinaRegular'
  | 'cyCowbellRegular'
  | 'cyCrashRegular'
  | 'cyRideRegular'
  | 'cySplashRegular'
  | 'hhCloseAccent'
  | 'hhCloseGhost'
  | 'hhCloseRegular'
  | 'hhOpenAccent'
  | 'hhOpenGhost'
  | 'hhOpenRegular'
  | 'snRimRegular'
  | 'noteAccent'
  | 'noteEmpty'
  | 'noteGhost'
  | 'metronome'
  | 'settings'
  | 'play'
  | 'pause'
  | 'stop'
  | 'note4'
  | 'note8'
  | 'note16'
  | 'note32';

type IconProps = {
  className?: string;
  name: IconName;
};

export const Icon = memo(function Icon({ name, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <use href={`#${name}`} />
    </svg>
  );
});
