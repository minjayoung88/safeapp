import React, { useState } from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import * as config from '../../Common/config'
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    TopView:{
        height:60,
        flexDirection: 'row'
    },
    IconStyle:{
        marginLeft: 20,
        marginTop:'auto',
        marginBottom:'auto',
    },
    IconStyle2:{
        margin:15,
        position: 'absolute', right: 0
    },
    TopText:{
        marginTop:'auto', 
        marginBottom:'auto', 
        marginLeft:20, 
        fontSize:20, 
        color:'#EAEAEA', 
        fontFamily: config.TFontB
    }
});

interface Props {
    onSubmit? : () => void;
    SelGroup? : string[];
    TopText?:string
}

interface State {
    Search: string[];
}

interface State1 {
    date: Date;
}

const TopBar = ({onSubmit, SelGroup, TopText}:Props) => {
    const nowTimeStamp_ = Date.now();
    const now_ = new Date(nowTimeStamp_);
    const maxDate_ = new Date(nowTimeStamp_);
    const [nowDate, SetNow] = useState<State1>({
        date: now_
    });
    
    return (
        <View style={[styles.TopView, {backgroundColor:config.BackColor}]}>
            <Text style={styles.TopText}>{TopText}</Text>
        </View> 
    );
};

export default TopBar;


  