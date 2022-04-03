import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from './screens/Home'
import TestScreen from './screens/Test'
import ResultsScreen from './screens/Results'
import SplashScreen from 'react-native-splash-screen'
import {LogBox } from 'react-native'
LogBox.ignoreLogs(['Reanimated 2'])
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'
import fileDownload from 'js-file-download'




NetInfo.fetch().then((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
});

const unsubscribe = NetInfo.addEventListener((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
});


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Pobierz" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
}


const MyStack = () => {
    SplashScreen.hide();

    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />
            }>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Results" component={ResultsScreen} />
                <Drawer.Screen name="Test #1" component={TestScreen} initialParams={{ajdi: '61316f7f99149c1a92250e46'}} />
                <Drawer.Screen name="Test #2" component={TestScreen} initialParams={{ajdi: '61316f7f99149c1a92250e43'}} />
                <Drawer.Screen name="Test #3" component={TestScreen} initialParams={{ajdi: '61316f7f99149c1a92250e44'}} />
                <Drawer.Screen name="Test #4" component={TestScreen} initialParams={{ajdi: '61316f7f99149c1a92250e45'}} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;