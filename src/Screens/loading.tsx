import React from 'react';
import {View, Image, Text} from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import * as config from '../Common/config'

class loading extends React.Component  {
    ConHeight = responsiveHeight(100) - 50;
    ConWidth = responsiveWidth(100)
    render() {
        return  <View style={{backgroundColor:'#FAFAFA', height: this.ConHeight, width: this.ConWidth, alignItems:'center'}}>
                    <View style={{width: 100, alignItems:'center', marginTop: this.ConHeight/2 - 60}}>
                        <Image 
                            source={require('../Assets/Images/south-korea.png')}
                            style={{width: 100, height:100}}
                        />
                        <View style={{flexDirection:'row', alignItems:'center', marginTop: 15}}>
                            <Text style={{color: config.BackColor, fontSize: 14, fontWeight:'bold'}}>{'K-문화재'}</Text>
                            <Text style={{color:'grey', fontSize: 9, marginLeft: 5, marginTop:4}}>{'with Friend'}</Text>
                        </View>
                    </View>
                </View> 
    }
};

export default loading;


  