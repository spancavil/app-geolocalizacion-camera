import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert} from 'react-native';
import * as Location from 'expo-location';
import {APIKEY_GOOGLE, KEY_POSITION_STACK} from '@env';
import { fetchAddresses, insertAddress } from '../db';

export const getLocation = () => {

    const API_KEY = APIKEY_GOOGLE;
    const [location, setLocation] = useState(null);
    const [mapPreview, setMapPreview] = useState (null);
    const [street, setStreet] = useState(null);
    const [streetsSaved, setStreetsSaved] = useState([])

    const getPermissionsLocation = async() => {

        console.log(API_KEY);
        const permission = await Location.requestForegroundPermissionsAsync();

        if (permission.status !== 'granted'){
            console.log(permission);
            return false
        }
        return true
    }

    const handleGetLocation = async () => {
        const isLocationOk = await getPermissionsLocation();
        //console.log(isLocationOk);
        if (!isLocationOk) return;

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
        })

        console.log(location);
        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
    }

    const convertLocation = async () => {
        const response = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${KEY_POSITION_STACK}&query=${location.lat},${location.lng}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setStreet(data.data[0])
        setMapPreview(`https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=600x300&maptype=roadmap&&markers=color:red%7Clabel:C%7C${location.lat},${location.lng}&key=${API_KEY}`) 
    }

    const saveLocation = async () => {
        const response = await insertAddress(street.label, location.lat, location.lng);
        console.log(response);
    }

    useEffect(()=> {
        
        ( async()=> {
            const response = await fetchAddresses ()
            setStreetsSaved (response.rows._array)
        })()

    }, [])

    console.log(streetsSaved);

    return (
        <View style={styles.preview}>
            {!location ?
            <TouchableOpacity onPress={()=> handleGetLocation()}>
                <Text>Get location</Text>
            </TouchableOpacity>
            :
            <>
            <Text> Latitud: {location.lat}, longitud: {location.lng} </Text>
            <TouchableOpacity onPress={()=> convertLocation()}>
                <Text>See street</Text>
            </TouchableOpacity>

            {/* PARA VER EL PREVIEW DEL MAPA */}
                <Image
                source={{uri: mapPreview}}
                style = {styles.imagen}
                ></Image>

            {street&&
                <>
                    <Text>{street.label}</Text>
                    <TouchableOpacity onPress={()=> saveLocation()}>
                        <Text>Save all in SQLite</Text>
                    </TouchableOpacity>
                </>
            }
            </>
            
            }
        </View>
    )
}

const styles = StyleSheet.create({
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,

    },
    imagen: {
        width: '100%',
        height: '100%',
    }
})
