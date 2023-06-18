import React from 'react';
import {View, Text} from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

class Mypage extends React.Component  {
    state = {
        result : ''
    }
    
    constructor(props:any){
        super(props);
    }
    
    async componentDidMount() {
        // this._retrieveData();
    }

    ConHeight = responsiveHeight(100) - 50;
    ConWidth = responsiveWidth(100);
    
    render() {
        return  <View>
                    <View style={{height: this.ConHeight}}>
                        <Text>{'My page'}</Text>
                    </View>
                </View> 
    };
};

export default Mypage;


  