import React from 'react';
import {Image, Text, View, TouchableHighlight} from 'react-native'
import * as config from '../../Common/config'
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UStyle from '../../Assets/Styles/Styles';

interface Props {
    create_date : string,
    location_name : Double,
    msg : Double,
}
class AlarmComp extends React.Component<Props> {
    ConWidth = responsiveWidth(100)
    render() {
        return (
            <View style={{height: 'auto', width: this.ConWidth, padding: 10, justifyContent: 'center', alignItems: 'center'}} >
                <View style={UStyle.Alarmstyle.Alarm_View}>
                    <MaterialCommunityIcons name='cellphone-message' style={{marginTop: 7, marginLeft:0}} size={18}></MaterialCommunityIcons>
                    <View style = {{marginTop: 5, marginLeft:10}}>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={UStyle.Alarmstyle.Alarm_Title}>발송 시간</Text>
                            <Text style={UStyle.Alarmstyle.Alarm_Contents}>{this.props.create_date}</Text>
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={UStyle.Alarmstyle.Alarm_Title}>발송 지역</Text>
                            <Text style={UStyle.Alarmstyle.Alarm_Contents}>{this.props.location_name}</Text>
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={UStyle.Alarmstyle.Alarm_Title}>메시지</Text>
                            <Text style={UStyle.Alarmstyle.Alarm_Contents}>{this.props.msg}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};

export default AlarmComp;
