import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Provider} from 'react-redux';
import store from './app/store';
import {setFavorites} from './features/channelSlice';

import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AllChannels from './screens/AllChannels';
import Favorites from './screens/Favorites';
import {Color} from './constants/Colors';
import ChannelDetails from './screens/ChannelDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyBottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Favorites">
      <Tab.Screen
        name="AllChannels"
        component={AllChannels}
        options={{
          headerShown: false,
          tabBarLabel: 'Alle Sender',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
          tabBarLabel: 'Favorites',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  // try to load data from async storage for favorite channels
  useEffect(() => {
    const getFavorites = async () => {
      try {
        const value = await AsyncStorage.getItem('favoriteChannels');
        if (value !== null) {
          store.dispatch(setFavorites(JSON.parse(value)));
        }
      } catch (error) {
        console.log('Can not fetch favorites from AsyncStorage');
      }
    };
    getFavorites();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Color.blue1,
            },
            headerTintColor: Color.grey5,
          }}>
          <Stack.Screen
            name="Home"
            component={MyBottomTabs}
            options={{
              title: 'A1 Radio',
            }}
          />
          <Stack.Screen
            name="Details"
            component={ChannelDetails}
            options={{
              title: 'Channel Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
