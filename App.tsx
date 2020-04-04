/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import CovidTracker, { COVID } from './src/components/covidTracker';
import { NavigationEventsProps, NavigationDispatch } from 'react-navigation';
import LandingPage from './src/components/landingPage';
import { RootStack } from './src/navigation/rootNavigator';
import { serviceExecutor } from './src/utils/serviceAPI';

interface Props {
  navigation: any
}

interface State {
  appState: {};
}

export const AppContext = React.createContext({
  appState: {},
});

abstract class App extends React.Component<Props, State> {
  public allCountriesData = 'https://corona.lmao.ninja/countries';
  constructor(props: Props) {
    super(props);
    this.state = {
      appState: {}
    }

  }

  public render() {
    return (
      <AppContext.Provider value={this.state}>
        <RootStack />
      </AppContext.Provider>
    );
  }
}

export default App;
