import React, { useEffect, useRef, useState } from "react";
import {View, Animated, Text } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import UStyle from '../../Assets/Styles/Styles';
import * as config from '../../Common/config'

interface Props {
  RegionDetail:any
}

const SlideUpDetail = ({RegionDetail}:Props) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [enabled, setEnabled] = useState(true);
    useEffect(() => {
      Animated.timing(animation, {
        toValue: enabled ? 430 : 0,
        useNativeDriver: true,
      }).start();
    }, [animation, enabled]);

    return (
        <Animated.View style={{transform: [{translateY: animation}], position: 'absolute', top: 275, left: 0, width: responsiveWidth(100), height: responsiveHeight(100) - 305, backgroundColor:'white', borderRadius: 30, borderWidth:0.5, borderColor:'#d0d0d0' }}>
          <View style={{height: responsiveHeight(100) - 310}}>
            <View style={{height: 40, borderBottomWidth: 1, borderColor: '#d0d0d0', width: responsiveWidth(100) - 20, marginLeft: 10, alignItems:'center'}} 
              onTouchEnd={() => { setEnabled(!enabled);}}>
              <Feather key="up" name="chevron-up" color="#d0d0d0" size={30} style={enabled?UStyle.btnstyle_.style2: UStyle.btnstyle_.style1} />
              <Feather key="down" name="chevron-down" color="#d0d0d0" size={30} style={enabled?UStyle.btnstyle_.style1: UStyle.btnstyle_.style2} />
            </View>
            <View style={{height: responsiveHeight(100) - 370}}>
                <Text style={{fontSize: 15, marginLeft: 10, width: responsiveWidth(100), color: config.BackColor, fontWeight: 'bold'}}></Text>
                <Text style={{fontSize: 12, marginLeft: 10, width: responsiveWidth(100), marginTop: 5}}></Text>
                <Text style={{fontSize: 12, marginLeft: 10, width: responsiveWidth(100), marginTop: 5}}></Text>
            </View>
          </View>
        </Animated.View>
    );
}

export default SlideUpDetail;
