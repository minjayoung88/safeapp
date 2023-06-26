import React, { useEffect, useRef, useState } from "react";
import {View, Animated, ScrollView } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import RegionComp from '../Information/RegionComp'
import UStyle from '../../Assets/Styles/Styles';

interface Props {
  RegionArray:any
}

const SlideUpAndDown = ({RegionArray}:Props) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [enabled, setEnabled] = useState(true);
    const [move, setMove] = useState(false);
    const boxList = [];
    useEffect(() => {
      Animated.timing(animation, {
        toValue: enabled ? 430 : 0,
        useNativeDriver: true,
      }).start();
    }, [animation, enabled]);

    for (let i:number = 0; i <RegionArray.length; i= i+1) {
      boxList.push(
          <RegionComp key={i} icon={RegionArray[i].icon} lan={RegionArray[i].latitude} log={RegionArray[i].longitude} Name={RegionArray[i].Title} CallNo={RegionArray[i].CallNo} Adress={RegionArray[i].Adress} onPressBTN={() => {
            //상세화면 불러오기
            let reqUrl = RegionArray[i].icon == "hotel"? 'http://jjsung.o-r.kr/defense/bokjihouse_detail?latitude=' + RegionArray[i].latitude + '&longitude=' + RegionArray[i].longitude : 'http://jjsung.o-r.kr/defense/restaurant_detail?latitude=' + RegionArray[i].latitude + '&longitude=' + RegionArray[i].longitude
            //console.log(reqUrl);
            fetch(reqUrl , {
                  method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
            });
            //View display none하고 상세화면 display
            setMove(true);
          }}/>
      )
      
    }
    return (
        <Animated.View style={{transform: [{translateY: animation}], position: 'absolute', top: 275, left: 0, width: responsiveWidth(100), height: responsiveHeight(100) - 305, backgroundColor:'white', borderRadius: 30, borderWidth:0.5, borderColor:'#d0d0d0' }}>
          <View style={{height: responsiveHeight(100) - 310}}>
            <View style={{height: 40, borderBottomWidth: 1, borderColor: '#d0d0d0', width: responsiveWidth(100) - 20, marginLeft: 10, alignItems:'center'}} 
              onTouchEnd={() => { setEnabled(!enabled);}}>
              <Feather key="up" name="chevron-up" color="#d0d0d0" size={30} style={[{marginTop:5}, enabled?UStyle.btnstyle_.style2: UStyle.btnstyle_.style1]} />
              <Feather key="down" name="chevron-down" color="#d0d0d0" size={30} style={[{marginTop:5}, enabled?UStyle.btnstyle_.style1: UStyle.btnstyle_.style2]} />
            </View>
            <View style={{height: responsiveHeight(100) - 370}}>
              <ScrollView>
                <View style={move?UStyle.btnstyle_.style1: UStyle.btnstyle_.style2}>{boxList}</View>
                <View style={move?UStyle.btnstyle_.style2 : UStyle.btnstyle_.style1}>


                </View>
              </ScrollView>
            </View>
          </View>
        </Animated.View>
    );
}

export default SlideUpAndDown;
