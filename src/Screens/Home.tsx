import React from 'react';
import {View, Text, BackHandler, Alert, SafeAreaView} from 'react-native';
// import MapInfo from '~/Components/Information/ChMapInfo';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import MapView, { PROVIDER_GOOGLE, Marker, Callout }  from "react-native-maps";
import GetLocation from 'react-native-get-location';
import Styles from "../Assets/Styles/Styles";
import { NavigationService } from '../Common';
import IconButton from '../Components/Common/IconButton';
import UStyle from '../Assets/Styles/Styles';
import { KakaoMapView } from '@jiggag/react-native-kakao-maps'

class Home extends React.Component  {
    state = {
        Curr_lan : 36.143099,
        Curr_log : 128.392905,
        latitudeDelta: 0.06, 
        longitudeDelta: 0.06,
        markers: [{
            lat: 37.59523,
            lng: 127.08600,
            markerName: 'marker'
        }],
        Ready_Lo : false,
        ConWidth : responsiveWidth(100),
        ConHeight : responsiveHeight(100) - 125,
        SearchBTN : false,
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
            console.log(parseFloat(JSON.stringify(location.latitude)));
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
        NavigationService.navigate('InfoHome', {screen: 'heritageInfo', ChId: chId}); 
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

    onGetHeritage = () => {
        //console.log('aa')
        //http://jjsung.o-r.kr/defense/bokjihouse_geoloc?latitude=36.7571865&longitude=127.2241221
        fetch('http://jjsung.o-r.kr/defense/bokjihouse_geoloc' + '?latitude=' + this.state.Curr_lan + '&longitude=' + this.state.Curr_log , {
              method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           let hrg_list = Array()
            responseJson.map((hrg: any, n:number) => {
                // console.log(hrg.chId)
                hrg_list.push({
                    //key: Number(hrg.chId),
                    lat: Number(hrg.latitude),
                    lng: Number(hrg.longitude),
                    markerName: hrg.chName
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

    static navigationOptions = {
        //headerLeft: () => <SideIcon/>,
    };

    render() {
        //if (this.state.Ready_Lo){
            return  <SafeAreaView>
            <KakaoMapView
              markerImageUrl="https://github.com/jiggag/react-native-kakao-maps/blob/develop/example/custom_image.png?raw=true"
              markerList={
                this.state.markers
              }
              width={300}
              height={500}
              centerPoint={{
                lat: this.state.Curr_lan,
                lng: this.state.Curr_log,
              }}
              onChange={(event) => {
                console.log('[onChange]', event.nativeEvent);
              }}
            />
          </SafeAreaView>
         
        //} 
        //else{
        //    return  <View style={{height: this.ConHeight, backgroundColor:'white'}}>
        //                <Text style={Styles.CenterTxtStyle.Text}>{'현재 위치를 검색중입니다....'}</Text>
        //            </View>
        //}
    };
};

export default Home;


  