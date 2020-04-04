/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {RootStack} from '../mycustomapp/src/navigation/rootNavigator';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import App from './App';

AppRegistry.registerComponent(appName, () => App);
