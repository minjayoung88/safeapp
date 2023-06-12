import React from 'react';
import {Text, TouchableOpacity} from 'react-native'
import * as config from '../../Common/config'
import Icon from 'react-native-vector-icons/Ionicons'

 interface Props {
    BTNText : string;
    onPressBTN? : () => void;
    BTNstyle :{};
    Textstyle :{};
    Name:string;
 }
 
const IconButton = ({BTNText, onPressBTN, BTNstyle, Textstyle, Name}: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[BTNstyle, {zIndex: 1000, flexDirection:'row'}]} onPress={onPressBTN}>
            <Icon name={Name} size={15} color={config.BackColor} style={{textAlign:"center", marginLeft: 13}} />
            <Text style={{fontFamily: config.TFont, marginLeft: 5, color:config.BackColor}}>{BTNText}</Text>
        </TouchableOpacity>
    );
};

export default IconButton;
