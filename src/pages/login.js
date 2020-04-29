import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Aler, AsyncStorage, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

export default class Login extends Component {
    render(){
        return (
        <View style={styles.containerview}>
            <View style={styles.manualLoginSection}>
                <Text style={styles.texth3}>Log In </Text>
                <Text style={styles.para}>Log in to save and sync your hard work</Text>
                <TextInput autoCorrect={false} placeholder={'email address'} style={styles.textinput}></TextInput>
                <TextInput secureTextEntry={true} placeholder={'Password'} style={styles.textinput}></TextInput>
                <TouchableOpacity style={styles.defaultBtn} onPress={() => Actions.home()}>
                    <Text style={styles.btntext}>Log In</Text>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkBtn}>
                    <Text style={styles.linkbtntext}>Forgot Password</Text>                
                </TouchableOpacity>
            </View>
            <View style={styles.socialLoginSection}>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.logInbutton.bind(this)}>
                    <Text style={styles.btntext}>Login With FaceBook</Text>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.gmailsignin.bind(this)}>
                    <Text style={styles.btntext}>Login With Gmail</Text>                
                </TouchableOpacity>
            </View>
            <View style={styles.loginFooter}>
                <TouchableOpacity style={styles.defaultLinkBtn} onPress={() => Actions.register()}>
                    <Text style={styles.defaultLinkBtnTxt}>Don't have an account? Create One</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
    async  logInbutton() {
        // alert(`Facebook Login Error:`);
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
                    Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`); 
                try {
                    await AsyncStorage.setItem("name",(await response.json()).name);
                    await AsyncStorage.setItem("imageurl", (await response.json()).photourl);
                } catch (error) {
                    Alert.alert("error",error)
                }
                Actions.home();
            } else {
                Alert.alert('Login Checked','Login cancel');
            }
        } catch ( message ) {
            Alert.alert(`Facebook Login Error: ${message}`);
        }
    }


    async  gmailsignin() {
        try {
            // now connect device i want to see if user click then thisfunction is calling or not
            console.log("check click")
            const result = await Google.logInAsync({
            // android client id
            androidClientId: "1052279193417-fhpql5pg6ls0cfpp5brh84ul1p42f8h3.apps.googleusercontent.com",
            //ios client id
            iosClientId: "1052279193417-iimlngbk3714duhnf3im7v1rlrotbli9.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });
            // check result
            if (result.type === 'success') {
                Alert.alert('Logged in!' , `Hi Welcome ${result.user.name}`);
                try {
                    //asyncstorage used to store username and profile image
                    await AsyncStorage.setItem("name",result.user.name);
                    await AsyncStorage.setItem("imageurl",result.user.photoUrl);
                } catch (error) {
                    Alert.alert("error",error)
                }
                // navigate to homepage
                Actions.home();
            } else {
                Alert.alert('Login in! cancel','Cancel');
            }
        } catch (e) {
            console.log("error",e)
            //plese run code in phone you mean siumlator no actual phone ok
            //i am using expo to run in iphone seems nothing happening
            // Alert.alert('Logged in Error !', e);  any error showimg no nothing

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