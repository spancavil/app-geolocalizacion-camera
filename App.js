import React from 'react';
import { Provider } from 'react-redux'

import store from './store'

// navigation
import MainNavigator from './navigation';

import { init } from './db';

init()
.then(() => console.log("Db initialized"))
.catch((error)=> {
  console.log('Db fail connect:');
  console.log(error.message);
})

export default function App() {
  return (<Provider store={store}><MainNavigator /></Provider>);
}
