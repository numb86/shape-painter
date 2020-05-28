import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {App} from '@src/components/App';

import {SHAPES} from '@src/constants';
import {configureStore, Reducer} from '@shared/configureStore';
import {reducer as reducerOfTree} from '@tree/store/index';
import {reducer as reducerOfClientServer} from '@clientServer/store/index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyReducer = (state = {}, action: any) => state;

export const pathToReducer = new Map([
  ['/', dummyReducer as Reducer],
  [SHAPES.tree.url, reducerOfTree as Reducer],
  [SHAPES['client-server'].url, reducerOfClientServer as Reducer],
]);

const reducer = pathToReducer.get(window.location.pathname);

if (!reducer) {
  throw new Error(
    `No reducer corresponding to ${window.location.pathname} found.`
  );
}

const store = configureStore(reducer);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  );
};

const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';

if (isDevelopmentEnvironment && (module as any).hot) {
  (module as any).hot.accept('@src/components/App', renderApp);
  (module as any).hot.accept('@tree/store/index', () => {
    store.replaceReducer(reducerOfTree);
  });
  (module as any).hot.accept('@clientServer/store/index', () => {
    store.replaceReducer(reducerOfClientServer);
  });
}

renderApp();
