import React, { useState } from 'react';
import {TextInput, View, StyleSheet, Alert, Text, StyleProp, ViewStyle} from 'react-native'
import * as config from '../../Common/config'
import UStyle from '../../Assets/Styles/Styles'


 interface Props {
    TXTholder : string;
    TXTkey : string;
    TouchEvt : () => void;
    StyleList: Array<string>;
    BoxWidth : number;
    ViewStyle : StyleProp<ViewStyle>;
 }
 
const SelBox = ({TXTholder, TXTkey, TouchEvt, StyleList, BoxWidth, ViewStyle}: Props) => {
    return (
        <View style={[ViewStyle, {width:BoxWidth,backgroundColor: StyleList[0]}]} onTouchStart={TouchEvt} key={TXTkey}>
            <Text style={[UStyle.SelBox.View_Text, {color: StyleList[1], fontFamily: config.TFont}]}>{TXTholder}</Text>
        </View>

    );
};

export default SelBox;
