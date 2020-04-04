import React, { useState, useEffect, useCallback } from 'react';
import CovidTracker, { COVID } from '../components/covidTracker';
import LandingPage from '../components/landingPage';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, getStateFromPath } from '@react-navigation/native';
import { serviceExecutor } from '../utils/serviceAPI';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
let response;
export const AppContext = React.createContext({
    appState: response,

});



export function RootStack() {
    const allCountriesData = 'https://corona.lmao.ninja/countries';
    const [state, next] = useState()
    const [countries, nextCountries] = useState()
    useEffect(() => {

        serviceExecutor(allCountriesData, countriesData);
        function countriesData(res) {
            const getCountries = res?.map(item => {
                return item.country;
            });
            if (res) {
                response = res;
                // next(response)
            }
            next(response)
            nextCountries(getCountries)
        };

    }, [])
    return (
        <AppContext.Provider value={state}>
            <NavigationContainer initialState={state}>
                <Stack.Navigator screenOptions={({ headerTitle: 'COVID', headerBackTitle: '', })} >
                    <Stack.Screen name="Landing Page" children={({ navigation }) => {
                        useEffect(() => {
                            SplashScreen.hide();
                        }, []);
                        return <LandingPage navigation={navigation} data={state} />
                    }}
                    />
                    <Stack.Screen name="COVID" children={({ navigation }: { navigation: StackNavigationProp<any> }) => {
                        return <CovidTracker route={navigation} navigation={navigation} countries={countries} covidData={state} />
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}


