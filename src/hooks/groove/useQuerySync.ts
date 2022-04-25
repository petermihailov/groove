import { useCallback, useEffect } from 'react';

import { grooveDefault } from '../../constants';
import type { Groove } from '../../types';
import {
  getQuery,
  modifyQuery,
  updateQuery,
  createGrooveFromString,
  createStringGroove,
} from '../../utils';

export function useQuerySync(groove: Groove) {
  const getGrooveFromQuery = useCallback(() => {
    const queryParams = getQuery();
    let grooveStr = queryParams.g || grooveDefault;
    let grooveFromQuery: Groove;

    try {
      grooveFromQuery = createGrooveFromString(grooveStr);
    } catch (err) {
      alert('Groove damaged');
      grooveStr = grooveDefault;
      grooveFromQuery = createGrooveFromString(grooveStr);
    }

    return grooveFromQuery;
  }, []);

  useEffect(() => {
    if (groove.bars.length) {
      const qs = modifyQuery({ g: createStringGroove(groove) });
      updateQuery(qs);
    }
  }, [groove]);

  return getGrooveFromQuery;
}
