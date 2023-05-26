import { HStack, VStack } from '@chakra-ui/react';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text } from '@chakra-ui/react';

const TimeSeries = () => {

  // useParams()
  const {id} = useParams();
  // create useState for timeseries with empty array
  const [timeseries, setTimeseries] = useState([]);
  // create useState for loading with boolean as true
  const [loading, setLoading] = useState(true);
   // create useState for available with boolean as true
  const [available, setAvailable] = useState(true);


  // make a GET api call using axios to https://api.twelvedata.com/time_series?symbol=${id}&interval=1min&apikey=0975893c35e04bc59419ad713796a678 sending id as parameter
  useEffect(() => {
    const fetchTimeseries = async () => {
      const {data} = await axios.get(`https://api.twelvedata.com/time_series?symbol=${id}&interval=1min&apikey=0975893c35e04bc59419ad713796a678`);
      setTimeseries(data.values);
      setLoading(false);
      if(data.values===undefined){
      setAvailable(false);
    }
    }

    fetchTimeseries();
  }, [id]);


  return (
    <div>
      {
        // check if loading is true then show loading else show the timeseries data
        loading ? <div>Loading...</div> :
        <>
        <HStack mt={'4'} wrap={'wrap'} ml={'4'}>
          {
            // check if available is true then show the timeseries data else show the message
            available ? 
            // map the timeseries data and show time series data using chakra ui react
            timeseries.map((timeseries) => (

              <HStack shadow={'2px 2px 3px blue'} minW={'329'} maxW={'329'} m={'1'} p={'3'}>
                <VStack>
                  <HStack w="full">
                    <Text>Open:{timeseries.open}</Text>
                    <Text>Close:{timeseries.close}</Text>
                    </HStack>

                    <HStack w="full">
                    <Text>High:{timeseries.high}</Text>
                    <Text>Low:{timeseries.low}</Text>
                    </HStack>

                    <HStack w="full">
                    <Text>Date Time:{timeseries.datetime}</Text>
                    </HStack>
                </VStack>
                </HStack>)) : <div>Stock time series data not available</div>

          }
        </HStack>
        
        </>
      }
      
      </div>
  )
}

export default TimeSeries