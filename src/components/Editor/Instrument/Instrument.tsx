import type { Instrument as InstrumentType } from '../../../types';

import { useStyles } from './Instrument.styles';

type InstrumentProps = {
  note: InstrumentType;
};

export function Instrument({ note }: InstrumentProps) {
  const classes = useStyles();

  return <div />;
}
