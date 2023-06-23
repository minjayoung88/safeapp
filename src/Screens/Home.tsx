//import React from 'react';
import * as React from 'react';
import {View, Text, BackHandler, Image, Alert} from 'react-native';
// import MapInfo from '~/Components/Information/ChMapInfo';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import GetLocation from 'react-native-get-location';
import Styles from "../Assets/Styles/Styles";
import IconButton from '../Components/Common/IconButton'
import SelBox from '../Components/Common/SelBox';
import UStyle from '../Assets/Styles/Styles';
import MapView, { PROVIDER_GOOGLE, Marker, Callout }  from "react-native-maps";
import Feather from 'react-native-vector-icons/Feather';
import * as config from '../Common/config'
import {Picker} from '@react-native-community/picker';
import InterestGroup from '../Components/Group/InterestGroup';

class Home extends React.Component  {
    state = {
        Curr_lan : 36.143099,
        Curr_log : 128.392905,
        latitudeDelta: 0.06, 
        longitudeDelta: 0.06,
        markers: [{
            key: 0,
            latitude: 37.6292,
            longitude: 126.6576,
            CallNo: '',
            Adress: '',
            Title: ''
        }],
        Ready_Lo : false,
        ConWidth : responsiveWidth(100),
        ConHeight : responsiveHeight(100) - 125,
        SearchBTN : false,
        uniqueValue: 1,
        Selsi: '강원도',
        Selsigun: '전체',
        Region_1 : new Array(),
        Region_2 : ["전체", "강릉시","고성군","삼척시","속초시","양양군","토성군","평창군","홍천군","횡성군","원주시","춘천시"],
        //Region_All:JSON,
    }
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
            //console.log(parseFloat(JSON.stringify(location.latitude)));
            this.setState({
                Curr_lan : parseFloat(JSON.stringify(location.latitude)),
                Curr_log : parseFloat(JSON.stringify(location.longitude)),
                latitudeDelta: 0.06, 
                longitudeDelta: 0.06,
                Ready_Lo : true,
            })
            this.onGetHeritage("1");
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }

    markerClick = (seq:Number) => {
        //NavigationService.navigate('InfoHome', {screen: 'heritageInfo', ChId: chId}); 
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
        const pair1 = [this.state.Curr_lan, this.state.Curr_log]
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

    onGetHeritage = (Gubun:string) => {
        //console.log('http://jjsung.o-r.kr/defense/bokjihouseLocationNear ' + '?latitude=' + this.state.Curr_lan + '&longitude=' + this.state.Curr_log);
        let reqUrl = Gubun == "1"? 'http://jjsung.o-r.kr/defense/bokjihouseLocationNear?latitude=' + this.state.Curr_lan + '&longitude=' + this.state.Curr_log : 'http://jjsung.o-r.kr/defense/bokjihouse_basic?sido=' + this.state.Selsi + '&sigungu=' + this.state.Selsigun
        console.log(reqUrl);
        fetch(reqUrl , {
              method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
           let hrg_list = Array()
           let sum_lat = 0;
           let sum_lon = 0;

            responseJson.map((hrg: any, n:number) => {
                sum_lat = sum_lat + Number(hrg.latitude);
                sum_lon = sum_lon + Number(hrg.longitude);
                //console.log(hrg)
                 hrg_list.push({
                     key: Number(hrg.seq),
                     latitude: Number(hrg.latitude),
                     longitude: Number(hrg.longitude),
                     CallNo: hrg.callnum,
                     Adress: '',
                     Title: hrg.name
                 })
            })
            this.setState({
                markers: hrg_list,
            })
            let count_ = hrg_list.length;
           
            if(Gubun != "1"){
                if(count_ > 0){
                    let con_lat = (sum_lat/count_).toFixed(7);
                    let con_lon = (sum_lon/count_).toFixed(7);
                    this.setState({Curr_lan: parseFloat(con_lat)});
                    this.setState({Curr_log: parseFloat(con_lon)});
                    this.setState({latitudeDelta:0.99});
                    this.setState({longitudeDelta:0.99});
                }else {
                    Alert.alert("검색결과가 없습니다.");
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };

    ConHeight = responsiveHeight(100) - 125;
    selNumList:string ='';
    buttonWidth = responsiveWidth(35)
    static navigationOptions = {
        //headerLeft: () => <SideIcon/>,
    };
    Region_All:any = JSON.parse(JSON.stringify(require('../Assets/Data/region.json')));
    //this.state.Region_All = JSON.parse(JSON.stringify(MenuList_));

    selsiReturn = (val: any) => {
        this.setState({Selsi: val})
        this.setState({Region_2: this.Region_All[val]});
    }

    selsigunReturn = (val: any) => {
        this.setState({Selsigun: val});
    }

    SelGReturn = (arr:Array<number>) => {
        this.selNumList = '';
        const InList = config.InterestList;
        arr.map((v, i) => {
            const val_ = InList[v].replace('#', '')
            this.selNumList = this.selNumList.length == 0? val_ : this.selNumList + ',' + val_
            // this.selNumList.push(InList[v].replace('#', ''))
        })
    };
    render() {
        let serviceItems1 = config.SiList.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });
        let serviceItems2 = this.state.Region_2.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });

        if (this.state.Ready_Lo){
            return  <View style={ {width: this.state.ConWidth, height: this.ConHeight, backgroundColor:'white', flex:1}}>
            <View style={{height: 230, backgroundColor:'#7bc1b2', flexDirection : "column"}}>
                <View style={{flexDirection : "row"}}>
                    <Image style={{height: 40, width: 40, marginTop:18, marginLeft:80}}  source={require('../Assets/Images/shield.png')} />
                    <Text style={{fontSize:23, color:'black', marginTop:23, marginLeft:10}}>안전한 여행도우미</Text>
                </View>
                <Text style={{fontSize:20, color:'white', marginTop:10, marginLeft:40}}>복지시설과 할인음식점을 검색해보세요.</Text>
                <View style={{flexDirection : "row", marginTop:15, marginLeft: 15}}>
                    <InterestGroup SelList={[]} Editable={true} returnEVT={this.SelGReturn} ViewStyle={UStyle.SelBox.View_style} selBoxList={config.InterestList}></InterestGroup>
                </View>
                <View style={{flexDirection : "row", marginTop:15, marginLeft: 30}}>
                    <View style={UStyle.Pickstyle.Picker_View}>
                        <Picker enabled={true} style={[UStyle.Pickstyle.Picker_style, {fontFamily: config.TFont}]} selectedValue={this.state.Selsi}
                        onValueChange={(itemValue) =>this.selsiReturn(itemValue)}>
                            {serviceItems1}
                        </Picker>
                    </View>
                    <View style={UStyle.Pickstyle.Picker_View}>
                        <Picker enabled={true} style={[UStyle.Pickstyle.Picker_style, {fontFamily: config.TFont}]} selectedValue={this.state.Selsigun}
                        onValueChange={(itemValue) =>this.selsigunReturn(itemValue)}>
                             {serviceItems2}
                        </Picker>
                    </View>
                    <Feather name="search" color="black" size={30} style={{marginTop:5}} onPress={() => this.onGetHeritage("2")}/>
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
                                pinColor='skyblue'
                                zIndex={-1}
                            >
                                <Callout style={{zIndex:-1}} onPress={() => this.markerClick(Number(marker.key))}>
                                    {/* <MapInfo ChId={Number(marker.key)} ChAddress={marker.Adress} ChCallNo={marker.CallNo} ChTitle={marker.Title}/> */}
                                    <Text style={{height:45, textAlignVertical:'center'}}>{marker.Title}</Text>
                                </Callout>
                            </Marker>
                        ))}
            </MapView>
            { this.state.SearchBTN && 
            <View style={{position: 'absolute', top: 215, left: this.buttonWidth}}>
                <IconButton Name={'refresh'} BTNText={"현 지도에서 검색"} onPressBTN={() => {this.onGetHeritage("1")}} BTNstyle= {UStyle.BTNStyle.Mapbutton} Textstyle= {UStyle.BTNStyle.text}></IconButton>
            </View>
            }
        </View>
         
        } 
        else{
            return  <View style={{height: this.ConHeight, backgroundColor:'white'}}>
                        <Text style={Styles.CenterTxtStyle.Text}>{'현재 위치를 검색중입니다....'}</Text>
                    </View>
        }
    };
};

export default Home;
  