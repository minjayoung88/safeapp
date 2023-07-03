import React, { useEffect, useRef, useState } from "react";
import {View, Text, Animated, Image, Alert} from 'react-native';
// import MapInfo from '~/Components/Information/ChMapInfo';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import GetLocation from 'react-native-get-location';
import Styles from "../Assets/Styles/Styles";
import IconButton from '../Components/Common/IconButton'
import MapView, { PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import Feather from 'react-native-vector-icons/Feather';
import * as config from '../Common/config'
import {Picker} from '@react-native-community/picker';
import InterestGroup from '../Components/Group/InterestGroup';
import SlideUpAndDown from '../Components/Group/SlideUpAndDown'
import SafeInfo from '../Components/Information/SafeInfo'
import { Double } from "react-native/Libraries/Types/CodegenTypes";

class Home extends React.Component {
    state = {
        Curr_lan : 36.143099,
        Curr_log : 128.392905,
        Save_lan : 36.143099,
        Save_log : 128.392905,
        latitudeDelta: 0.99, 
        longitudeDelta: 0.99,
        markers: [{
            key: 0,
            icon: '',
            latitude: 37.6292,
            longitude: 126.6576,
            CallNo: '',
            Adress: '',
            Title: '',
            pinColor : 'yellow',
            onEvent : () => {},
            carData: {pop1:0, pop2:0},
        }],
        Ready_Lo : false,
        ConWidth : responsiveWidth(100),
        ConHeight : responsiveHeight(100) - 125,
        SearchBTN : false,
        sigunSearch : false,
        uniqueValue: 1,
        Selsi: '강원도',
        Selsigun: '전체',
        Region_1 : new Array(),
        detail_ : {icon:"", lan:0, log:0, seq:0},
        Region_2 : ["전체", "강릉시","고성군","삼척시","속초시","양양군","토성군","평창군","홍천군","횡성군","원주시","춘천시"],
    }
    Curr_lan1:Double = 0;
    Curr_log1:Double = 0;
    //const Region_All:any;
    constructor(props:any){
        super(props);
    }
    geoLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
            //console.log(parseFloat(JSON.stringify(location.latitude)));
            //현재 위치 저장
            this.Curr_lan1 = parseFloat(JSON.stringify(location.latitude));
            this.Curr_log1 = parseFloat(JSON.stringify(location.longitude));
            this.setState({
                Curr_lan : parseFloat(JSON.stringify(location.latitude)),
                Curr_log : parseFloat(JSON.stringify(location.longitude)),
                Save_lan : parseFloat(JSON.stringify(location.latitude)),
                Save_log : parseFloat(JSON.stringify(location.longitude)),
                latitudeDelta: 0.29, 
                longitudeDelta: 0.29,
                Ready_Lo : true,
            })
            this.onGetBokji("1", "1", "1");
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }

    markerClick = (icon: string, lan:Double, log:Double, seq:number) => {
        //NavigationService.navigate('InfoHome', {screen: 'heritageInfo', ChId: chId});
        if(icon == 'hotel' || icon == 'restaurant'){
            this.setState({detail_:{icon: icon, lan : lan, log:log, seq:seq}});
        }
    }

    async componentDidMount() {
        this.geoLocation();
    }

    deg2rad = (deg:any) =>
    {
        return deg * (Math.PI/180);
    }

    getDistance = (pair1:any[], pair2:any[]) =>
    {
        const [lat1, lon1] = pair1, [lat2, lon2] = pair2;
        const R = 6371; // Radius of the earth in km.
        var dLat = this.deg2rad(lat2-lat1);
        var dLon = this.deg2rad(lon2-lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        // Return distance in km.
        return R * c;
    }
    onRegionChange = (region:any) => {
        const pair1 = [this.state.Save_lan, this.state.Save_log]
        const pair2 = [region.latitude, region.longitude]
        
        const dis = this.getDistance(pair1, pair2)
        
        const CHK = dis >= 3? true : false
        
        this.setState({
            Curr_lan : region.latitude,
            Curr_log : region.longitude,
            latitudeDelta: region.latitudeDelta, 
            longitudeDelta: region.longitudeDelta,
            Ready_Lo : true,
            SearchBTN : CHK,
        })
    }
    // Gubun : 위치검색(위경도) -> 1, 시도시군구검색 구분 -> 2
    // Gubun2 : 위치가 이동된 후 현위치검색 버튼을 눌러서 온경우 -> 2
    // Gubun3 : 복지시설, 할인음식점 둘 다 선택한 상태로 검색한 경우 -> 2
    Save_marker:any = new Array();
    onGetBokji = (Gubun:string, Gubun2:string, Gubun3:string) => {
        let reqUrl = Gubun == "1"? 'http://jjsung.o-r.kr/defense/bokjihouseLocationNear?latitude=' + this.state.Curr_lan + '&longitude=' + this.state.Curr_log : 'http://jjsung.o-r.kr/defense/bokjihouse_basic?sido=' + this.state.Selsi + '&sigungu=' + this.state.Selsigun
        //Alert.alert(reqUrl);
        
        fetch(reqUrl , {
              method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            //Alert.alert("들어옴");
            this.Save_marker = new Array();
            let hrg_list = Array();
            let sum_lat = 0;
            let sum_lon = 0;
            let sido_ = '';
            responseJson.map((hrg: any, n:number) => {
                sum_lat = sum_lat + Number(hrg.latitude);
                sum_lon = sum_lon + Number(hrg.longitude);
                if(hrg.alladdr != null){
                    sido_ = n == 0? hrg.alladdr.split(/\s+/g)[0] : sido_;
                }
                //console.log(hrg)
                 hrg_list.push({
                    icon : 'hotel',
                    key: Number(hrg.seq) + 2000,
                    latitude: Number(hrg.latitude),
                    longitude: Number(hrg.longitude),
                    CallNo: hrg.callnum,
                    Adress: hrg.alladdr,
                    Title: hrg.name,
                    pinColor : '#11609c',
                 });
            })
            this.Save_marker = hrg_list;
            this.setState({
                markers: hrg_list,
            });
            let count_ = hrg_list.length;
        
            if(sido_ != ''){
                this.setState({
                    Selsi: sido_,
                });
                this.selsiReturn(sido_);
            }
            //console.log("Gubun:" + Gubun);
            //시군구로 검색했을때
            if(Gubun != "1"){
                //this.state.Save_lan, this.state.Save_log
                if(count_ > 0){
                    let con_lat = (sum_lat/count_).toFixed(7);
                    let con_lon = (sum_lon/count_).toFixed(7);
                    this.setState({
                        Curr_lan : parseFloat(con_lat),
                        Curr_log : parseFloat(con_lon),
                        latitudeDelta:1,
                        longitudeDelta:1,
                        Save_lan : parseFloat(con_lat),
                        Save_log : parseFloat(con_lon),
                        SearchBTN : false,
                    })
                }else {
                    if(Gubun3 !="2"){
                        Alert.alert("검색결과가 없습니다.");
                    }
                }
                //console.log("시군구검색하고, 현위치 변경");
            }

            //현위치 검색을 누를때
            if(Gubun2 != "1"){
                if(count_ > 0){
                    let con_lat = (sum_lat/count_).toFixed(7);
                    let con_lon = (sum_lon/count_).toFixed(7);
                    this.setState({
                        Save_lan : parseFloat(con_lat),
                        Save_log : parseFloat(con_lon),
                        SearchBTN : false,
                    })
                }
            }
            //console.log("Gubun3:" + Gubun3);
            if(Gubun3 != "1"){
                //console.log("a");
                this.onGetRes(Gubun, Gubun2, Gubun3);
            }
        })
        .catch((error) => {
           Alert.alert(error.message);
        });
    };

    onGetRes = (Gubun:string, Gubun2:string, Gubun3:string) => {
        
        let reqUrl = Gubun == "1"? 'http://jjsung.o-r.kr/defense/restaurantLocationNear?latitude=' + this.state.Curr_lan + '&longitude=' + this.state.Curr_log : 'http://jjsung.o-r.kr/defense/restaurant_basic?sido=' + this.state.Selsi + '&sigungu=' + this.state.Selsigun
        //console.log(reqUrl);
        fetch(reqUrl , {
              method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            let Res_list = Array()
            let sum_lat = 0;
            let sum_lon = 0;
            let sido_ = '';
            responseJson.map((hrg: any, n:number) => {
                sum_lat = sum_lat + Number(hrg.latitude);
                sum_lon = sum_lon + Number(hrg.longitude);
                if(hrg.address != null){
                    sido_ = n == 0? hrg.address.split(/\s+/g)[0] : sido_;
                }
                //console.log(hrg)
                Res_list.push({
                    icon : 'restaurant',
                    key: Number(hrg.seq) + 1000,
                    latitude: Number(hrg.latitude),
                    longitude: Number(hrg.longitude),
                    CallNo: hrg.callnum,
                    Adress: hrg.address,
                    Title: hrg.store_name,
                    pinColor : '#8A2BE2',
                 })
            })

            if(sido_ != '' && Gubun3=="1"){
                this.setState({
                    Selsi: sido_,
                });
                this.selsiReturn(sido_);
            }
            const before_marker = this.Save_marker;
            this.Save_marker = Gubun3 == "2"? this.Save_marker.concat(Res_list) : Res_list;
            this.setState({
                markers: this.Save_marker,
            })
            let count_ = this.Save_marker.length;
           
            //할인음식점만 선택하고 검색했을경우
            if(before_marker.length == 0){
                 if(count_ > 0){
                     let con_lat = (sum_lat/count_).toFixed(7);
                     let con_lon = (sum_lon/count_).toFixed(7);
                     this.setState({
                         Curr_lan : parseFloat(con_lat),
                         Curr_log : parseFloat(con_lon),
                         latitudeDelta:1,
                         longitudeDelta:1,
                         Save_lan : parseFloat(con_lat),
                         Save_log : parseFloat(con_lon),
                         SearchBTN : false,
                     })
                 }else {
                     Alert.alert("검색결과가 없습니다.");
                 }
            }

            //현위치 검색을 누를때
            if(Gubun2 != "1"){
                if(count_ > 0){
                    let con_lat = (sum_lat/count_).toFixed(7);
                    let con_lon = (sum_lon/count_).toFixed(7);
                    this.setState({
                        Save_lan : parseFloat(con_lat),
                        Save_log : parseFloat(con_lon),
                        SearchBTN : false,
                    })
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };

    ConHeight = responsiveHeight(100) - 125;
    
    buttonWidth = responsiveWidth(35)
    static navigationOptions = {
        //headerLeft: () => <SideIcon/>,
    };
    Region_All:any = JSON.parse(JSON.stringify(require('../Assets/Data/region.json')));
    sidoJSON:any = JSON.parse(JSON.stringify(require('../Assets/Data/sido.json')));
    sigunguJSON:any = JSON.parse(JSON.stringify(require('../Assets/Data/sigungu.json')));
    carAcc:any = JSON.parse(JSON.stringify(require('../Assets/Data/carAccident.json')));
    //this.state.Region_All = JSON.parse(JSON.stringify(MenuList_));
    selNumList:string = '';
    selsiReturn = (val: any) => {
        this.setState({Selsi: val})
        this.setState({Region_2: this.Region_All[val]});
    }

    selsigunReturn = (val: any) => {
        this.setState({Selsigun: val});
    }

    SelGReturn = (arr:Array<number>) => {
        //console.log("선택값:" + arr);
        this.selNumList = '';
        const InList = config.InterestList;
        arr.map((v, i) => {
            //const val_ = InList[v].replace('#', '')
            this.selNumList = this.selNumList.length == 0? v.toString() : this.selNumList + ',' + v.toString();
        })
    };
  
    SearchCar = () => {
        //geocoding써야해
        fetch('https://maps.googleapis.com/maps/api/geocode/json?language=ko&address=' + this.state.Curr_lan  + ',' + this.state.Curr_log + '&key=AIzaSyDcs_DDnzWq4EGxdz9Nr--Rq6vcMiiBdNs')
            .then((response) => response.json())
            .then((responseJson) => {
                const alladdr_ = responseJson.results[0].formatted_address;
                const sido_ = alladdr_.split(/\s+/g)[1];
                const sigungu_ = alladdr_.split(/\s+/g)[2];
                const sidoCode = this.sidoJSON.data[sido_];
                const sigunguCode = this.sigunguJSON.data[sidoCode][sigungu_];

                var url = 'http://apis.data.go.kr/B552061/AccidentDeath/getRestTrafficAccidentDeath?searchYear=2021&type=json&serviceKey=Le8c15KiRz0G8xk1HjeZn4lJ9AxvBpJJYpXjtuDSrTlXtYb7DYsZPndhvZAr%2BSgk%2BJfxGZyqPsfCCM%2FMM2qkTg%3D%3D'+ '&siDo='+sidoCode+'&guGun='+sigunguCode+'&numOfRows=100&pageNo=1';
                console.log(url);
                fetch(url).then((response1) => response1.json())
                .then((responseJson1) => {
                    console.log(responseJson1.items.item);
                    let list_:any = [];
                    responseJson1.items.item.map((data_: any, n:number) => {
                        const carName = this.carAcc.data[data_.acc_ty_lclas_cd][data_.acc_ty_mlsfc_cd];
                        list_.push({
                            icon : 'car',
                            key: n + 100,
                            latitude: Number(data_.la_crd),
                            longitude: Number(data_.lo_crd),
                            Title: carName,
                            pinColor : 'blue',
                            carData : {"pop1" : data_.dth_dnv_cnt, 'pop2' : data_.injpsn_cnt}
                         });
                    });
                    
                    this.setState({
                        markers: [...this.state.markers, ...list_],
                    })
                });
            })
            .catch((error) => console.log(error));
    }

    SearchFire = () => {
        
    }

    SearchShelter = () => {

    }

    render() {
        let serviceItems1 = config.SiList.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });
        let serviceItems2 = this.state.Region_2.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });

        if (this.state.Ready_Lo){
            return  <View style={ {width: this.state.ConWidth, height: this.ConHeight, backgroundColor:'white', flex:1}}>
            <View style={Styles.Regionstyle.Home_View}>
                <View style={{flexDirection : "row"}}>
                    <Image style={{height: 40, width: 40}}  source={require('../Assets/Images/shield.png')} />
                    <Text style={{fontSize:23, color:'black', marginTop: 5, marginLeft: 5}}>안전한 여행도우미</Text>
                </View>
                <Text style={{fontSize:20, color:'white', marginTop:10}}>복지시설과 할인음식점을 검색해보세요.</Text>
                <View style={{flexDirection : "row", marginTop:15, width: 340}}>
                    <InterestGroup SelList={[]} Editable={true} returnEVT={this.SelGReturn} ViewStyle={Styles.SelBox.View_style} selBoxList={config.InterestList}></InterestGroup>
                </View>
                <View style={{flexDirection : "row", marginTop:15}}>
                    <View style={Styles.Pickstyle.Picker_View}>
                        <Picker enabled={true} style={[Styles.Pickstyle.Picker_style, {fontFamily: config.TFont}]} selectedValue={this.state.Selsi} mode="dialog" 
                        onValueChange={(itemValue) =>this.selsiReturn(itemValue)}>
                            {serviceItems1}
                        </Picker>
                    </View>
                    <View style={Styles.Pickstyle.Picker_View}>
                        <Picker enabled={true} style={[Styles.Pickstyle.Picker_style, {fontFamily: config.TFont}]} selectedValue={this.state.Selsigun} mode="dialog" 
                        onValueChange={(itemValue) =>this.selsigunReturn(itemValue)}>
                             {serviceItems2}
                        </Picker>
                    </View>
                    <Feather name="search" color="black" size={30} style={{marginTop:5}} onPress={() => {
                        
                            const arr_ = this.selNumList.split(',');
                            //둘다 선택되어진경우, 복지시설 -> 할인음식점 순서대로
                            //console.log("선택값 :" +arr_);
                            if(arr_.length == 2){
                                this.onGetBokji("2", "1", "2");
                            }else{
                                if(arr_[0] == "1"){
                                    this.Save_marker = new Array();
                                    this.onGetRes("2", "1", "1");
                                }else{this.onGetBokji("2", "1", "1");}
                            }
                        }
                    }/>
                </View>
                
            </View>
            
            <MapView
                onMapReady={() => this.setState({ ConWidth: this.state.ConWidth - 1 })}
                style={{ flex: 1, zIndex: -1 }} 
                provider={PROVIDER_GOOGLE} 
                region={{ latitude: this.state.Curr_lan, 
                        longitude: this.state.Curr_log, 
                        latitudeDelta:this.state.latitudeDelta, 
                        longitudeDelta: this.state.longitudeDelta, }}
                onRegionChangeComplete={this.onRegionChange.bind(this)}
                showsMyLocationButton={true}
                showsUserLocation={true}
            >
                {this.state.markers.map(marker => (
                            <Marker
                                coordinate={{
                                    latitude: Number(marker.latitude),
                                    longitude: Number(marker.longitude),
                                }}
                                
                                key= {Number(marker.key)}
                                pinColor={marker.pinColor}
                                zIndex={-1}
                                onPress={() => 
                                {
                                    this.setState({
                                        Save_lan : Number(marker.latitude),
                                        Save_log : Number(marker.longitude),
                                        SearchBTN : false,
                                    })
                                }}
                            >
                                <Callout style={{zIndex:-1}} onPress={() => this.markerClick(marker.icon, Number(marker.latitude), Number(marker.longitude), marker.key)}>
                                    {/* <MapInfo ChId={Number(marker.key)} ChAddress={marker.Adress} ChCallNo={marker.CallNo} ChTitle={marker.Title}/> */}
                                    {(marker.icon == 'hotel' || marker.icon == 'restaurant') && 
                                    <Text style={{height:45, textAlignVertical:'center', color:'black'}}>{marker.Title}</Text>
                                    }
                                    {marker.icon == 'car' &&
                                    <View style={{width:'auto', height: 'auto'}}>
                                        <Text style={{textAlignVertical:'center', color:'black'}}>사고 유형 : {marker.Title}</Text>
                                        <Text style={{textAlignVertical:'center', color:'black'}}>사망자 수 : {marker.carData.pop1}</Text>
                                        <Text style={{textAlignVertical:'center', color:'black'}}>부상자 수 : {marker.carData.pop2}</Text>
                                    </View>
                                        
                                    }
                                </Callout>
                            </Marker>
                        ))}
            </MapView>
            { this.state.SearchBTN && 
            <View style={{position: 'absolute', top: 235, left: this.buttonWidth}}>
                <IconButton Name={'refresh'} BTNText={"현 지도에서 검색"} onPressBTN={() => {
                    const arr_ = this.selNumList.split(',');
                    //둘다 선택되어진경우, 복지시설 -> 할인음식점 순서대로
                    console.log("선택값 :" +arr_);
                    if(arr_.length == 2){
                        this.onGetBokji("1", "2", "2");
                    }else{
                        if(arr_[0] == "1"){
                            this.Save_marker = new Array();
                            this.onGetRes("1", "2", "1");
                        }else{this.onGetBokji("1", "2", "1");}
                    }
                    }
                } BTNstyle= {Styles.BTNStyle.Mapbutton} Textstyle= {Styles.BTNStyle.text}></IconButton>
            </View>
            }
            <View style={{position: 'absolute', top: 271, right: 15, width: 180, height: 38}}>
                <SafeInfo onClickEVT_car={this.SearchCar} onClickEVT_fire={this.SearchFire} onClickEVT_shelter={this.SearchShelter}/>
            </View>
           <SlideUpAndDown RegionArray={this.Save_marker} DetailData={this.state.detail_} Curr_lan={this.Curr_lan1} Curr_log={this.Curr_log1}/>

        </View>
         
        } 
        else{
            return  <View style={{height: this.ConHeight + 70, backgroundColor:'white'}}>
                        <Text style={Styles.CenterTxtStyle.Text}>{'현재 위치를 검색중입니다....'}</Text>
                    </View>
        }
    };
};

export default Home;
  