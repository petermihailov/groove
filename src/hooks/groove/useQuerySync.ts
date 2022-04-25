import { useEffect } from 'react';

import { grooveDefault } from '../../constants';
import { setGrooveFromStringAction, useGrooveContext } from '../../context/GrooveContext';
import { getQuery, modifyQuery, updateQuery, createStringGroove } from '../../utils';

export function useQuerySync() {
  const { groove, dispatch } = useGrooveContext();

  // set groove from query
  useEffect(() => {
    const queryParams = getQuery();
    const grooveStr = queryParams.g || grooveDefault;
    dispatch(setGrooveFromStringAction(grooveStr));
  }, [dispatch]);

  // update query
  useEffect(() => {
    if (groove.bars.length) {
      const qs = modifyQuery({ g: createStringGroove(groove) });
      updateQuery(qs);
    }
  }, [groove]);
}
