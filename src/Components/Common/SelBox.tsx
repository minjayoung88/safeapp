import React, { useState } from 'react';
import {TextInput, View, StyleSheet, Alert, Text, StyleProp, ViewStyle} from 'react-native'
import * as config from '../../Common/config'
import UStyle from '../../Assets/Styles/Styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

 interface Props {
    TXTholder : string;
    TXTkey : string;
    TouchEvt : () => void;
    StyleList: Array<string>;
    BoxWidth : number;
    ViewStyle : StyleProp<ViewStyle>;
    iconName : string;
 }
 
const SelBox = ({TXTholder, TXTkey, TouchEvt, StyleList, BoxWidth, ViewStyle, iconName}: Props) => {
    return (
        <View style={[ViewStyle, {width:BoxWidth,backgroundColor: StyleList[0], flexDirection : "row"}]} onTouchStart={TouchEvt} key={TXTkey}>
            <MaterialIcons name={iconName} style={{marginTop: 7, marginLeft:7}}></MaterialIcons>
            <Text style={[UStyle.SelBox.View_Text, {color: StyleList[1], fontFamily: config.TFont}]}>{TXTholder}</Text>
        </View>

    );
};

export default SelBox;
