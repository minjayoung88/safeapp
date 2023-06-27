import React, { useState } from 'react';
import {TextInput, View, StyleSheet, Alert, Text, StyleProp, ViewStyle} from 'react-native'
import * as config from '../../Common/config'
import UStyle from '../../Assets/Styles/Styles'

 interface Props {
    TXTholder : string;
    TXTkey : string;
    BoxWidth : number;
    ViewStyle : StyleProp<ViewStyle>;
    height? : number;
 }
 
const TitleBox = ({TXTholder, TXTkey, BoxWidth, ViewStyle, height}: Props) => {
    const height_ = height? height : 30;
    return (
        <View style={[ViewStyle, {width:BoxWidth,backgroundColor: config.BackColor, height: height_,justifyContent: 'center'}]} key={TXTkey}>
            <Text style={[UStyle.SelBox.View_Text, {color:"white", fontFamily: config.TFont}]}>{TXTholder}</Text>
        </View>

    );
};

export default TitleBox;
