import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, CheckBox, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

export default class Register extends Component {
    render(){
        return (            
        <View style={styles.containerview}>
            <View style={styles.manualLoginSection}>
                <Text style={styles.texth3}>Create an Account </Text>
                <TextInput autoCorrect={false} placeholder={'email address'} style={styles.textinput}></TextInput>
                <TextInput secureTextEntry={true} placeholder={'Password'} style={styles.textinput}></TextInput>
                <Text></Text>
                <TouchableOpacity style={styles.defaultBtn}>
                    <Text style={styles.btntext}>Create Account</Text>                
                </TouchableOpacity>
                <View>
                    <Text></Text>
                    <CheckBox value={false}></CheckBox>
                </View>
            </View>
            <View style={styles.socialLoginSection}>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.facebookbutton.bind(this)}>
                    <Text style={styles.btntext}>Signup with FaceBook</Text>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.gmailloginbutton.bind(this)}>
                    <Text style={styles.btntext}>Sign up with Gmail</Text>                
                </TouchableOpacity>
            </View>
            <View style={styles.loginFooter}>
                <TouchableOpacity style={styles.defaultLinkBtn} onPress={() => Actions.login()}>
                    <Text style={styles.defaultLinkBtnTxt}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

    async  facebookbutton() {
        console.log('check click');
        try {
            await Facebook.initializeAsync('231091068018825');
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                //user below const to hit register user 
                const userphoto=(await response.json()).photourl;
                const username=(await response.json()).name;

                Alert.alert('Signup up!', `Hi Welcome ${(await response.json()).name}!`);
            } else {
                Alert.alert('Sign Up!','cancel'); 
            }
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    }

    async gmailloginbutton(){
        try {
            const result = await Google.logInAsync({
            androidClientId: "1052279193417-fhpql5pg6ls0cfpp5brh84ul1p42f8h3.apps.googleusercontent.com",
            iosClientId: "1052279193417-iimlngbk3714duhnf3im7v1rlrotbli9.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
            });        
            if (result.type === 'success') {
                // register done
                // use below const to register user 
                const username=result.user.name;
                Alert.alert('Sign up!' , `Hi Welcome ${result.user.name}`);
            } else {
                Alert.alert('Sign up!','Cancel');
            }
        } catch (e) {
            Alert.alert('Error !', e);
        }
    }
}
const styles = StyleSheet.create({
    containerview: {
        flex: 1,
    },
    texth3:{
        fontSize:16,
        fontWeight:"bold",
        alignSelf:'center',
        marginBottom:5,
    },
    para:{
        fontSize:16,
        alignSelf:'center',
        marginBottom:20,
    },
    manualLoginSection:{
        flex:1,
        padding:50,
        paddingTop:30,
        paddingBottom:0,
    },
    socialLoginSection:{
        flex:1,
        padding:50,
        paddingTop:30,
        paddingBottom:0,
    },
    loginFooter:{
        display:'flex',
        height:50,
        backgroundColor:'#f5f5f5',
    },
    textinput:{
        backgroundColor:'#f5f5f5',
        paddingTop:10,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        marginTop:5,
    },
    defaultBtn:{
        backgroundColor:'#1565c0',
        marginTop:10,
    },
    linkBtn:{
        marginTop:10,
    },
    btntext:{
        fontSize:16,
        fontWeight:'bold',
        alignSelf:'center',
        padding:10,
        color:'#fff',       
    },
    linkbtntext:{
        fontSize:16,
        fontWeight:'bold',
        alignSelf:'center',
        padding:10,
        color:'#1565c0',
    },
    defaultLinkBtn:{
        justifyContent:'center',
        padding:15,
        flexDirection:'column',
      },
      defaultLinkBtnTxt:{
        fontSize:18,
        color:'#8e8e8e',
        textAlign:'center',
        fontWeight:'900',
        letterSpacing:0.5,
        textDecorationLine:'underline',
        fontFamily:'CabinCondensed-Regular',   
      },
});