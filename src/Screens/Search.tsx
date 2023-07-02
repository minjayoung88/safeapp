import * as React from 'react';
import { Button, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Styles from "../Assets/Styles/Styles";
import {Picker} from '@react-native-community/picker';
import * as config from '../Common/config'
import Feather from 'react-native-vector-icons/Feather';
import AlarmComp from '../Components/Information/AlarmComp'
import { ScrollView } from 'react-native-gesture-handler';
import OpButton from '../Components/Common/OpButton';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

class Search extends React.Component {
  state = {
    Selsi : '전체',
    Selsigun :  '전체',
    Region2 : ["전체"],
    alramMSG : [{
      region1_array : [''],
      Allregion_array : [''],
      create_date :'',
      location_name : '',
      msg :'',
    }],
    alramMSGComp: [],
    moreBTN : true,
  }

  CurrPageNO = 1;
  CurrData:any = [];
  Region_All:any = JSON.parse(JSON.stringify(require('../Assets/Data/region.json')));

  selsiReturn = (val: any) => {
    this.setState({Selsi: val})
    this.setState({Region2: this.Region_All[val]});
  }

  selsigunReturn = (val: any) => {
    this.setState({Selsigun: val});
  }
  // 최신 100개 데이터 저장
  CurrSearch = (Gubun:Int32) => {
    this.CurrPageNO = 1;
    let reqUrl = 'https://apis.data.go.kr/1741000/DisasterMsg3/getDisasterMsg1List?serviceKey=Le8c15KiRz0G8xk1HjeZn4lJ9AxvBpJJYpXjtuDSrTlXtYb7DYsZPndhvZAr%2BSgk%2BJfxGZyqPsfCCM%2FMM2qkTg%3D%3D&pageNo=1&numOfRows=100&type=json'
    fetch(reqUrl , {
          method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let alramMSG_ = new Array();
      responseJson.DisasterMsg[1].row.map((n:any,i:any) =>{
        let location_arr = n.location_name.split(',');
        let arr1 = Array();
        location_arr.map((n1:any, i1:any) => {
          const si = n1.split(/\s+/g)[0];
          if(!arr1.includes(si)){
            arr1.push(si);
          }
        });
        //console.log(location_arr);
        //console.log(arr1);
        alramMSG_.push({
          region1_array : arr1,
          Allregion_array : location_arr,
          create_date : n.create_date,
          location_name : n.location_name,
          msg : n.msg,
        });
      });
      this.setState({alramMSG: alramMSG_});
      this.SearchDetail(Gubun);
    });
  }

  // Gubun
  // 1 : 초기검색 또는 더보기 버튼
  // 2 : 검색버튼
  SearchDetail = (Gubun:Int32) => {
    //1. 시도가 전체일경우 -> 전체데이터
    //2. 시도가 전체가 아니고, 시군구가 전체일경우 -> region1_array비교
    //3. 시도와 시군구 모두 전체가 아닌경우 -> Allregion_array 비교
    let Comp_:any = [];
    const selsi_ = this.state.Selsi == "강원도"? "강원특별자치도" : this.state.Selsi == "제주도"? "제주특별자치도" : this.state.Selsi == "세종시"? "세종특별자치시" : this.state.Selsi;
    const baseArr = this.state.Selsi == "전체"? this.state.alramMSG : this.state.Selsigun == "전체"? this.state.alramMSG.filter(r=> r.region1_array.includes(selsi_)) : this.state.alramMSG.filter(o => o.Allregion_array.includes(selsi_ + ' ' + this.state.Selsigun));
    const arrayTmp = Array.from(baseArr).slice(this.CurrPageNO -1 , this.CurrPageNO * 10);
    if(arrayTmp.length < 10){
      this.setState({moreBTN : false});
    }else {
      this.setState({moreBTN : true});
    }
    arrayTmp.map((n:any,i:any) =>{
      Comp_.push(
        <View key={"alarm_" + i}>
          <AlarmComp create_date={n.create_date} location_name={n.location_name} msg={n.msg} key={"comp_" + i}/>
        </View>
      )
    });
    
    //if(Gubun != 2){
    //  this.setState({alramMSGComp: [...this.state.alramMSGComp,...Comp_]});
    //  }else {
      this.setState({alramMSGComp: Comp_});
    //}
  }

  async componentDidMount() {
    //console.log("aaaa");
    //this.SearchDetail(1);
    this.CurrSearch(1);
  }

  moreAlarm = () => {
    this.CurrPageNO ++;
    this.SearchDetail(1);
  }

render() {
  
  let serviceItems1 = config.SiList2.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} />
  });
  let serviceItems2 = this.state.Region2.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
  });
    return (
      <View style={{width: responsiveWidth(100)}}>
          <View style={{flexDirection : "row", marginTop:30, marginLeft: 30, marginBottom:10}}>
            <View style={Styles.Pickstyle.Picker_View}>
              <Picker enabled={true} style={[Styles.Pickstyle.Picker_style, {fontFamily: config.TFont}]} selectedValue={this.state.Selsi}
                onValueChange={(itemValue,n) =>{this.selsiReturn(itemValue);}}
                >
                {serviceItems1}
              </Picker>
            </View>
            <View style={Styles.Pickstyle.Picker_View}>
              <Picker enabled={true} style={[Styles.Pickstyle.Picker_style, {fontFamily: config.TFont}]} selectedValue={this.state.Selsigun}
                onValueChange={(itemValue,n) =>{this.selsigunReturn(itemValue);}}
                >
                {serviceItems2}
              </Picker>
            </View>
            <Feather name="search" color="black" size={30} style={{marginTop:5}} onPress={() => {this.CurrSearch(2);}}/>
          </View>
          <ScrollView style={{height: responsiveHeight(100) - 200}}>
            {this.state.alramMSGComp}
            {this.state.moreBTN &&
            <View style={{height: 70, padding: 15, marginTop: -15}}>
              <OpButton BTNText={"더보기"} onPressBTN={() => this.moreAlarm()} BTNstyle= {Styles.BTNStyle.Albutton} Textstyle= {Styles.BTNStyle.text}></OpButton>
            </View>
            }
          </ScrollView>
      </View>
    );
  }
};

export default Search;
