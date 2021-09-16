import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'


const AccountScreen = () => {
    const [items,setItems] = useState([])
    const [loading,setLoading] = useState(false) 
    const getDetails = async ()=>{
      const querySnap = await firestore().collection('ads')
      .where('uid','==',auth().currentUser.uid)
      .get()
      const result =  querySnap.docs.map(docSnap=>docSnap.data())
      // console.log(result)
      setItems(result)
    }
    
    
    useEffect(()=>{
        getDetails()
        return ()=>{
          console.log("cleanup")
        }
      },[])


 

      const renderItem = (item)=>{
        return(
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
              <Button labelStyle={{ color: 'white' }}>{item.price}</Button>
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
        <View style={{flex:1,paddingHorizontal:10}}>
            <View style={{height:'30%',justifyContent:"space-evenly",alignItems:"center"}}>
              <Text style={{fontSize:22}}>{auth().currentUser.email}</Text>
            <Button
         
            mode="contained" onPress={() => auth().signOut()}>
                     Logout
             </Button>
            
            
             <Text style={{fontSize:22}}>Your ads!</Text>  
            </View>
            
             <FlatList 
            data={items.reverse()}
            keyExtractor={(item)=>item.phone}
            renderItem={({item})=>renderItem(item)}
            onRefresh={()=>{
                setLoading(true)
                getDetails()
                setLoading(false)
            }}
            refreshing={loading}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
     });
export default AccountScreen
