import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions ,Image} from 'react-native';
import { Icons } from "../assets";
import { ScreenNames } from "../navigator/screenNames";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SplashScreen = ({ navigation}) => {
 
   
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
        navigation.navigate("Main");
      }, 5000);
  
      return () => clearTimeout(timer);
    }, []);

  
    return(
        <>
        <Image source={Icons.splash} style={styles.container}/>
        
        <Image source={Icons.quivio} style={styles.image}/>
        </>
    )
}
export default SplashScreen;
const styles=StyleSheet.create({
   
    container:
    {
        width:windowWidth,
        height:windowHeight,
    },
    image:
    {
        width:200,
        height:69,
        marginTop:372,
        marginLeft:97,
        position:'absolute',
    },
})