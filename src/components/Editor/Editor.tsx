import { Instrument } from './Instrument';

import { useStyles } from './Editor.styles';

export function Editor() {
  const classes = useStyles();

  return (
    <>
     <div className={classes.root}>
        <Instrument />
        <Instrument note='hhFoot' />
        <Instrument note='hhCloseRegular' />
        <Instrument note='hhCloseAccent' />
        <Instrument note='hhOpenRegular' />
        <Instrument note='hhOpenAccent' />
      </div>
      <div className={classes.root}>
        <Instrument />
        <Instrument note='snRegular' />
        <Instrument note='snAccent' />
        <Instrument note='snGhost' />
        <Instrument note='snRimClick' />
        <Instrument note='snFlam' />
        <Instrument note='snDrag' />
        <Instrument note='snBuzz' />
      </div>
    </>
  );
}
