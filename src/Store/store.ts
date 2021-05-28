import { createStore, compose } from 'redux';
import rootReducer from './reducers/rootReducer';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export type rootState = ReturnType<typeof rootReducer>
export type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never


const store = createStore(rootReducer,
  //  composeEnhancers()
   );

export default store;