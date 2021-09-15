import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,Linking,Platform} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';


const LisItemScreen = () => {
    const [item, setItems] = useState([])
    const getDetails = async () => {
        const querySnap = await firestore().collection('ads').get()
        const result = querySnap.docs.map(docSnap => docSnap.data())
        console.log(result)
        setItems(result) 

    }
    const openDial = (phone)=>{
    if(Platform.OS === "android")
    {
        Linking.openURL(`tel:${phone}`)

    }else{
        Linking.openURL(`telprompt:${phone}`)
    }
    }
    useEffect(() => {
        getDetails()
        return () => {
            console.log("Cleanup")
        }

    }, [])

    const renderItem = (item) => {
        return (
            <Card style={{ marginVertical:10, elevation: 2 ,borderTopLeftRadius:30,borderTopRightRadius:30}}>
                 <Card.Cover 
                 style={{borderTopLeftRadius:30,borderTopRightRadius:30}}
                 source={{ uri: item.image }} />
                <Card.Title title={item.name} />
                <Card.Content>
                    <Paragraph>{item.desc}</Paragraph>
                    <Paragraph>{item.year}</Paragraph>
                </Card.Content>
              
                <Card.Actions>
                    <Button>{item.price}</Button>
                    <Button onPress={()=>openDial()}>call seller</Button>
                </Card.Actions>
            </Card>
        )
    }
    return (
        <View >
            <FlatList
                data={item}
                keyExtractor={(item) => item.phone}
                renderItem={({ item }) => renderItem(item)}
                inverted={true}
            />
        </View>

    )
}
export default LisItemScreen;
