import React, { useState } from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Alert} from 'react-native'
import SelBox from '../Common/SelBox';
import * as config from '../../Common/config'

const styles = StyleSheet.create({
    SelView: {
      flexDirection: 'row',
      marginLeft : 10,
      marginRight : 10,
    }
});

 interface Props {
    selBoxList: Array<string>;
    ViewStyle : StyleProp<ViewStyle>;
    returnEVT : (arr:Array<number>) => void;
    Editable : boolean;
    SelList : Array<number>;
 }

interface State {
    bg: Array<string>;
    TColor: Array<string>;
}
const InterestGroup = ({selBoxList, ViewStyle, returnEVT, Editable, SelList}: Props) => {
    const boxList = [];
    const bgList:Array<string> = [];
    const TColorList:Array<string> = [];

    const [bgStyle, SetbgStyle] = useState<State>({
        bg: bgList,
        TColor:TColorList
    });

    for(let j=0; j < selBoxList.length; j++){
        if(j == 0){
            bgList.push(config.BackColor);
            TColorList.push("white");
            
        }else{
            bgList.push("white");
            TColorList.push("grey");
        }

        if(SelList.indexOf(j) < 0 && bgStyle.bg[j] != "white"){
            SelList.push(j);
            returnEVT(SelList);
        }
    }
    
    const CHGEvent = (i:number) => {
        if(Editable){
            if(bgStyle.bg[i] =="white"){
                bgStyle.bg[i] = config.BackColor;
                bgStyle.TColor[i] = "white";
                if(SelList.indexOf(i) < 0){
                    SelList.push(i);
                    returnEVT(SelList);
                }
            }else {
                if(SelList.length > 1){
                    bgStyle.bg[i] = "white";
                    bgStyle.TColor[i] = "grey";

                    if(SelList.indexOf(i) > -1){
                        SelList.splice(SelList.indexOf(i), 1);
                        returnEVT(SelList);
                    }
                }
            }
           
            SetbgStyle({
                bg: bgStyle.bg,
                TColor: bgStyle.TColor,
            });
        }
    }

    for (let i:number = 0; i <selBoxList.length; i= i+2) {
        
        boxList.push(
            <View style={styles.SelView} key={i.toString() + 'View'}>
                <SelBox ViewStyle={ViewStyle} key={i.toString()} StyleList={[bgStyle.bg[i], bgStyle.TColor[i]]}  TXTholder={selBoxList[i]} TXTkey ={i.toString()} 
                    BoxWidth = {83} iconName='hotel'
                    TouchEvt={() => {CHGEvent(i)}}/>
                <SelBox ViewStyle={ViewStyle} key={(i+1).toString()} StyleList={[bgStyle.bg[(i+1)], bgStyle.TColor[(i+1)]]}  TXTholder={selBoxList[(i+1)]} TXTkey ={(i+1).toString()} 
                    BoxWidth = {95} iconName='restaurant'
                    TouchEvt={() => {CHGEvent(i+1)}}/>
            </View>
        )
        
    }

    return (
        <View>
            {boxList}
        </View>
    );
};

export default InterestGroup;
