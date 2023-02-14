import { useEffect } from 'react';

import { grooveDefault } from '../../constants';
import { setGrooveFromStringAction, useGrooveContext } from '../../context/GrooveContext';
import { createStringGroove } from '../../utils/shirtify';
import { getQuery, modifyQuery, updateQuery } from '../../utils/url';

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
      // console.log(groove.bars)
      const qs = modifyQuery({ g: createStringGroove(groove) });
      updateQuery(qs);
    }
  }, [groove]);
}
