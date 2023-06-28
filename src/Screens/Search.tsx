import * as React from 'react';
import { View } from 'react-native';
import { responsiveWidth } from "react-native-responsive-dimensions";
import Styles from "../Assets/Styles/Styles";
import {Picker} from '@react-native-community/picker';
import * as config from '../Common/config'
import Feather from 'react-native-vector-icons/Feather';

const Search = () => {

  const [selsi, setSelsi] = React.useState('강원도');
  const [selsigun, setSelsigun] = React.useState('전체');
  const [region2, setRegion2] = React.useState(["전체", "강릉시","고성군","삼척시","속초시","양양군","토성군","평창군","홍천군","횡성군","원주시","춘천시"]);

  let serviceItems1 = config.SiList.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} />
  });
  let serviceItems2 = region2.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
  });
  return (
    <View style={{width: responsiveWidth(100)}}>
        <View style={{flexDirection : "row", marginTop:15, marginLeft: 30}}>
          <View style={Styles.Pickstyle.Picker_View}>
            <Picker enabled={true} style={[Styles.Pickstyle.Picker_style, {fontFamily: config.TFont}]} selectedValue={selsi}
              //onValueChange={(itemValue:string) =>{setSelsi(itemValue);}}
              >
              {serviceItems1}
            </Picker>
          </View>
          <View style={Styles.Pickstyle.Picker_View}>
            <Picker enabled={true} style={[Styles.Pickstyle.Picker_style, {fontFamily: config.TFont}]} selectedValue={selsigun}
              //onValueChange={(itemValue) =>setSelsigun(itemValue)}
              >
              {serviceItems2}
            </Picker>
          </View>
          <Feather name="search" color="black" size={30} style={{marginTop:5}} onPress={() => {}}/>
        </View>
    </View>
  );
};

export default Search;
