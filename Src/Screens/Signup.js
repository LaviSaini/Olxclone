import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput, Button } from 'react-native-paper';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const userSignup = async () => {
        if (!email || !password) {
            Alert.alert("Email and Password should not be empty")
            return
        }
        try {
            const result = await auth().createUserWithEmailAndPassword(email, password)
            console.log(result.user)
        } catch (err) {
            Alert.alert("Something went Wrong")
        }
        await auth().createUserWithEmailAndPassword(email, password)
        console.log(result.user)
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
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingTop: 20 }}>Signup Yourself</Text>
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
                    style={{ marginVertical: 20, }}
                    mode="contained" onPress={() => userSignup()}>
                    <Text style={{ color: 'white' }}> SIGN UP </Text>
                </Button>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ color: 'blue', fontSize: 16, fontWeight: '700', textAlign: 'center' }}>Already have a account? Go to LogIn</Text>
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

export default Signup;


