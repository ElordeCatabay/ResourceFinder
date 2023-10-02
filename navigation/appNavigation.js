import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassword from '../screens/ForgotPassword';
import useAuth from '../hooks/useAuth';
import { ProfileScreen, SettingsScreen, Quiz, Latest } from "../screens/BottomTabNav";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, MaterialIcons,Ionicons } from '@expo/vector-icons';



export {
 
}
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}


export default function AppNavigation() {
  const {user} = useAuth();
  if(user){
    return (
      
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' screenOptions={screenOptions}>
        <Tab.Screen 
        name="Home" 
        component={HomeScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <Entypo name="home" size={30} color={focused ? "#16247d": "#111"} />
              </View>
              )
            }
          }}
        />
        <Tab.Screen 
        name="New" 
        component={Latest}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <Entypo name="new" size={30} color={focused ? "#16247d": "#111"} />
              </View>
              )
            }
          }}
        />
        <Tab.Screen 
        name="Quiz" 
        component={Quiz}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
             <Ionicons name="checkbox" size={30} color={focused ? "#16247d": "#111"}  />
              </View>
              )
            }
          }}
        />
        <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <MaterialIcons name="face" size={30} color={focused ? "#16247d": "#111"} />
              </View>
              )
            }
          }}
        />
        <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <MaterialIcons name="settings" size={30} color={focused ? "#16247d": "#111"} />
              </View>
              )
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>

  )
  }else{
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
         <Stack.Screen name="ForgotPassword" options={{headerShown: false}} component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  }
  
}