import { memo } from 'react';

import type { InstrumentGroup, InstrumentGroupEnabled } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';

import classes from './InstrumentGroups.css';

export interface InstrumentGroupsProps {
  enabledGroups: InstrumentGroupEnabled;
  setEnabledGroups: (enabledGroups: InstrumentGroupEnabled) => void;
}

const InstrumentGroups = ({ enabledGroups, setEnabledGroups }: InstrumentGroupsProps) => {
  const toggleGroup = (group: InstrumentGroup) => () => {
    setEnabledGroups?.({
      ...enabledGroups,
      [group]: !enabledGroups[group],
    });
  };

  return (
    <div className={classes.instrumentGroups}>
      Groups
      <div className={classes.list}>
        <ButtonIcon active={enabledGroups?.cy} aria-label="cymbals" onClick={toggleGroup('cy')}>
          <Icon name="group-cy" />
        </ButtonIcon>
        <ButtonIcon active={enabledGroups?.hh} aria-label="hi-hat" onClick={toggleGroup('hh')}>
          <Icon name="group-hh" />
        </ButtonIcon>
        <ButtonIcon active={enabledGroups?.sn} aria-label="snare" onClick={toggleGroup('sn')}>
          <Icon name="group-sn" />
        </ButtonIcon>
        <ButtonIcon active={enabledGroups?.ki} aria-label="kick" onClick={toggleGroup('ki')}>
          <Icon name="group-ki" />
        </ButtonIcon>
        <ButtonIcon active={enabledGroups?.t1} aria-label="high tom" onClick={toggleGroup('t1')}>
          <Icon name="group-t1" />
        </ButtonIcon>
        <ButtonIcon active={enabledGroups?.t2} aria-label="middle tom" onClick={toggleGroup('t2')}>
          <Icon name="group-t2" />
        </ButtonIcon>
        <ButtonIcon active={enabledGroups?.t3} aria-label="low tom" onClick={toggleGroup('t3')}>
          <Icon name="group-t3" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default memo(InstrumentGroups);
