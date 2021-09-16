import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Linking, Platform } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import ImagedCardView from "react-native-imaged-card-view";

const LisItemScreen = () => {
    const [item, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const getDetails = async () => {
        const querySnap = await firestore().collection('ads').get()
        const result = querySnap.docs.map(docSnap => docSnap.data())
        console.log(result)
        setItems(result)

    }
    const openDial = (phone) => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`)

        } else {
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

            // <ImagedCardView
            //     stars={5}
            //     reviews={456}
            //     ratings={4.5}
            //     title="Yosemite"
            //     rightSideValue="$990"
            //     subtitle="California"
            //     leftSideValue="3 Days"
            //     backgroundColor="#ff6460"
            //     source={{
            //         uri: item.image 
            //     }}
            // />
            <Card style={{ marginVertical: 10, elevation: 2, borderRadius: 30 }}>
                <Card.Cover
                    style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
                    source={{ uri: item.image }} />
                <Card.Content style={{ alignItems: 'center' }}>
                    <Paragraph style={{ fontWeight: '600', fontSize: 18, paddingVertical: 10, marginTop: 10, color: 'deepskyblue' }}>1 weak ago</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', fontSize: 30, paddingVertical: 10 }}>{item.name}</Paragraph>
                    <Paragraph style={{ fontSize: 18, fontFamily: 'sans-serif', textAlign: 'justify' }}>{item.desc}</Paragraph>
                    {/* <Paragraph><Text style={{fontWeight:'bold'}}>Year: </Text>{item.year}</Paragraph> */}
                </Card.Content>

                <Card.Actions style={{ justifyContent: 'space-evenly', flexDirection: 'row', padding: 30, marginTop: 10, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, backgroundColor: '#0960b8' }}>


                    <Button labelStyle={{ color: 'white' }}><Text>{item.price}</Text></Button>
                    <Text style={{
                        height: '100%',
                        width: 1,
                        backgroundColor: 'white',
                    }}></Text>
                    <Button labelStyle={{ color: 'white' }}>{item.year}</Button>
                    <Text style={{
                        height: '100%',
                        width: 1,
                        backgroundColor: 'white',
                    }}></Text>
                    <Button
                        labelStyle={{ color: 'white' }}
                        onPress={() => openDial()}>call seller</Button>
                </Card.Actions>
            </Card>
        )
    }
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <FlatList
                data={item.reverse()}
                keyExtractor={(item) => item.phone}
                renderItem={({ item }) => renderItem(item)}
                onRefresh={() => {
                    setLoading(true)
                    getDetails()
                    setLoading(false)
                }}
                refreshing={loading}
            />
        </View>

    )
}
export default LisItemScreen;
