import { StyleSheet } from 'react-native';
import * as config from '../../Common/config'
import { responsiveWidth } from "react-native-responsive-dimensions";

const Regstyles = StyleSheet.create({
    ContainerView: {
        flex: 1,
        backgroundColor:'#EAEAEA'
    },
    FirstView: {
        height:30
    },
    InputView: {
        // height: 'auto',
        // marginTop: 13,
        borderWidth: 1,
        borderColor : '#D5D5D5',
        borderRadius: 7,
        // padding: 10
        paddingBottom: 10,
        paddingRight: 3,

    },
    CheckView: {
      flexDirection: 'row',
      marginTop:-10
    },
    checkbox: {
        alignSelf: "center",
        marginTop: 23,
        marginLeft: -10
    },
    label: {
        marginTop: 40,
    },
    WelcomText: {
        textAlign: 'center',
        color : 'black',
        fontSize:25,
        lineHeight: 40
    },
    IconStyle:{
        marginRight:20
    },
    LineView :{
        // borderBottomWidth : 1,
        // borderBottomColor : '#CACACA',
        height: 65
    },
    LineView1 :{
        borderBottomWidth : 1,
        borderBottomColor : '#CACACA',
        height: 65,
    }
});

const Pickstyle = StyleSheet.create({
    Picker_View: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#5F4B8B',
        height:40,
        width: 140,
        backgroundColor: 'white',
        marginRight: 15
    },
    Picker_style: {
        fontSize : 15,
        height:40,
        width: 140,
    },
 });

 const Regionstyle = StyleSheet.create({
    Region_View: {
        backgroundColor:'white', 
        height: 85, 
        width: responsiveWidth(100) - 40, 
        borderRadius: 10, 
        borderWidth:2, 
        borderColor: config.BackColor, 
        padding: 10, 
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    Home_View: {
        height: 220, 
        backgroundColor:'#888FC7', 
        flexDirection : "column",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
 });

 const btnstyle_ = StyleSheet.create({
    style1: {
        display: 'none'
    },
    style2: {
        display: 'flex'
    },
})

const SelBox = StyleSheet.create({
    View_style: {
        height : 30,
        marginLeft: 8,
        // marginLeft : 'auto',
        // marginRight : 'auto',
        // marginBottom : 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#5F4B8B',
        borderRadius :10,
        // color:'red'
    },
    View_style1: {
        height : 50,
        marginLeft : 'auto',
        marginRight : 'auto',
        marginTop: 7,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: '#D5D5D5',
        borderRadius :10
        // color:'red'
    },
    View_style2: {
        marginTop: 7,
        height : 50,
        marginLeft : 'auto',
        marginRight : 'auto',
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: '#D5D5D5',
        borderRadius :10
        // color:'red'
    },
    View_Text:{
        margin : 4,
        fontSize : 13,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

const BTNStyle = StyleSheet.create({
    Albutton: {
        borderRadius:3,
        marginRight:3,
        marginLeft:3,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#D5D5D5",
        borderWidth: 2,
        marginTop: 5,
        backgroundColor: 'white'
    },
    Rbutton: {
        borderRadius:10,
        marginRight:3,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#D5D5D5",
        borderWidth: 2,
        marginTop: 25,
        marginLeft: 18,
        marginRight: 18,
        backgroundColor: '#437eb4'
    },
    Halfbutton: {
        borderRadius:3,
        marginRight:3,
        marginLeft:3,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#D5D5D5",
        borderWidth: 2,
        marginTop: 5,
        width: 120,
    },
    Navibutton: {
        borderRadius:3,
        marginRight:3,
        marginLeft:10,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        borderWidth: 1,
        marginTop: 10,
        width: 90,
        backgroundColor: 'white'
    },
    YoutubeBTN: {
        borderRadius:3,
        marginRight:3,
        marginLeft:10,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        borderWidth: 1,
        marginTop: 10,
        width: 160,
        backgroundColor: 'white'
    },
    Mapbutton: {
        borderRadius:10,
        alignItems: "center",
        borderColor: "lightgrey",
        borderWidth: 1,
        backgroundColor: 'white',
        width: 140,
        height: 30,
    },
    delbutton: {
        width: 30,
        height: 30,
        position: 'absolute', 
        top: 25,
        right:0,
        opacity:0.8
    },
    Rtext: {
        color: "white",
        fontSize : 18,
    },
    text: {
        color: "black",
        fontSize : 13,
    },
    Selbutton: {
        marginRight:15,
        marginLeft:20,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#D5D5D5",
        borderWidth: 1,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    Seltext: {
        color: "#fff",
        fontSize : 18,
        margin: 10
    },
    Searchbutton: {
        marginRight:10,
        height: 51,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#D5D5D5",
        borderWidth: 1,
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 80
    },
});

const CenterTxtStyle = StyleSheet.create({
    Text: {
        textAlign: 'center',
        fontSize : 15,
        textAlignVertical: 'center',
        height: '90%'
    },
});

const RegisterBox = StyleSheet.create({
    View_style: {
        flexDirection:'row',
        // padding: 10
        height: 70,
    },
    Text_style: {
        fontSize: 18, 
        // padding: 15,
        width: 80,
        marginLeft: 7,
        marginTop: 6,
        paddingLeft: 7,
        marginRight: 5
    },
    TextInput_style: {
        fontSize: 18, 
        // padding: 15,
        height: 150,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: '#D5D5D5',
        borderRadius :10,
        marginTop: 20,
        backgroundColor: 'white',
        textAlignVertical: 'top',
    },
});

const SwiperStyle = StyleSheet.create({
    View_style: {
        borderColor:'lightgrey', 
        borderWidth:1, 
        height: 150
    },
    View_de_style:{
        padding: 13
    },
    Title_Text: {
        fontSize:20, 
        textAlign: 'center'
    },
    contents_Text: {
        fontSize: 15, 
        marginLeft:20, 
        marginTop: 6
    },
});

const Iconstyles = StyleSheet.create({
    IconView:{
        height:'auto',
        flexDirection: 'row',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'auto',
        marginBottom:'auto'
    },
    IconStyle:{
        textAlign:"center",
    },
    IconText_:{
        fontSize:35,
        marginTop:'auto',
        marginBottom:'auto',
        marginLeft: 50
    }
});
export default {Regstyles, SelBox, BTNStyle, CenterTxtStyle, RegisterBox, SwiperStyle, Iconstyles, Pickstyle, btnstyle_, Regionstyle};