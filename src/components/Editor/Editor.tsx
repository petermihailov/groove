import { useStyles } from './Editor.styles';

export function Editor() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Editor
    </div>
  );
}