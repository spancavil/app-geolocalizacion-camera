import React from 'react'
import { useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { View, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
// import * as Permission from 'expo-permissions';
import { Alert } from 'react-native';

export const ImageSelector = () => {

    const [image, setImage] = useState(null)

    const getPermissions = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== "granted"){
            // Alert.alert(
            //     'Insufficient permissions',
            //     [{text: 'Ok'}]
            // )
            return false
        }
        return true
    }

    const handlerTakeImage = async () => {
        const isCameraOk = await getPermissions();
        if (!isCameraOk) return;

        const imagenTomada = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.8
        })

        console.log(imagenTomada);

        setImage(imagenTomada.uri);
        props.onImage(imagenTomada.uri)
    }

    const handlerLibrary = async () => {
            // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
  
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    return (
        <View>
            <View style={styles.preview}>
                
            { !image ? 
                <Text> Please take a picture </Text>
            :
                <Image source = {{uri: image}}
                    style = {styles.imagen}
                    resizeMode = 'cover'
                >
                </Image>
            }
            </View>
            <TouchableOpacity onPress={()=> handlerTakeImage()}>
                <Text>Take picture</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> handlerLibrary()}>
                <Text>Pic a photo from gallery</Text>
            </TouchableOpacity>
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
