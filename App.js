import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import Listitem from './components/Listitem';
import Chart from './components/Chart'
import {SAMPLE_DATA} from './assets/data/sampleData'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getMarketData } from './ApiService/cryptoService';

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style = {styles.largeTitle}>Markets</Text>
    </View>

    <View style={styles.divider}/>
  </>
)

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  
  const [data, setData] = useState([]);

 // esto lo recontra ctrl c ctrl v incareteable
 useEffect(() => {
  const fetchMarketData = async() => {
    const marketData = await getMarketData();
    setData(marketData);
  }
fetchMarketData();
}, [])

  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({item}) => (
          <Listitem
            name={item.name}
            symbol={item.symbol}
            currPrice={item.current_price}
            priceChangePct7d={item.price_change_percentage_7d_in_currency}
            logoUrl={item.image}
            sparkline7d={item.sparkline_in_7d.price}
          />
          )}
          ListHeaderComponent={<ListHeader/>}
      />
      </SafeAreaView>
  )
}

function Graph({route, navigation}) {
  const{name, logoUrl, symbol, priceChangePct7d, sparkline7d, currPrice} = route.params;
  return(
    <Chart 
    name={JSON.stringify(name)}
    logoUrl={JSON.stringify(logoUrl)}
    symbol={JSON.stringify(symbol)}
    priceChangePct7d={JSON.stringify(priceChangePct7d)}
    sparkline7d={JSON.stringify(sparkline7d)}
    currPrice={JSON.stringify(currPrice)}
    />
  );
}

export default function App() {
  return (
    // Agruegue la navegacion con las coins como los menus, y le paso a la ventana todos los datos de la coin seleccionada
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Graph" component={Graph} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleWrapper: {
    marginTop: 10,
    padding: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
});
