import React, { Component, ReactText } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {Picker} from '@react-native-community/picker';
import * as config from '../../Common/config'

const styles = StyleSheet.create({
    Picker_View: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        height:40,
        width: 200,
        backgroundColor: 'white'
    },
    Picker_style: {
        fontSize : 15,
        height:40,
        width: 200,
    },
 })

 interface Props {
    Items : string[];
    SelectValue : string;
    enabled: boolean;
    returnEVT: (val:string) => void;
 }

class PickerExample extends Component<Props> {
    state = {
        selectedItem : this.props.SelectValue == 'null'? '' : this.props.SelectValue,
        enabled : this.props.enabled,
    }
    
    CHGEvent = (val: any) => {
        this.setState({selectedItem: val})
        this.props.returnEVT(val)
    }

    render() {
        let serviceItems = this.props.Items.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });

        return (
            <View style={styles.Picker_View}>
                <Picker enabled={this.state.enabled} style={[styles.Picker_style, {fontFamily: config.TFont}]} selectedValue={this.state.selectedItem}
                onValueChange={(itemValue) =>this.CHGEvent(itemValue)}>
                    {serviceItems}
                </Picker>
            </View>
        )
   }
}
export default PickerExample

