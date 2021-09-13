import React from 'react';
import { View, Text, Image,StyleSheet,ImageBackground } from 'react-native';

const Login = () => {
    return (
        <View style={styles.LoginContainer}>
            <ImageBackground
            style={{width:'100%',justifyContent:'center',paddingVertical:20,}}
            resizeMode='cover'
            source={require('../Assets/gradient.png')}
            >
        <View style={{alignItems:'center'}}>
            <Image
            style={{height:200,width:200}}
                source={require('../Assets/logo1.png')}
            />
        </View>
        </ImageBackground>
        <View>
            <Text>Hello LOgin</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    LoginContainer:{
                flex:1
    }
})

export default Login;


