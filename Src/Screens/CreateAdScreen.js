import React, { useState } from 'react'
import { View, Text, StyleSheet ,KeyboardAvoidingView} from 'react-native'
import { TextInput, Button } from 'react-native-paper';

const CreateAdScreen = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [year, setYear] = useState('')
    const [price, setPrice] = useState('')
    const [phone, setPhone] = useState('')
    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
        
            <Text style={styles.text}>Creat Ad! </Text>
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
                
                mode="contained" onPress={() => console.log('Pressed')}>
                <Text style={{ color: 'white' }}> Upload Image </Text>
            </Button>
            <Button
                mode="contained" onPress={() => console.log('Pressed')}>
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
