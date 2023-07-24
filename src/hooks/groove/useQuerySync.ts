import { useEffect } from 'react';

import { grooveDefault } from '../../constants';
import {
  setGrooveFromStringAction,
  setTitleAction,
  useGrooveContext,
} from '../../context/GrooveContext';
import { createStringGroove } from '../../utils/shirtify';
import { getQuery, modifyQuery, updateQuery } from '../../utils/url';

export function useQuerySync() {
  const { groove, dispatch } = useGrooveContext();

  // set groove from query
  useEffect(() => {
    const queryParams = getQuery();

    const grooveStr = queryParams.g || grooveDefault;
    dispatch(setGrooveFromStringAction(grooveStr));

    const titleStr = queryParams.title || '';
    if (titleStr) {
      document.title = 'Groove - ' + titleStr;
      dispatch(setTitleAction(titleStr));
    }
  }, [dispatch]);

  // update query
  useEffect(() => {
    if (groove.bars.length) {
      const qs = modifyQuery({
        g: createStringGroove(groove),
        ...(groove.title ? { title: groove.title } : {}),
      });
      updateQuery(qs);
    }
  }, [groove]);
}
