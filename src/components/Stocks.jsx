import { Button, Container, Heading, HStack, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Stocks =({updateWishlist} ) => {  

  // use state hooks for stocks with empty array
  const[stocks, setStocks] = useState([]);
  // use state hooks for loading with boolean value as true
  const[loading, setLoading] = useState(true);
  // use state hooks for country with string value 'India'
  const[country, setCountry] = useState('India');

  // useNvigate()
  const navigate = useNavigate();



// function to navigate 
const handleClick = (symbol) => {
  // navigate to /timeseries/${symbol}
  navigate(`/timeseries/${symbol}`);
}


// make a GET api call using axios to https://api.twelvedata.com/stocks?country=${country}? sending country as parameter
useEffect(() => {
  const fetchStocks = async () => {
    const {data} = await axios.get(`https://api.twelvedata.com/stocks?country=${country}?`);
    setStocks(data.data.slice(0,400));
    setLoading(false);
  }
  fetchStocks();
}, [country]);

  return (


   <Container w={'full'} maxW={'full'} mt={'2'}>
    {/* list of button for selecting different country using chakra ui react */}

    <HStack justifyContent={'space-evenly'} marginTop={'25'} m={'1'}> 
      <Button colorScheme={'blue'} onClick={() => setCountry('India')}>India</Button>
      <Button  colorScheme={'blue'}  onClick={() => setCountry('United States')}>USA</Button>
      <Button colorScheme={'blue'} onClick={() => setCountry('United Kingdom')}>UK</Button>
      <Button colorScheme={'blue'} onClick={() => setCountry('Japan')}>Japan</Button>
      <Button colorScheme={'blue'} onClick={() => setCountry('China')}>China</Button>
    </HStack>
    <Container m ={'auto'}>
        <Heading>Stocks in {country}</Heading>
      </Container>


      {
        // if loading is true then show loading else show the list of stocks
        loading ? <div>Loading...</div> :
         <HStack wrap={'wrap'} justifyContent={'space-evenly'} marginTop={'25'}>
        {
          // map through the stocks and show the details of each stock using chakra ui react
          stocks.map((stock) => (
            <VStack shadow={'2px 2px 3px blue'} minW={'329'} maxW={'329'} m={'1'} p={'3'}>
              <Heading size={'md'}>{stock.symbol}</Heading>
              <Text size={'5'}>{stock.name}</Text>

              <HStack>
                <Text>Exchange: {stock.exchange}</Text>
                <Text>mic_code: {stock.mic_code}</Text>
              </HStack>
              <HStack>
                <Text>currency: {stock.currency}</Text>
                <Text>type: {stock.type}</Text>
              </HStack>

              <HStack>
              <Button colorScheme={'blue'} onClick={()=>updateWishlist(stock) }>Add to wishlist</Button>
              <Button colorScheme={'blue'} onClick= {()=>handleClick(stock.symbol)}>timeSeries Data</Button>
              </HStack>

            </VStack>

        
          ))}
        
    
        
        </HStack>
      }

   </Container> );
};

export default Stocks