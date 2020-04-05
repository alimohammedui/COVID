import React, { useState } from 'react';
import {
  Button,
  View,
  Text,
  Modal,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  YellowBox,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  SafeAreaView,
  NavigationEvents,
  NavigationEventsProps,
} from 'react-navigation';
import { serviceExecutor } from '../utils/serviceAPI';
import { FlatListComponent } from './flatList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from 'react-native-elements';
import CardsComponent, { PrimaryCard } from './cardsComponent';

interface Props {
  navigation: any
  route?: any
  countries?: [];
  covidData: COVID[];
}

interface State {
  countries?: [];
  covidData: COVID[];
  visible: boolean;
  selectedItem: COVID;
  input: string;
  showView: boolean;
}

export interface COVID {
  country: string[];
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
}

YellowBox.ignoreWarnings(['VirtualizedLists']);

export default class CovidTracker extends React.PureComponent<Props, State> {
  public countries = 'https://mattblackworld.com/api/list_countries';
  public allCountriesData = 'https://corona.lmao.ninja/countries';
  public timer;
  constructor(props: Props) {
    super(props);
    this.state = {
      countries: [],
      covidData: [] as COVID[],
      visible: false,
      selectedItem: {} as COVID,
      input: '',
      showView: true,
    };
  }

  public componentDidMount() {
    this.getData();
  }

  public getData = () => {
    serviceExecutor(this.allCountriesData, this.countriesData);
    this.timer = setInterval(() => {
      console.log('call ====>')
      serviceExecutor(this.allCountriesData, this.countriesData);
    }, 900000); // 10 minutes
  };

  componentWillUnmount() {
    clearInterval(this.timer)
    if (this.props.countries !== this.state.countries) {
      console.log('data different')
    }
  }

  public allCountries = res => {
    this.setState({ countries: res });
  };

  public countriesData = (res: COVID[]) => {
    const getCountries = res?.map(item => {
      return item.country;
    });
    if (res) {
      // @ts-ignore // [][] array for some reason
      this.setState({
        covidData: res,
        countries: getCountries.sort(),
      }, () => res?.map((item) => {
        this.setState({ selectedItem: item })
      }));
    }
  };



  public render() {
    const { countries, selectedItem } = this.state;
    const params = this.props.navigation?.state;

    const item = params?.name ?? undefined
    console.log('item ==>', item)

    return (
      <>
        <SafeAreaView style={styles.rootContainer}>
          <View >
            <PrimaryCard onPress={() => this.onPressItem(selectedItem)} Content={item || selectedItem} />
          </View>
          <Text style={styles.title}>Select Another Country</Text>
          <this.AlphaChar />
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            {/* <this.DetailsModal item={this.state.selectedItem} /> */}
            {countries.map((item: string) => {
              const getAlphabet = item.slice(0, 1);
              return <CardsComponent key={item} Header={item} subtitle={getAlphabet} onPress={() => this.onPressItem(item)} />
            })}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  public AlphaChar = () => {
    const alpha = [...Array(26)].map((_, y) => String.fromCharCode(y + 65)).join('  ');
    const Format = [...alpha].map((item, index) => {
      return (
        <>
          <Text key={index} onPress={() => this.onPressAlpha(item)}>{item}</Text>
        </>
      )
    })
    return <View key={Math.random().toString()} style={{ backgroundColor: '#fff', flexDirection: 'row', marginHorizontal: 10, marginVertical: 10 }}>
      <Text style={{ textAlign: 'center', flexDirection: 'row', marginHorizontal: 10, fontSize: 20 }}>
        {Format}
      </Text>
    </View>
  }

  public onPressAlpha = (item: string) => {
    const searched: any[] = this.props.countries?.filter((i: string) => i.startsWith(item))
    const prevState = this.state.countries
    if (searched.length > 0) {
      this.setState({ countries: searched }, () => {
        if (this.state.countries.length === 0) {
          this.setState({ countries: prevState })
        }
      })
    } else {
      alert(`no data found for countries that starts with ${item}`)
    }

  }

  public onChangeText = inp => {
    this.setState({ input: inp }, () => this.searchValues());
  };

  public CustomSearchBar = () => {
    return (
      <View style={{ marginBottom: 20 }}>
        <SearchBar
          inputContainerStyle={{ backgroundColor: '#ff0' }}
          value={this.state.input}
          onChangeText={val => this.onChangeText(val)}
          onFocus={this.onSearchFocus}
          onBlur={this.searchValues}
          onTouchEndCapture={() => Keyboard.dismiss}
        />
      </View>
    );
  };

  public onSearchFocus = () => {
    this.setState({ showView: false }, () => this.searchValues());
  };

  public searchValues = () => {
    let filtered = this.state.countries;
    let searchItem: [] = [];
    if (this.state.input.length > 2) {
      filtered?.find(item => {
        if (this.state.input.startsWith(item)) {
          searchItem.push(item)
          this.setState({ countries: searchItem, showView: true });
        }
      });
    }
    if (!this.state.input.length) {
      this.setState(prevState => ({ countries: filtered }))
    }
  };

  public RenderListItems = () => {
    return (
      <>
        <View style={styles.listContainer}>
          {this.state.showView && (
            <FlatListComponent
              data={this.state.countries}
              onPress={item => this.onPressItem(item)}
            />
          )}
        </View>
      </>
    );
  };

  public onPressItem = selectedItem => {
    if (selectedItem) {
      const selected: COVID = this.state.covidData.find(item =>
        item.country.includes(selectedItem),
      );
      this.setState({ selectedItem: selected, visible: true });
    }
  };

  public DetailsModal = ({ item }: { item: COVID }) => {
    return (
      <>
        <SafeAreaView>
          <Modal visible={this.state.visible}>
            <View style={styles.modalContainer}>
              <Icon
                name={'close'}
                onPress={() => this.onPressIcon()}
                style={styles.closeIcon}
              />
              <this.ModalContent item={item} />
            </View>
            <View style={styles.modalPrimaryButton}>
              <Button
                color={'red'}
                title={'Close'}
                onPress={() => this.onPressIcon()}
              />
            </View>
          </Modal>
        </SafeAreaView>
      </>
    );
  };

  public ModalContent = ({ item }: { item: COVID }) => {
    return (
      <Text style={styles.modalContentContainer}>
        <Text style={styles.modalContentText}>
          {`Country : ${item.country} \n`}
        </Text>
        {`
          Active Cases =  ${item.active} \n
          Total Cases =  ${item.cases}  \n
          Critical cases = ${item.critical} \n
          Total deaths = ${item.deaths} \n
          Total recovered = ${item.recovered} \n
          New Cases Today = ${item.todayCases} \n
          Deaths Today = ${item.todayDeaths} \n 
 `}
      </Text>
    );
  };

  public onPressIcon = () => {
    this.setState({ visible: false });
  };
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#3d3d3d'
  },
  title: {
    fontSize: 22,
    color: '#fff',
    alignSelf: 'center',
    marginVertical: 20,
    textDecorationLine: 'underline'
  },
  listContainer: {
    margin: 20,
    bottom: 30,
  },
  modalContainer: {
    flex: 1,
    alignContent: 'center',
    top: 30,
  },
  closeIcon: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 32,
    position: 'absolute',
    right: 20,
    marginBottom: 30,
  },
  modalContentContainer: {
    flex: 1,
    alignContent: 'center',
    top: 30,
    bottom: 30,
  },
  modalContentText: {
    fontSize: 32,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 30,
    color: 'red',
  },
  modalPrimaryButton: {
    bottom: 50,
  },
});

