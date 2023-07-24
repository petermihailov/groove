import { memo } from 'react';

import type { Group } from '../../../types/instrument';
import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';

import classes from './InstrumentGroups.module.css';

export interface InstrumentGroupsProps {
  grooveGroups: Group[];
  setGrooveGroup: (group: Group, enabled: boolean) => void;
}

const InstrumentGroups = ({ grooveGroups, setGrooveGroup }: InstrumentGroupsProps) => {
  const toggle = (group: Group) => () => {
    setGrooveGroup?.(group, !grooveGroups.includes(group));
  };

  return (
    <div className={classes.root}>
      Groups
      <div className={classes.list}>
        <ButtonIcon
          active={grooveGroups.includes('cy')}
          aria-label="cymbals"
          onClick={toggle('cy')}
        >
          <Icon name="icon.group.cy" />
        </ButtonIcon>
        <ButtonIcon active={grooveGroups.includes('hh')} aria-label="hi-hat" onClick={toggle('hh')}>
          <Icon name="icon.group.hh" />
        </ButtonIcon>
        <ButtonIcon active={grooveGroups.includes('sn')} aria-label="snare" onClick={toggle('sn')}>
          <Icon name="icon.group.sn" />
        </ButtonIcon>
        <ButtonIcon active={grooveGroups.includes('ki')} aria-label="kick" onClick={toggle('ki')}>
          <Icon name="icon.group.ki" />
        </ButtonIcon>
        <ButtonIcon
          active={grooveGroups.includes('t1')}
          aria-label="high tom"
          onClick={toggle('t1')}
        >
          <Icon name="icon.group.t1" />
        </ButtonIcon>
        <ButtonIcon
          active={grooveGroups.includes('t2')}
          aria-label="middle tom"
          onClick={toggle('t2')}
        >
          <Icon name="icon.group.t2" />
        </ButtonIcon>
        <ButtonIcon
          active={grooveGroups.includes('t3')}
          aria-label="low tom"
          onClick={toggle('t3')}
        >
          <Icon name="icon.group.t3" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default memo(InstrumentGroups);
