import React, { useEffect, useRef, useState, useCallback } from "react";
import {View, Animated, ScrollView, Text, Linking} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import RegionComp from '../Information/RegionComp';
import UStyle from '../../Assets/Styles/Styles';
import * as config from '../../Common/config';
import TitleBox from '../Common/TitleBox';
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  RegionArray:any,
  DetailData:any,
  Curr_lan:any,
  Curr_log:any,
}

const SlideUpAndDown = ({RegionArray, DetailData,Curr_lan, Curr_log}:Props) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [enabled, setEnabled] = useState(true);
    const [move, setMove] = useState(false);
    const [detail, setDetail] = useState([<></>]);
    const [detail1, setDetail1] = useState([<></>]);
    const boxList = [];
    let detailList: React.JSX.Element[] = [];
    let detailList1: React.JSX.Element[] = [];
    const navigation:any = useNavigation();
    const NaviUrl = 'nmap://map?lat=37.4979502&lng=127.0276368&zoom=20&appname=com.safeapp';
    const ConnNavi = async (name:string, lat:Double, log:Double) => {
      console.log("aaa");
      // Checking if the link is supported for links with custom URL scheme.
      const NaviUrl1 = 'nmap://route/public?slat='+Curr_lan+'&slng='+Curr_log+'&sname=현위치&dlat='+lat+'&dlng='+log+'&dname='+name+'&appname=com.example.myapp'
      const NaviUrl2 = 'tmap://route?goalname='+name+'&goalx='+log+'&goaly='+lat;
      const NaviUrl3 = 'kakaomap://route?sp='+Curr_lan+','+Curr_log+'&ep='+lat+','+log+'&by=CAR'
      let Map = '';
      let mapGubun = await AsyncStorage.getItem('map');
      console.log("aaa");
      Map = mapGubun != null? mapGubun == 'naver'? NaviUrl1 : mapGubun == 'kakao'? NaviUrl3 : NaviUrl2 : NaviUrl1;
      
      const supported = await Linking.canOpenURL(Map);
  
      if (supported) {
        await Linking.openURL(Map);
      } else {
        console.log("안열림");
      }
    };
    
    useEffect(() => {
      //const enabled_ =  DetailData.icon != ""? true: false;
      Animated.timing(animation, {
        toValue: enabled ? 430 : 90,
        useNativeDriver: true,
      }).start();
    }, [animation, enabled]);
   
    const SearchDetail = (icon:string, lan:Double, log:Double, seq:number) => {
        //상세화면 불러오기
        let reqUrl = icon == "hotel"? 'http://jjsung.o-r.kr/defense/bokjihouse_detail?latitude=' + lan + '&longitude=' + log : 'http://jjsung.o-r.kr/defense/restaurant_detail?seq=' + seq
        console.log(reqUrl);
        fetch(reqUrl , {
              method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          //setDetail([]); //초기화
          detailList = [];
          let arr = [];
          responseJson.map((data: any, n:number) => {
            if(n == 0){
              if(icon == 'hotel'){
                detailList.push(
                  <View style={{marginTop:-37, marginLeft: 20}} key = {'DView_' + n}>
                    <Text style={{marginLeft:50, fontSize:23, color:config.BackColor, fontWeight:"bold", marginBottom:10}}>{data.name}</Text>
                    <View style={[UStyle.detailStyle.View_, {borderTopWidth:1}]}>
                      <TitleBox TXTholder="주소" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={70}></TitleBox>
                      <Text style={UStyle.detailStyle.Callcontent} onPress={() => {console.log("aaaaa"); ConnNavi(data.name, data.latitude, data.longitude )}}>{data.alladdr}</Text>
                    </View>
                    <View style={UStyle.detailStyle.View_}>
                      <TitleBox TXTholder="전화번호" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} ></TitleBox>
                      <Text style={UStyle.detailStyle.Callcontent} onPress ={() => Linking.openURL(`tel:${data.callnum}`)}>{data.callnum}</Text>
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
                  <View style={{marginTop:-37, marginLeft: 20}} key = {'DView1_' + n}>
                    <Text style={{marginLeft:50, fontSize:23, color:config.BackColor, fontWeight:"bold", marginBottom:10}}>{data.store_name}</Text>
                    <View style={[UStyle.detailStyle.View_, {borderTopWidth:1}]}>
                      <TitleBox TXTholder="주소" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={70}></TitleBox>
                      <Text style={UStyle.detailStyle.Callcontent} onPress={() => {ConnNavi(data.store_name, data.latitude, data.longitude )}}>{data.address}</Text>
                    </View>
                    <View style={UStyle.detailStyle.View_}>
                      <TitleBox TXTholder="전화번호" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70}  height={50}></TitleBox>
                      <Text style={UStyle.detailStyle.Callcontent} onPress ={() => Linking.openURL(`tel:${data.callnum}`)}>{data.callnum}</Text>
                    </View>
                    <View style={UStyle.detailStyle.View_}>
                    <TitleBox TXTholder="할인내용" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={57}></TitleBox>
                      <Text style={UStyle.detailStyle.content}>{data.benefit}</Text>
                    </View>
                  </View>
                )}
            }
            if(icon == 'hotel'){
              detailList.push(
                <View style={{ marginLeft: 20, marginTop:10}} key = {'Dhotel_' + n}>
                    <Text style={{color:"black", fontWeight:"bold", fontSize:15}}>{n+1}. {data.area}</Text>
                    <View style={UStyle.detailStyle.View_1}>
                      <Text style={UStyle.detailStyle.Title1}>비수기</Text>
                      <Text style={UStyle.detailStyle.content1}>{data.offseason}</Text>
                      <Text style={UStyle.detailStyle.Title1}> / </Text>
                      <Text style={UStyle.detailStyle.Title1}>성수기</Text>
                      <Text style={UStyle.detailStyle.content1}>{data.peakseason}</Text>
                      <Text style={UStyle.detailStyle.Title1}> / </Text>
                      <Text style={UStyle.detailStyle.Title1}>휴일</Text>
                      <Text style={UStyle.detailStyle.content1}>{data.holiday}</Text>
                    </View>
                    <View style={UStyle.detailStyle.View_1}>
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
    }

    for (let i:number = 0; i <RegionArray.length; i= i+1) {
      boxList.push(
          <RegionComp key={'region_' + i} icon={RegionArray[i].icon} lan={RegionArray[i].latitude} log={RegionArray[i].longitude} Name={RegionArray[i].Title} CallNo={RegionArray[i].CallNo} Adress={RegionArray[i].Adress} 
          onPressBTN={() => {SearchDetail(RegionArray[i].icon,RegionArray[i].latitude, RegionArray[i].longitude, RegionArray[i].key)}}/>
      )
    }

    if(DetailData.icon != ""){
      //상세화면 불러오기
      let reqUrl = DetailData.icon == "hotel"? 'http://jjsung.o-r.kr/defense/bokjihouse_detail?latitude=' + DetailData.lan + '&longitude=' + DetailData.log : 'http://jjsung.o-r.kr/defense/restaurant_detail?seq=' + DetailData.seq
      //console.log(reqUrl);
      fetch(reqUrl , {
            method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        //setDetail1([]); //초기화
        detailList1 = [];
        responseJson.map((data: any, n:number) => {
          if(n == 0){
            if(DetailData.icon == 'hotel'){
              detailList1.push(
                <View style={{marginTop:-37, marginLeft: 20}} key = {'View_' + n}>
                  <Text style={{marginLeft:50, fontSize:23, color:config.BackColor, fontWeight:"bold", marginBottom:10}}>{data.name}</Text>
                  <View style={[UStyle.detailStyle.View_, {borderTopWidth:1}]}>
                    <TitleBox TXTholder="주소" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={50}></TitleBox>
                    <Text style={UStyle.detailStyle.Callcontent} onPress={() => {ConnNavi(data.name, data.latitude, data.longitude )}}>{data.alladdr}</Text>
                  </View>
                  <View style={UStyle.detailStyle.View_}>
                    <TitleBox TXTholder="전화번호" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} ></TitleBox>
                    <Text style={UStyle.detailStyle.Callcontent} onPress ={() => Linking.openURL(`tel:${data.callnum}`)}>{data.callnum}</Text>
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
              detailList1.push(
                <View style={{marginTop:-37, marginLeft: 20}} key = {'View1_' + n}>
                  <Text style={{marginLeft:50, fontSize:23, color:config.BackColor, fontWeight:"bold", marginBottom:10}}>{data.store_name}</Text>
                  <View style={[UStyle.detailStyle.View_, {borderTopWidth:1}]}>
                    <TitleBox TXTholder="주소" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={50}></TitleBox>
                    <Text style={UStyle.detailStyle.Callcontent} onPress={() => {ConnNavi(data.store_name, data.latitude, data.longitude )}}>{data.address}</Text>
                  </View>
                  <View style={UStyle.detailStyle.View_}>
                    <TitleBox TXTholder="전화번호" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70}  height={50}></TitleBox>
                    <Text style={UStyle.detailStyle.Callcontent} onPress ={() => Linking.openURL(`tel:${data.callnum}`)}>{data.callnum}</Text>
                  </View>
                  <View style={UStyle.detailStyle.View_}>
                  <TitleBox TXTholder="할인내용" ViewStyle={UStyle.SelBox.View_style3} TXTkey="1" BoxWidth={70} height={57}></TitleBox>
                    <Text style={UStyle.detailStyle.content}>{data.benefit}</Text>
                  </View>
                </View>
              )}
          }
          if(DetailData.icon == 'hotel'){
            detailList1.push(
              <View style={{ marginLeft: 20, marginTop:10}} key = {'hotel_' + n}>
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

        setDetail1(detailList1);
      })
    }
    return (
        <Animated.View style={{transform: [{translateY: animation}], position: 'absolute', bottom:70 , left: 0, width: responsiveWidth(100), height: responsiveHeight(100) - 305, backgroundColor:'white', borderRadius: 30, borderWidth:0.5, borderColor:'#d0d0d0' }}>
          <View style={{height: responsiveHeight(100) - 310}}>
            <View style={{height: 40, borderBottomWidth: 1, borderColor: '#d0d0d0', width: responsiveWidth(100) - 20, marginLeft: 10, alignItems:'center'}} 
              onTouchEnd={() => { setEnabled(!enabled);}}>
              <Feather key="up" name="chevron-up" color="#d0d0d0" size={30} style={[{marginTop:5},enabled?UStyle.btnstyle_.style2: UStyle.btnstyle_.style1]} />
              <Feather key="down" name="chevron-down" color="#d0d0d0" size={30} style={[{marginTop:5}, enabled?UStyle.btnstyle_.style1: UStyle.btnstyle_.style2]} />
            </View>
            <View style={{height: responsiveHeight(100) - 370}}>
              <ScrollView>
                <View style={DetailData.icon != ""?  UStyle.btnstyle_.style1 : move?UStyle.btnstyle_.style1: UStyle.btnstyle_.style2}>{boxList}</View>
                <View style={DetailData.icon != ""?  UStyle.btnstyle_.style2 : move?UStyle.btnstyle_.style2 : UStyle.btnstyle_.style1}>
                  <Ionicons key="up" name="chevron-back-circle-outline" color={config.BackColor} size={40} style={{marginTop:10, marginLeft: 20}} onPress={() => {
                    DetailData.icon = '';
                    setMove(false);
                    }}/>
                  <View>{DetailData.icon != ""? detail1 : detail}</View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Animated.View>
    );
}

export default SlideUpAndDown;
