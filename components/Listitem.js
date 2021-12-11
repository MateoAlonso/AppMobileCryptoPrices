import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Listitem = ({name, symbol, currPrice, priceChangePct7d, logoUrl, sparkline7d}) => {

    const priceChangeColor = priceChangePct7d > 0 ? 'green' : 'red';
    const navigation = useNavigation();

    return (

        <TouchableOpacity onPress={()=>navigation.navigate("Graph", {name, logoUrl, symbol, priceChangePct7d, sparkline7d, currPrice})}>
            <View style={styles.itemWrapper}>
                
                {/*izq*/}
                <View style={styles.leftWrapper}>
                <Image
                    source={{
                        uri: logoUrl
                    }}
                    alt="icon"
                    style={styles.image}
                />
                
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
                </View>
                
                </View>
                


                {/*der*/}
                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>${currPrice.toLocaleString('en-US',{currency: 'USD'})}</Text>
                    <Text style={[styles.subtitle, {color: priceChangeColor}]}>{priceChangePct7d.toFixed(2)}%</Text>
                </View>
                    

            </View>
            
        </TouchableOpacity>
           
        
    )
}

const styles = StyleSheet.create({
    itemWrapper:{
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftWrapper:{
        flexDirection: "row",
        alignItems: "center",
    },
    image:{
        height:48,
        width: 48,
    },
    titleWrapper:{
        marginLeft: 8,
    },
    rightWrapper:{
        alignItems: "flex-end",
    },
    title:{
        fontSize: 18,
    },
    subtitle:{
        marginTop: 4,
        fontSize: 14,
        color: '#A9ABB1',
    },
});

export default Listitem
