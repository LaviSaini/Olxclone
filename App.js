import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer ,DefaultTheme as DefaultThemeNav} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

import Login from './Src/Screens/Login';
import Signup from './Src/Screens/Signup';
import CreateAdScreen from './Src/Screens/CreateAdScreen';
import LisItemScreen from './Src/Screens/LisItemScreen';
import AccountScreen from './Src/Screens/AccountScreen';
const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
    //  accent: '#f1c40f',
  },
};

const MyTheme = {
  ...DefaultThemeNav,
  colors: {
    ...DefaultThemeNav.colors,
    backgroundColor: '#FFFFFF',
  },
};
const Stack = createStackNavigator()
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={Signup} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}
const Tab = createBottomTabNavigator();
const Tabnavigator = () => {
  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'List Item') {

            iconName = "list"

          } else if (route.name === 'Create') {
            iconName = "plus-circle"
          } else if (route.name === 'Account') {
            iconName = "user"
          }

          // You can return any component that you like here!

          return <Feather name={iconName} size={30} color={color} />


        },
        tabBarStyle: {
          backgroundColor: '#0D063D',
        },

      })}
      tabBarOptions={{
        swipeEnabled: false,
        tabBarPosition: 'bottom',
        activeTintColor: '#8888f7',
        inactiveTintColor: '#f0f0f0',
        keyboardHidesTabBar: true,
      }}

    >
      <Tab.Screen name="List Item" component={LisItemScreen} options={{ headerShown: false, title: '' }} />
      <Tab.Screen name="Create" component={CreateAdScreen} options={{ headerShown: false, title: '' }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false, title: '' }} />
    </Tab.Navigator>
  )
}

const Navigation = () => {
  const [user, setUser] = useState('')
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userExist) => {

      if (userExist) {
        setUser(userExist)
      } else {

        setUser('')
      }
    })

    return unsubscribe
  }, [])
  return (
    <NavigationContainer MyTheme={MyTheme}>
      {user ? <Tabnavigator /> : <AuthStack />}
    </NavigationContainer>
  )
}
const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="deepskyblue" />
        <View style={styles.container}>
          {/* <Login /> */}
          {/* <Signup/> */}
          {/* <CreateAdScreen/> */}
          {/* <LisItemScreen /> */}
          <Navigation />
        </View>
      </PaperProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
}
)
export default App;