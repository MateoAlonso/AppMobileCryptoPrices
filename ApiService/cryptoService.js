import axios from 'axios';
import moment from "moment";
const formatSparkLine = (nums) =>{
    // Uso moment para sacar fecha en unix de hace 7 dias, de un repo
    const hace7Dias = moment().subtract(7, 'days').unix();
    let formattedSparkLine = numers.map((item, index) => {
        return{
            // este calculo no lo entendi muy bien, lo saque del mismo repo
            x: hace7Dias + (index + 1)*3600,
            y: item,
        }
    })
    return formattedSparkLine;
}

const formatMarketData = (data) => {
    let formattedData = [];
    data.forEach(item => {
       
        //lo pusheo al array formatteddata[] de arriba
        // Ya no llamo a formatSparkLine() porque desisti de hacer el grafico para entregar la app
        formattedData.push(item);
    });
    //y sale la data toda linda
    return formattedData;
}

export const getMarketData = async () =>{

    //https://api.coingecko.com/api/v3/

    //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d

    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d");
        const data = response.data;
        // mando a formatear la response al metodo de arriba
        const formattedResponse = formatMarketData(data);
        return formattedResponse;
    } catch (error) {
        console.log(error.message)
    }
}