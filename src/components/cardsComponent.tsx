import React from 'react';
import { Button, View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { COVID } from './covidTracker';
import moment from 'moment'
import { formattedLabel } from './utils';

const width = Dimensions.get('window').width

interface Props {
    buttonTitle?: string;
    Header?: string;
    subtitle?: string;
    onPress?: (arg?: any) => any;
    Content?: COVID
}

export default function CardsComponent({ Header, subtitle, onPress, buttonTitle }: Props) {
    return (
        <>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <TouchableOpacity onPress={onPress} style={{ alignSelf: 'center', height: 50, width: width - 20, borderWidth: 2, borderRadius: 20, backgroundColor: generateColors() }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff', paddingTop: 10 }}>{Header}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export function PrimaryCard({ Content, onPress }: Props) {
    const date = moment(new Date().toUTCString()).format('MMMM Do YYYY, h:mm:ss a')
    const label1 = `Total cases in %1 as of %2 is %3. Total Active cases are %4. Total Deaths are %5`
    return (
        <>
            <View style={{ marginTop: 30, height: 200, borderRadius: 30, marginHorizontal: 10, bottom: 5, backgroundColor: '#ff9', shadowOpacity: 1, borderBottomColor: '#3d3d3d' }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={{ textAlign: 'center', textDecorationLine: 'underline', marginVertical: 10, fontSize: 24, color: 'black' }}>{Content.country}</Text>
                </View>
                <Text style={{ marginHorizontal: 10, marginVertical: 10, fontSize: 16, color: 'black', flexDirection: 'row' }}>
                    {formattedLabel(
                        label1,
                        <Text key={'1'} style={styles.text}>{Content.country}</Text>,
                        <Text key={'2'} style={{ color: 'green' }}>{date}</Text>,
                        <Text key={'3'} style={styles.text}>{Content.cases}</Text>,
                        <Text key={'4'} style={styles.text}>{Content.active}</Text>,
                        <Text key={'5'} style={styles.text}>{Content.deaths}</Text>
                    )}
                </Text>
                {/* <Button title={'View More'} onPress={onPress} /> */}
            </View>
        </>
    )
}

var styles = StyleSheet.create({
    text: { fontSize: 24, color: 'red' }
})

function generateColors(): string {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    return `rgb(${red},${green},${blue})`
}

export function GenerateSingleItemCard({ item, onPress }: { item: COVID[], onPress }) {
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={{ height: 50, width: 85, marginVertical: 5, marginHorizontal: 10, borderWidth: 1, backgroundColor: generateColors() }}>
            <Text style={{ textAlign: 'center', alignSelf: 'center', paddingTop: 10, justifyContent: 'space-evenly' }}>{item}</Text>
        </TouchableOpacity>
    )
}
