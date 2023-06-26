import React from 'react';
import {Image, Text, View, TouchableHighlight} from 'react-native'
import * as config from '../../Common/config'
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UStyle from '../../Assets/Styles/Styles';

interface Props {
    icon : string,
    lan : Double,
    log : Double,
    Name: string;
    CallNo: string,
    Adress: string,
    onPressBTN? : () => void;
}
class RegionComp extends React.Component<Props> {
    state = {
        ImageWidth: 0,
        ImageHeight: 0,
        returnView: <></>
    }
    ConWidth = responsiveWidth(100) - 30
    
    render() {
        return (
            <View style={{height: 95, width: this.ConWidth, padding: 20, marginBottom:10}} >
                <TouchableHighlight activeOpacity={0.9} underlayColor={config.BackColor} style={{height: 85, width: this.ConWidth - 10, borderRadius: 10}} onPress={this.props.onPressBTN}>
                    <View style={UStyle.Regionstyle.Region_View}>
                        <MaterialIcons name={this.props.icon} style={{marginTop: 7, marginLeft:7}} size={18}></MaterialIcons>
                        <View>
                            <Text style={{fontSize: 15, marginLeft: 10, width: this.ConWidth, color: config.BackColor, fontWeight: 'bold'}}>{this.props.Name}</Text>
                            <Text style={{fontSize: 12, marginLeft: 10, width: this.ConWidth, marginTop: 5}}>{this.props.Adress}</Text>
                            <Text style={{fontSize: 12, marginLeft: 10, width: this.ConWidth, marginTop: 5}}>{this.props.CallNo}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
};

export default RegionComp;
