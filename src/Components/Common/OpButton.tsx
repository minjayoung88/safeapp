import React from 'react';
import {Text, TouchableOpacity} from 'react-native'
import * as config from '../../Common/config'

 interface Props {
    BTNText : string;
    onPressBTN? : () => void;
    BTNstyle :{};
    Textstyle :{};
    Name?:string;
 }
 
const OpButton = ({BTNText, onPressBTN, BTNstyle, Textstyle, Name}: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[BTNstyle, {zIndex: 1000}]} onPress={onPressBTN}>
            <Text style={[Textstyle, {fontFamily: config.TFont}]}>{BTNText}</Text>
        </TouchableOpacity>
    );
};

export default OpButton;
