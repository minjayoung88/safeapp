import React, { useRef} from 'react';
import { Animated, Image, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as config from '../../Common/config'
interface Props {
  onClickEVT_car: () => void;
  onClickEVT_fire: () => void;
  onClickEVT_shelter: () => void;
}

class SafeInfo extends React.Component<Props> {
  state = {
    enabled : false,
  }
  animation:any = new Animated.Value(0);

  _ShowIn = () => {
    this.setState({enabled: !this.state.enabled});
  }
  async componentDidMount() {
  }

render() {
    return (
      <View style={{width: 'auto'}}>
        <View style={{alignItems : 'flex-end', marginTop:3}} >
          <TouchableOpacity onPress={this._ShowIn} style={{ width: 36, alignItems:'center', height:36,  justifyContent: "center" , zIndex: 5}}>
            <Image style={{height: 30, width: 30}}  source={require('../../Assets/Images/warning.png')}/>
          </TouchableOpacity> 
        </View>
        {this.state.enabled &&
          <View style={{position: 'absolute'}}>
            <View style={{width: 180, position: 'absolute', top:3 , left: 7, height: 36, flexDirection:'row', backgroundColor:'white', opacity: 0.5, zIndex: 1}}></View>
            <View style={{width: 150, position: 'absolute', top:3 , left: 7, height: 36, flexDirection:'row', zIndex: 5}}>
              <FontAwesome5 name="car-crash" size={30} style={{marginLeft: 5}} color='blue' onPress={this.props.onClickEVT_car}/>
              <MaterialCommunityIcons name="fire-alert" size={35} style={{marginLeft: 10}} color='purple' onPress={this.props.onClickEVT_fire}/>
              <MaterialCommunityIcons name="greenhouse" size={35} style={{marginLeft: 7}} color='skyblue' onPress={this.props.onClickEVT_shelter}/>
            </View>
          </View>
        }
        </View>
    );
  }
};

export default SafeInfo;
