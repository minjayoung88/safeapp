import React, { useState } from 'react';
import {View, StyleSheet, Image, Text, Alert} from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import UStyle from '../../Assets/Styles/Styles'
import OpButton from '../Common/OpButton'
import AsyncStorage from '@react-native-community/async-storage';
import * as config from '../../Common/config'
import messaging from '@react-native-firebase/messaging';

// import * as KakaoLogins from '@react-native-seoul/kakao-login';
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
} from '@react-native-seoul/kakao-login';
import { ConfirmDialog } from 'react-native-simple-dialogs';

const styles = StyleSheet.create({
    TopView:{
        height:60,
        flexDirection: 'row'
    },
});

class SideBar extends React.Component {
    ConHeight = responsiveHeight(100);
    state = {
        isShowLogin : true,
        UserID : '',
        ImageUri : '',
        nickname: '',
        introduction: '',
        MBTI: '',
        interests : '',
    }

    constructor(props:any){
        super(props);
    }

    UNSAFE_componentWillReceiveProps = (props:any) => {
        if(props.navigation.state.isDrawerOpen){
            AsyncStorage.getItem("LoginCHK").then((val) => {
                if (val == null){
                    // 로그인이 안되어있다.
                    this.setState({
                        isShowLogin : true,
                    });
                }else{
                    console.log(val)
                    const chk = (val == 'False')? false : true
                    this.setState({
                        isShowLogin : !chk,
                    });
                    if (chk){
                    // 로그인이 되어있다면 ID를 가지고 DB에서 정보를 가져와 표시
                        AsyncStorage.getItem("UserID").then((val) => {
                            if (val != null){
                                this.SetUserData(val)
                            }else{
                                this.LoginKaKao()   
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    }
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }

    SetUserData = (val:string) => {
        fetch('http://jjsung.o-r.kr/myPage?userId=' + val, {
            method: 'GET'
        }).then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem("LoginCHK", 'True')
            AsyncStorage.setItem("ImageUri", responseJson.profileImageUrl)
            this.setState({
                isShowLogin : false,
                ImageUri : responseJson.profileImageUrl,
                nickname: responseJson.nickname,
                MBTI: responseJson.mbti,
                introduction: responseJson.introduction,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    LoginKaKao = () => {
        AsyncStorage.getItem("UserID").then((val) => {
            if (val == null){
                // 아이디가 존재하지 않으면 로그인으로 id를 얻어 id확인
                // 아이디가 존재하지 않는데 로그인이 가능하다면 앱을 다시 깔았다고 생각하고 토큰 다시 보냄
                login().then((token: KakaoOAuthToken) => {
                    getKakaoProfile().then((profile: KakaoProfile) => {
                        messaging().getToken().then((FirebaseToken) => {
                            fetch('http://jjsung.o-r.kr/checkSignup?id=' + profile.id + '&token=' + FirebaseToken, {
                                method: 'GET'
                            }).then((response) => response.json())
                            .then((responseJson) => {
                                if(responseJson.result){
                                    // 회원가입이 되어있다고 가정 -> 로그인
                                    AsyncStorage.setItem("UserID", profile.id)
                                    AsyncStorage.setItem("LoginCHK", 'True')
                                    this.SetUserData(profile.id)
                                }
                                else{
                                    // 회원이 아니다.
                                    Alert.alert(
                                        '회원이 아닙니다. \n회원가입창으로 이동합니다..',
                                        '',
                                        [{
                                            text: "확인",                              
                                            onPress: () => {
                                                //NavigationService.navigate('Register', {
                                                //    ID : profile.id,
                                                //    ageRange: profile.ageRange, 
                                                //    gender: profile.gender,
                                                //    nickname: profile.nickname,
                                                 //   profileImageUrl: profile.profileImageUrl
                                                //});
                                            },     
                                            style: "cancel"
                                        },],
                                    );
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                        });
                    })
                })
            }
            else{
                //ID 확인
                fetch('http://jjsung.o-r.kr/checkSignup?id=' + val + '&token=', {
                    method: 'GET'
                }).then((response) => response.json())
                .then((responseJson) => {
                    login().then((token: KakaoOAuthToken) => {
                        getKakaoProfile().then((profile: KakaoProfile) => {
                            if(responseJson.result){
                                // 회원가입이 되어있다고 가정 -> 로그인
                                this.SetUserData(profile.id)
                            }
                            else{
                                // 회원이 아니다.
                                Alert.alert(
                                    '회원이 아닙니다. \n회원가입창으로 이동합니다..',
                                    '',
                                    [{
                                        text: "확인",                              
                                        onPress: () => {
                                            /* NavigationService.navigate('Register', {
                                                ID : profile.id,
                                                ageRange: profile.ageRange, 
                                                gender: profile.gender,
                                                nickname: profile.nickname,
                                                profileImageUrl: profile.profileImageUrl
                                            }); */
                                        },     
                                        style: "cancel"
                                    },],
                                );
                            }
                        })
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }

    signInWithKakao = async () => {
        // 회원가입
        AsyncStorage.getItem("UserID").then((val) => {
            if (val == null){
                login().then((token: KakaoOAuthToken) => {
                    getKakaoProfile().then((profile: KakaoProfile) => {
                        messaging().getToken().then((FirebaseToken) => {
                            fetch('http://jjsung.o-r.kr/checkSignup?id=' + profile.id + '&token=' + FirebaseToken, {
                                method: 'GET'
                            }).then((response) => response.json())
                            .then((responseJson) => {
                                if(responseJson.result){
                                    // 회원가입이 되어있다고 가정 -> 로그인
                                    AsyncStorage.setItem("UserID", profile.id)
                                    AsyncStorage.setItem("LoginCHK", 'True')
                                    this.SetUserData(profile.id)
                                }
                                else{
                                    // console.log(profile.ageRange)
                                   /*  NavigationService.navigate('Register', {
                                        ID : profile.id,
                                        ageRange: profile.ageRange, 
                                        gender: profile.gender,
                                        nickname: profile.nickname,
                                        profileImageUrl: profile.profileImageUrl
                                    }); */
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                        })
                    })
                })   
            }else{
                //ID 확인
                fetch('http://jjsung.o-r.kr/checkSignup?id=' + val + '&token=', {
                    method: 'GET'
                }).then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.result){
                        // 회원가입이 되어있다고 가정 -> 로그인
                        Alert.alert(
                            '기존 회원입니다. \n로그인을 시도합니다.',
                            '',
                            [{
                                text: "확인",                              
                                onPress: () => {
                                    login().then((token: KakaoOAuthToken) => {
                                        getKakaoProfile().then((profile: KakaoProfile) => {
                                            this.SetUserData(profile.id)
                                        })
                                    })
                                },     
                                style: "cancel"
                            },],
                        );
                    }
                    else{
                        // 회원이 아니다.
                        login().then((token: KakaoOAuthToken) => {
                            getKakaoProfile().then((profile: KakaoProfile) => {
                                 // console.log(profile.ageRange)
                                /* NavigationService.navigate('Register', {
                                    ID : profile.id,
                                    ageRange: profile.ageRange, 
                                    gender: profile.gender,
                                    nickname: profile.nickname,
                                    profileImageUrl: profile.profileImageUrl
                                }); */
                            })
                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }

    signOutWithKakao = async (): Promise<void> => {
        logout().then(() => {
            // 로그아웃하면 
            AsyncStorage.setItem('LoginCHK', 'False')
            this.setState({
                isShowLogin : true,
                UserID : '',
                nickname: '',
                MBTI: '',
                introduction: '',
            });
           
        }).catch((err) => {
            console.log(err)
        })
    };

    render() {
        return (
            <View style={{height:this.ConHeight, backgroundColor:'white'}}>
                <View style={{height: 30, backgroundColor: config.BackColor}}>
                    <Text style={{color:'white', textAlign:'center', marginTop:5, fontSize:15}}>{'마이페이지'}</Text>
                </View>
                <View style={{padding:20}}>
                    { this.state.isShowLogin &&
                        <View style={{flexDirection:'row'}}>
                            <OpButton BTNText={"회원가입"} onPressBTN={() => this.signInWithKakao()} BTNstyle= {UStyle.BTNStyle.Halfbutton} Textstyle= {UStyle.BTNStyle.text}></OpButton>
                            <OpButton BTNText={"로그인"} onPressBTN={() => this.LoginKaKao()} BTNstyle= {UStyle.BTNStyle.Halfbutton} Textstyle= {UStyle.BTNStyle.text}></OpButton>
                        </View>
                    }
                    { !this.state.isShowLogin && 
                        <View >
                            <OpButton BTNText={"로그아웃"} onPressBTN={() => this.signOutWithKakao()} BTNstyle= {UStyle.BTNStyle.Albutton} Textstyle= {UStyle.BTNStyle.text}></OpButton>
                        </View>
                    }
                    { !this.state.isShowLogin && this.state.ImageUri != '' &&
                        <Image 
                            source={{
                                uri: this.state.ImageUri
                            }} 
                            style={{width: 150, height: 150, borderRadius: 150/ 2, marginLeft: 45, marginTop: 30}} 
                        />
                    }
                    { this.state.isShowLogin &&
                        <Image 
                            source={require('../../Assets/Images/default_profile.jpg')} 
                            style={{width: 150, height: 150, borderRadius: 150/ 2, marginLeft: 45, marginTop: 30}} 
                        />
                    }
                    <Text style={{textAlign:'center', marginTop: 10}}>{this.state.nickname}</Text>
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:30}}>
                        <Text style={{textAlign:'left', width: 37, marginLeft:3}}>{'MBTI'}</Text>
                        <Text style={{textAlign:'center', borderStyle:'solid', width:180, marginLeft:15, borderWidth:1,borderColor:'lightgrey', borderRadius: 5}}>{this.state.MBTI}</Text>
                    </View>

                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:20}}>
                        <Text style={{textAlign:'left', width: 37, marginLeft:3, marginTop:10}}>{'소개'}</Text>
                        <Text style={{textAlign:'left', padding:10, borderStyle:'solid', width:180, marginLeft:15, borderWidth:1,borderColor:'lightgrey', height: 200, borderRadius: 5}}>{this.state.introduction}</Text>
                    </View>
                    {/* <OpButton BTNText={"프로필 편집"} onPressBTN={() => {}} BTNstyle= {UStyle.BTNStyle.Albutton} Textstyle= {UStyle.BTNStyle.text}></OpButton> */}
                    
                </View>
            </View> 
        );
    }
};

export default SideBar;


  