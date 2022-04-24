import { Icon } from '../../../icons/Icon';
import type { InstrumentGroup, InstrumentGroupEnabled } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';

import { useStyles } from './InstrumentGroups.styles';

export type InstrumentGroupsProps = {
  enabledGroups: InstrumentGroupEnabled;
  setEnabledGroups: (enabledGroups: InstrumentGroupEnabled) => void;
};

export function InstrumentGroups({ enabledGroups, setEnabledGroups }: InstrumentGroupsProps) {
  const classes = useStyles();

  const toggleGroup = (group: InstrumentGroup) => () => {
    setEnabledGroups?.({
      ...enabledGroups,
      [group]: !enabledGroups[group],
    });
  };

  return (
    <div className={classes.root}>
      Groups
      <div className={classes.list}>
        <ButtonIcon aria-label="cymbals" active={enabledGroups?.cy} onClick={toggleGroup('cy')}>
          <Icon name="group-cy" />
        </ButtonIcon>
        <ButtonIcon aria-label="hi-hat" active={enabledGroups?.hh} onClick={toggleGroup('hh')}>
          <Icon name="group-hh" />
        </ButtonIcon>
        <ButtonIcon aria-label="snare" active={enabledGroups?.sn} onClick={toggleGroup('sn')}>
          <Icon name="group-sn" />
        </ButtonIcon>
        <ButtonIcon aria-label="kick" active={enabledGroups?.ki} onClick={toggleGroup('ki')}>
          <Icon name="group-ki" />
        </ButtonIcon>
        <ButtonIcon aria-label="high tom" active={enabledGroups?.t1} onClick={toggleGroup('t1')}>
          <Icon name="group-t1" />
        </ButtonIcon>
        <ButtonIcon aria-label="middle tom" active={enabledGroups?.t2} onClick={toggleGroup('t2')}>
          <Icon name="group-t2" />
        </ButtonIcon>
        <ButtonIcon aria-label="low tom" active={enabledGroups?.t3} onClick={toggleGroup('t3')}>
          <Icon name="group-t3" />
        </ButtonIcon>
      </div>
    </div>
  );
}
