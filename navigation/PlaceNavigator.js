import React from 'react'
import { Platform } from 'react-native' 

import { COLORS } from '../constants' 

// screens
import { ImageSelector } from '../components/ImageSelector'
import { getLocation } from '../components/getLocation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


const PlaceStack = createBottomTabNavigator()

const PlaceNavigator = () => (
    <PlaceStack.Navigator
        initialRoute='Location'
        screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? COLORS.DARK_SIENNA : '',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.DARK_SIENNA,
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}
    >
        <PlaceStack.Screen
            name="Location"
            component={getLocation}
            options={{title: 'Get location'}}
        >
        </PlaceStack.Screen>
        
        <PlaceStack.Screen
            name="Foto"
            component={ImageSelector}
            options={{title: 'Take picture'}}
        >
        </PlaceStack.Screen>

    </PlaceStack.Navigator>
)


export default PlaceNavigator