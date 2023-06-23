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
    SelList : Array<number>;
    Editable : boolean;
 }

interface State {
    bg: Array<string>;
    TColor: Array<string>;
}
const InterestGroup = ({selBoxList, ViewStyle, returnEVT, SelList, Editable}: Props) => {
    const boxList = [];
    const bgList:Array<string> = [];
    const TColorList:Array<string> = [];

    for(let j=0; j < selBoxList.length; j++){
        if(SelList.indexOf(j) > -1){
            bgList.push(config.BackColor);
            TColorList.push("white");
            
        }else{
            bgList.push("white");
            TColorList.push("grey");
        }
    }
    const [bgStyle, SetbgStyle] = useState<State>({
        bg: bgList,
        TColor:TColorList
    });
    
    const CHGEvent = (i:number) => {
        if(Editable){
            bgStyle.bg[i] = bgStyle.bg[i] =="white"? config.BackColor : "white";
            bgStyle.TColor[i] = bgStyle.TColor[i] =="grey"? "white" : "grey";
           
            SetbgStyle({
                bg: bgStyle.bg,
                TColor: bgStyle.TColor,
            });
            //선택시
            if(bgStyle.TColor[i] == "white"){
                //Rearr.push(i);
                if(SelList.indexOf(i) < 0){
                    SelList.push(i);
                    returnEVT(SelList);
                }
               
            }else{
                if(SelList.indexOf(i) > -1){
                    SelList.splice(SelList.indexOf(i), 1);
                    returnEVT(SelList);
                }
                
            }
        }
    }

    for (let i:number = 0; i <selBoxList.length; i= i+3) {
        
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
