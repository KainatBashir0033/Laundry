import React,{useState,useRef,useEffect,useContext} from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {colors,parameters,title} from '../styles';
import Swiper from 'react-native-swiper';

// import auth from '@react-native-firebase/auth'
export default function Main({navigation}) {

  const navigateToSignIn = () => {
    navigation.navigate("Login");
  };

  const navigateToCreateAccount = () => {
    navigation.navigate("Register"); // Assuming "SignUp" is the screen name for creating an account
  };
    
    return(

    <View style = {{flex:1}}>
        <View style = {{flex:3 , justifyContent:'flex-start',alignItems:'center',paddingTop:35}}>

          <Text style={{fontSize:24 , color:"#318CE7" , fontWeight:'bold' , marginTop:50}}>   Get your clothes laundered </Text>
          <Text style={{fontSize:26 , color:"#318CE7" , fontWeight:'bold'}}>in your area</Text>
        </View>

        <View style = {{flex:4 , justifyContent:"center"}}>
           <Swiper autoplay = {true}>
            <View style = {styles.slide1}>
                <Image
                source = {{uri:"https://img.freepik.com/premium-photo/laundry-room-with-washing-machine-stack-laundry_916191-11746.jpg"}}
                style = {{height:"100%" , width:"100%"}}
                />
            </View>

            <View style = {styles.slide2}>
                <Image
                source = {{uri:"https://img.freepik.com/premium-photo/pile-laundry-towels-messy-room-with-washing-machine-background_916191-11731.jpg"}}
                style = {{height:"100%" , width:"100%"}}
                />
            </View>

            <View style = {styles.slide3}>
                <Image
                source = {{uri:"https://img.freepik.com/premium-photo/laundry-day-scene-laundry-room-with-dirty-clothes-washing-machine_893571-15876.jpg"}}
                style = {{height:"100%" , width:"100%"}}
                />
            </View>

            <View style = {styles.slide4}>
                <Image
                source = {{uri:"https://www.marthastewart.com/thmb/AVqH07IT5Jmh5quflvPkSN9uQdE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/always-was-separate-when-doing-laundry-getty-0823-d022299c8de44f418d856a231cf9c4f6.jpg"}}
                style = {{height:"100%" , width:"100%"}}
                />
            </View>

            <View style = {styles.slide5}>
                <Image
                source = {{uri:"https://www.marthastewart.com/thmb/CeZ5O9orz2wW7x4nEr9Ip1DMvX4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/woman-doing-laundry-washing-machine-getty-0619-f813913b00284d4298baf9d099a3a1ee.jpg"}}
                style = {{height:"100%" , width:"100%"}}
                />
            </View>
            
           </Swiper>
        </View>
        <View style = {{flex:4}}>
            
        <View style = {{marginHorizontal:40 , marginVertical:80}}>

           <TouchableOpacity onPress={navigateToSignIn} style={parameters.styledButton}>
          <Text style={parameters.buttonTitle}>Sign in</Text>
        </TouchableOpacity>
           
           
        </View>

        <View style = {{marginTop:-55, marginHorizontal:40}}>
            <TouchableOpacity onPress={navigateToCreateAccount} style={styles.createButton}>
          <Text style={styles.createButtonTitle}>Create your account</Text>
        </TouchableOpacity>
            
        </View>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
   
    slide1: {
        flex:1,
        justifyContent:"center",

        alignItems:"center",
        backgroundColor:'white'
    },

    slide2: {
        flex:1,

        alignItems:"center",

        justifyContent:"center",
        backgroundColor:'white'
    },

    slide3: {
        flex:1,

        alignItems:"center",

        justifyContent:"center",
        backgroundColor:'white'
    },

    slide4: {
        flex:1,

        alignItems:"center",

        justifyContent:"center",
        backgroundColor:'white'
    },

    slide5: {
        flex:1,

        alignItems:"center",

        justifyContent:"center",
        backgroundColor:'white'
    },

    createButton:{
        backgroundColor:"white",
        alignContent:"center",
        alignItems:"center",
        borderRadius:12,
        borderWidth:2,
        borderColor:colors.buttons,
        height:55,
        
        
    },

    createButtonTitle:{
        color:"#318CE7",
        fontSize:19,
        fontWeight:"bold",
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    }
})