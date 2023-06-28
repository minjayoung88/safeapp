import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { responsiveWidth } from "react-native-responsive-dimensions";
import Styles from "../Assets/Styles/Styles";
import AsyncStorage from '@react-native-community/async-storage';

const Settings = () => {
  const [value, setValue] = React.useState('first');

  const valueChange = (newValue:string) => {
    setValue(newValue);
    //storage 저장
    AsyncStorage.setItem('map', newValue);
  }

  return (
    <View style={{width: responsiveWidth(100)}}>
        <Text style={{color:'grey', fontSize: 16, marginTop: 30, marginLeft: 30, marginBottom:10}}>길 찾기 연동선택</Text>
        <View style={{marginLeft:20}}>
            <RadioButton.Group onValueChange={newValue => valueChange(newValue)} value={value}>
            
            <View style={Styles.RBTNstyles.RadioView}>
                <View style={Styles.RBTNstyles.RadioView1}><RadioButton value="naver"/></View>
                <Text style={Styles.RBTNstyles.RadioText}>Naver Map</Text>
            </View>
            <View style={Styles.RBTNstyles.RadioView}>
                <View style={Styles.RBTNstyles.RadioView1}><RadioButton value="kakao"/></View>
                <Text style={Styles.RBTNstyles.RadioText}>Kakao Map</Text>
            </View>
            <View style={Styles.RBTNstyles.RadioView}>
                <View style={Styles.RBTNstyles.RadioView1}><RadioButton value="tmap"/></View>
                <Text style={Styles.RBTNstyles.RadioText}>Tmap</Text>
            </View>
            </RadioButton.Group>
        </View>
    </View>
  );
};

export default Settings;
