import clsx from 'clsx';

import type { InstrumentNote } from '../../../types';

import { useStyles } from './Instrument.styles';

type InstrumentProps = {
  note?: InstrumentNote;
}

export function Instrument({note}: InstrumentProps) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, {
      [classes.hhClose]: note?.includes('hhClose') || note === 'hhFoot',
      [classes.hhOpen]: note?.includes('hhOpen'),
    })}>
      <span className={clsx(classes.note, {[classes.regular]: note?.includes('Regular')})} />
      {note?.includes('Accent') && <span className={classes.accent} />}
    </div>
  );
}
