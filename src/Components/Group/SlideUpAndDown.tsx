import React, { useEffect, useRef, useState } from "react";
import {View, Animated, ScrollView, Text, ViewStyle} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import RegionComp from '../Information/RegionComp';
import UStyle from '../../Assets/Styles/Styles';
import * as config from '../../Common/config';
import TitleBox from '../Common/TitleBox';

interface Props {
  RegionArray:any
}

const SlideUpAndDown = ({RegionArray}:Props) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [enabled, setEnabled] = useState(true);
    const [move, setMove] = useState(false);
    const [detail, setDetail] = useState([<></>]);
    const boxList = [];
    const detailList: React.JSX.Element[] = [];
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
            let reqUrl = RegionArray[i].icon == "hotel"? 'http://jjsung.o-r.kr/defense/bokjihouse_detail?latitude=' + RegionArray[i].latitude + '&longitude=' + RegionArray[i].longitude : 'http://jjsung.o-r.kr/defense/restaurant_detail?seq=' + RegionArray[i].key
            console.log(reqUrl);
            fetch(reqUrl , {
                  method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              setDetail([]); //초기화
              let arr = [];
              responseJson.map((data: any, n:number) => {
                if(n == 0){
                  if(RegionArray[i].icon == 'hotel'){
                    detailList.push(
                      <View style={{marginTop:-37, marginLeft: 20}}>
                        <Text style={{marginLeft:50, fontSize:23, color:config.BackColor, fontWeight:"bold", marginBottom:10}}>{data.name}</Text>
                        <View style={[UStyle.detailStyle.View_, {borderTopWidth:1}]}>
                          <TitleBox TXTholder="주소" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={50}></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.alladdr}</Text>
                        </View>
                        <View style={UStyle.detailStyle.View_}>
                          <TitleBox TXTholder="전화번호" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} ></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.callnum}</Text>
                        </View>
                        <View style={UStyle.detailStyle.View_}>
                        <TitleBox TXTholder="체크인" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} ></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.checkin}</Text>
                        </View>
                        <View style={UStyle.detailStyle.View_}>
                        <TitleBox TXTholder="체크아웃" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} ></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.checkout}</Text>
                        </View>
                        <View style={UStyle.detailStyle.View_}>
                        <TitleBox TXTholder="취사여부" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} ></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.cookavail}</Text>
                        </View>
                        <View style={UStyle.detailStyle.View_}>
                        <TitleBox TXTholder="안내사항" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={80}></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.notice}</Text>
                        </View>
                      </View>
                    )
                  }else{
                    detailList.push(
                      <View style={{marginTop:-37, marginLeft: 20}}>
                        <Text style={{marginLeft:50, fontSize:23, color:config.BackColor, fontWeight:"bold", marginBottom:10}}>{data.store_name}</Text>
                        <View style={[UStyle.detailStyle.View_, {borderTopWidth:1}]}>
                          <TitleBox TXTholder="주소" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={50}></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.address}</Text>
                        </View>
                        <View style={UStyle.detailStyle.View_}>
                          <TitleBox TXTholder="전화번호" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70}  height={50}></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.callnum}</Text>
                        </View>
                        <View style={UStyle.detailStyle.View_}>
                        <TitleBox TXTholder="할인내용" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={57}></TitleBox>
                          <Text style={UStyle.detailStyle.content}>{data.benefit}</Text>
                        </View>
                      </View>
                    )}
                }
                if(RegionArray[i].icon == 'hotel'){
                  detailList.push(
                    <View style={{ marginLeft: 20, marginTop:10}}>
                        <Text style={{color:"black", fontWeight:"bold"}}>{n+1}. {data.area}</Text>
                        <View style={UStyle.detailStyle.View_}>
                          <Text style={UStyle.detailStyle.Title1}>비수기</Text>
                          <Text style={UStyle.detailStyle.content1}>{data.offseason}</Text>
                          <Text> / </Text>
                          <Text style={UStyle.detailStyle.Title1}>성수기</Text>
                          <Text style={UStyle.detailStyle.content1}>{data.peakseason}</Text>
                          <Text> / </Text>
                          <Text style={UStyle.detailStyle.Title1}>휴일</Text>
                          <Text style={UStyle.detailStyle.content1}>{data.holiday}</Text>
                        </View>
                        <View style={UStyle.detailStyle.View_}>
                          <Text style={UStyle.detailStyle.Title1}>수용인원</Text>
                          <Text style={UStyle.detailStyle.content1}>{data.people}</Text>
                        </View>
                      </View>
                  )
                }
              })

              setDetail(detailList);
              setMove(true);
            });
            //View display none하고 상세화면 display
            
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
                  <Ionicons key="up" name="chevron-back-circle-outline" color={config.BackColor} size={40} style={{marginTop:10, marginLeft: 20}} onPress={() => {setMove(false);}}/>
                  <View>{detail}</View>
                  
                </View>
              </ScrollView>
            </View>
          </View>
        </Animated.View>
    );
}

export default SlideUpAndDown;
