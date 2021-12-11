import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const Chart = ({name, logoUrl, symbol, priceChangePct7d, sparkline7d, currPrice}) => {
    const screenWidth = Dimensions.get("window").width;
    const priceChangeColor = priceChangePct7d > 0 ? 'green' : 'red';

    // Chart es de prueba, no pude insertar los datos, quiza para el final?
    
    return (
            <View style={styles.chartWrapper}>
                <View style={styles.titlesWrapper}>
                    <View style={styles.upperTitles}>
                        <View style={styles.upperleftTitle}>
                        <Text style={styles.subtitle}>{name} ({String(symbol).toUpperCase()})</Text>
                        <Text style={styles.subtitle}> 7d</Text>
                        </View>
                        
                            <View style={styles.lowerTitles}>
                                <Text style={styles.boldTitle}>${currPrice.toLocaleString('en-US',{currency: 'USD'})}</Text>
                                <Text style={[styles.title, {color:priceChangeColor}]}> {parseFloat(priceChangePct7d).toFixed(2)}%</Text>
                            </View>
                            
                        
                    </View>
                    
                </View>

                <LineChart
                    data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                        }
                    ]
                    }}
                    width={screenWidth} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                />

            </View>
    )
}

const styles = StyleSheet.create({
    chartWrapper: {
        marginVertical: 16,
    },
    titlesWrapper: {
        marginHorizontal: 16,
    },
    upperTitles: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    upperleftTitle: {
        flexDirection: "row",
        alignItems: "center",
    },
    subtitle: {
        fontSize: 14,
        color: '#A9ABB1',
    },
    lowerTitles: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    boldTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    title: {
        fontSize: 18,
    },
    chartLineWrapper:{
        marginTop: 40,
    },
});

export default Chart
