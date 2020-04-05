import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import { RootStack } from "../navigation/rootNavigator";
import { serviceExecutor } from "../utils/serviceAPI";

export interface Props {
    // appContext: {}
}

export interface State {
    countries: any
    data: any
}

const defaultProps = {
    appContext: {}
}

export const AppContext = React.createContext({

});




// export default abstract class AppComponent<P_ extends Props = Props, S_ extends State = State> extends React.Component<P_, S_> {
// static getDerivedStateFromProps(props, state) {
//     const allCountriesData = 'https://corona.lmao.ninja/countries';
//     serviceExecutor(allCountriesData, () => countriesData);
//     var countriesData = (res) => {
//         const getCountries = res?.map(item => {
//             return item.country;
//         });
//         if (res) {
//             return {
//                 data: res.data,
//                 countries: getCountries
//             }
//         }
//     }
// }
// public static defaultProps = defaultProps;
// public response;


// constructor(props: P_) {
//     super(props);
//     this.state = {
//         countries: [],
//         data: {}
//     } as S_

// }

// static componentWillMount() {
//     const allCountriesData = 'https://corona.lmao.ninja/countries';
//     serviceExecutor(allCountriesData, countriesData);
//     var countriesData = (res) => {
//         const getCountries = res?.map(item => {
//             return item.country;
//         });

//         if (res) {
//             return {
//                 data: res.data
//             }
//         }
//     }
// }

// public allCountriesData = 'https://corona.lmao.ninja/countries';
// public countriesData = (res) => {
//     const getCountries = res?.map(item => {
//         return item.country;
//     });

//     if (res) {
//         this.setState({ data: res, countries: getCountries })
//     }
// }
// componentDidMount() {
//     serviceExecutor(this.allCountriesData, this.countriesData);
// }

// public countriesData = (res) => {
//     const getCountries = res?.map(item => {
//         return item.country;
//     });
//     if (res) {
//         this.response = res;
//         this.setState({ data: res, countries: getCountries })
//     }
// }

export function AppComponent() {
    const allCountriesData = 'https://corona.lmao.ninja/countries';
    const [state, next] = useState([])
    const [countries, nextCountries] = useState([])
    const [initialStates, consolidateStates] = useState([])
    let response: any[] = [];
    useEffect(() => {
        serviceExecutor(allCountriesData, countriesData);
        function countriesData(res) {
            const getCountries = res?.map(item => {
                return item.country;
            });
            response.push({ state: res, countries: getCountries })
            next(res);
            nextCountries(getCountries);
            consolidateStates(response)
            console.log('response', response, ' \n ==>', initialStates)
        };
    }, [])
    return (
        <>
            <AppContext.Provider value={initialStates}>
                <RootStack state={initialStates} />
            </AppContext.Provider>
        </>
    )
}
// }