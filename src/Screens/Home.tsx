//import React from 'react';
import * as React from 'react';
import {View, Text, BackHandler, Image, SafeAreaView} from 'react-native';
// import MapInfo from '~/Components/Information/ChMapInfo';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import GetLocation from 'react-native-get-location';
import Styles from "../Assets/Styles/Styles";
import IconButton from '../Components/Common/IconButton';
import UStyle from '../Assets/Styles/Styles';
import MapView, { PROVIDER_GOOGLE, Marker, Callout }  from "react-native-maps";
import ComboBox from '../Components/Common/ComboBox';
import * as config from '../Common/config'

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
    }
    
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
            this.onGetHeritage()
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }

    markerClick = (chId:Number) => {
        //NavigationService.navigate('InfoHome', {screen: 'heritageInfo', ChId: chId}); 
    }

    async componentDidMount() {
        this.geoLocation();
        //this.props.navigation.addListener('willFocus', (route:any) => { 
        //    console.log("aaa");
        //});
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

    onGetHeritage = () => {
        //console.log('aa')
        //http://jjsung.o-r.kr/defense/bokjihouse_geoloc?latitude=36.7571865&longitude=127.2241221
        //5. /restaurant_basic (시도 및 시군구에 해당하는 복지시설 리턴)
//input : sido, sigungu

        console.log('http://jjsung.o-r.kr/defense/bokjihouseLocationNear ' + '?latitude=' + this.state.Curr_lan + '&longitude=' + this.state.Curr_log);
        fetch('http://jjsung.o-r.kr/defense/bokjihouseLocationNear?latitude=' + this.state.Curr_lan + '&longitude=' + this.state.Curr_log , {
              method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           let hrg_list = Array()
           console.log(responseJson);
            responseJson.map((hrg: any, n:number) => {
                //console.log(hrg)
                 hrg_list.push({
                     key: Number(hrg.chId),
                     latitude: Number(hrg.latitude),
                     longitude: Number(hrg.longitude),
                     CallNo: '',
                     Adress: '',
                     Title: hrg.chName
                 })
            })
            this.setState({
                markers: hrg_list,
            })
        })
        .catch((error) => {
            console.error(error);
        });
        //Alert.alert(responseJson);
    };

    ConHeight = responsiveHeight(100) - 125;
    buttonWidth = responsiveWidth(35)
    selSi:string = '';
    static navigationOptions = {
        //headerLeft: () => <SideIcon/>,
    };

    selsiReturn = (val: string) => {
        this.selSi = val;
    }

    render() {
        if (this.state.Ready_Lo){
            return  <View style={ {width: this.state.ConWidth, height: this.ConHeight, backgroundColor:'white', flex:1}}>
            <View style={{height: 200, backgroundColor:'#7bc1b2', flexDirection : "column"}}>
                <View style={{flexDirection : "row"}}>
                    <Image style={{height: 40, width: 40, marginTop:18, marginLeft:80}}  source={require('../Assets/Images/shield.png')} />
                    <Text style={{fontSize:23, color:'black', marginTop:23, marginLeft:10}}>안전한 여행도우미</Text>
                </View>
                <Text style={{fontSize:20, color:'white', marginTop:10, marginLeft:40}}>복지시설과 할인음식점을 검색해보세요.</Text>
                <ComboBox returnEVT={this.selsiReturn} enabled={true} Items={config.SiList} SelectValue={this.selSi}></ComboBox>
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
                <IconButton Name={'refresh'} BTNText={"현 지도에서 검색"} onPressBTN={() => {this.onGetHeritage()}} BTNstyle= {UStyle.BTNStyle.Mapbutton} Textstyle= {UStyle.BTNStyle.text}></IconButton>
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


  