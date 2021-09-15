import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text,Alert, Image, StyleSheet, ImageBackground,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput,Button } from 'react-native-paper';
import Signup from './Signup';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = async () => {
        if (!email || !password) {
            Alert.alert("Email and Password should not be empty")
            return
        }
        try {
            const result = await auth().signInWithEmailAndPassword(email, password)
            console.log(result.user)
        } catch (err) {
            Alert.alert("Something went Wrong")
        }
    }


    return (
        <KeyboardAvoidingView behavior="position">
            <ImageBackground
                style={{ width: '100%', justifyContent: 'center', paddingVertical: 20, }}
                resizeMode='cover'
                source={require('../Assets/gradient.png')}
            >
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ height: 200, width: 200 }}
                        source={require('../Assets/logo1.png')}
                    />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingTop: 20 }}>LogIn Yourself</Text>
            </ImageBackground>
            <View style={styles.box2}>
                <TextInput
                    style={{ paddingVertical: 10 }}
                    mode='outlined'
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    mode='outlined'
                    label="Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <Button
                style={{marginVertical:20,}}
                mode="contained" onPress={()=>userLogin()}>
                   <Text style={{color:'white'}}> LogIn </Text>
                </Button>
                <TouchableOpacity
                onPress={()=>navigation.navigate("SignUp")}
                >
                    <Text style={{color:'blue',fontSize:16,fontWeight:'700',textAlign:'center'}}>Don't have a account? Create Account</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    box2: {
        paddingHorizontal: 40,
        height: "50%",

    }
})

export default Login;


