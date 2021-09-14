import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LisItemScreen = () => {
    const myitems = [
        {
            name: 'iphone',
            year: "2013",
            phone: "9528947520",
            image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            desc: "I am selling this iphone in 7k"
        },
        {
            name: 'camera',
            year: "2013",
            phone: "9528947522",
            image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            desc: "I am selling this iphone in 7k"
        }
    ]
    const renderItem = (item) => {
        return (
            <Card style={{padding:5,elevation:2,margin:10}}>
                <Card.Title title={item.name}/>
                <Card.Content>
                  <Paragraph>{item.desc}</Paragraph>
                  <Paragraph>{item.year}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Actions>
                    <Button>200</Button>
                    <Button>Call Seller</Button>
                </Card.Actions>
            </Card>
        )
    }
    return (
        <View >
            <FlatList
                data={myitems}
                keyExtractor={(item) => item.phone}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>

    )
}
export default LisItemScreen;
