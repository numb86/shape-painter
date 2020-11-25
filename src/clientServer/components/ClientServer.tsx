import React, {useCallback} from 'react';

import {SideMenu} from '@clientServer/components/SideMenu';
import {Main} from '@shared/components/Main';

import {useSelector} from '@clientServer/store/index';
import {useReplaceReducer} from '@shared/customHooks/useReplaceReducer';

const ClientServer = () => {
  const state = useSelector((s) => s);
  // TODO: Write the correct logic after implementing state
  const hasCorrectReducer = useCallback(() => {
    return Object.keys(state).length === 1;
  }, [state]);

  useReplaceReducer(hasCorrectReducer);

  if (!hasCorrectReducer()) {
    return null;
  }

  return (
    <>
      <Main>This is client server</Main>
      <SideMenu />
    </>
  );
};

export default ClientServer;
