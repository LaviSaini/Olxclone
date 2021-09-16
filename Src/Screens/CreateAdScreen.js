import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage,{ getDownloadURL} from '@react-native-firebase/storage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CreateAdScreen = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [year, setYear] = useState('')
    const [price, setPrice] = useState('')
    const [phone, setPhone] = useState('')
    const [image,setImage] = useState('')

    const postData = async () => {
        if (!name || !desc || !year || !price || !phone) {
            Alert.alert("Please Fill all Fields")
            return
        }
        try {
            await firestore().collection('ads')
                .add({
                    name,
                    desc,
                    year,
                    price,
                    phone,
                    image,
                    uid: auth().currentUser.uid

                })
            setName('')
            setDesc('')
            setPhone('')
            setPrice('')
            setYear('')
            Alert.alert("Posted Succesfully")

        } catch (err) {
            Alert.alert("Something went Wrong")
        }
    }

    const openCamera = () => {
        launchCamera({ quality: 1 }, (fileobj) => {
             console.log(fileobj.assets[0]['uri']);
             const uploadTask = storage().ref().child(`/item/${Date.now()}`).putFile(fileobj.assets[0]['uri'])
            uploadTask.on('state_changed',
                (snapshot) => {
                   
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress == 100){
                        alert("Image Uploaded")
                        setImage('')
                    }
                    
                },
                (error) => {
                    alert("Something went wrong")
                },
                () => {
                   
                    uploadTask.snapshot.ref.getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImage(downloadURL)
                    });
                }
            );
            
        }
        );
    }

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>

            <Text style={styles.text}>Create Ad! </Text>
            <TextInput
                style={{ paddingVertical: 2 }}
                mode='outlined'
                label="Ad Title"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={{ paddingVertical: 2 }}
                mode='outlined'
                numberOfLines={3}
                multiline={true}
                label="Ad Description"
                value={desc}
                onChangeText={text => setDesc(text)}
            />
            <TextInput
                style={{ paddingVertical: 2 }}
                mode='outlined'
                label="Year of Purchase"
                value={year}
                keyboardType="numeric"
                onChangeText={text => setYear(text)}
            />
            <TextInput
                style={{ paddingVertical: 2 }}
                mode='outlined'
                label="Price in INR"
                value={price}
                keyboardType="numeric"
                onChangeText={text => setPrice(text)}
            />
            <TextInput
                style={{ paddingVertical: 2 }}
                mode='outlined'
                label="Your Contact Number"
                value={phone}
                keyboardType="numeric"
                onChangeText={text => setPhone(text)}
            />

            <Button
                style={{ marginVertical: 20, }}
               icon="camera"

                mode="contained" onPress={() => openCamera()}>
                <Text style={{ color: 'white' }}> Upload Image </Text>
            </Button>
            <Button
                mode="contained" 
                disabled={image? false: true}
                onPress={() => postData()}>
                <Text style={{ color: 'white' }}> Create Ad! </Text>
            </Button>


        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20
    }
})
export default CreateAdScreen
