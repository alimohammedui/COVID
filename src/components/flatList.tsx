import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FlatListComponent = ({
  data,
  onPress,
}: {
  data: any[];
  onPress: (item?: any) => void;
}) => {
  return (
    <>
      <View>
        <FlatList
          data={data}
          renderItem={({item, index}: {item; index}) => (
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              key={index}
              onPress={() => onPress(item)}>
              <Text style={{fontSize: 18, margin: 10}}>{item}</Text>
              <Icon
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  fontSize: 18,
                  position: 'absolute',
                  right: 20,
                }}
                name={'arrow-forward'}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Divider}
        />
      </View>
    </>
  );
};

export const DividerComponent = () => {
  return <Divider />;
};
