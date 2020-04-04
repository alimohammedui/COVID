import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { COVID } from './covidTracker';
import { GenerateSingleItemCard } from './cardsComponent';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationStackProp } from 'react-navigation-stack';



interface Props {
  navigation: NavigationStackProp
  data: COVID[]
}
interface State { }

export default class LandingPage extends React.Component<Props, State> {
  public timer = true;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 10 }}>Select a Country to view its Stats</Text>
        <FlatList data={this.props.data} renderItem={({ item, index }) => {
          return <GenerateSingleItemCard key={index} item={item?.country} onPress={() => this.props.navigation.navigate('COVID')} />
        }}
          keyExtractor={() => this.keys()}
          numColumns={4}
        />
        <SafeAreaView style={{ backgroundColor: '#ff9' }}>
          <View style={{}}>
            <Button title={'COVID TRACKER'} onPress={() => this.props.navigation.navigate('COVID')} />
          </View>
        </SafeAreaView>
      </>
    );
  }

  public keys() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }


}

