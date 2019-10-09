import React,{Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/stackNavigator';
import store from './store';

type Props = {}

export default class App extends Component<Props> {
  render () {
    return (
      <Provider
        store={store}
      >
        <AppNavigator />
      </Provider>
    )
  }
}

// export default createAppContainer(StackNavigator);
