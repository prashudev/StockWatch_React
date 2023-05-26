import { Button, CardHeader, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import { Card } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const Cart = ({wishlist}) => {
  return (
    <div>
    {/* // printing socks in wishlist using chakra ui  */}
      <Card>
        <CardHeader w={'full'} justifyContent={'center'}>
          <Heading>Stocks in Your Wish list</Heading>
        </CardHeader>
        {
          wishlist.lenght===0 ? <div>Wishlist is empty</div> :
          wishlist.map((stock) => (
            <HStack bgColor={'blue.600'} w={'full'} color={'white'} justifyContent={'space-around'} h ={'6vh'} m={'2'}>
              <Heading>{stock.symbol}</Heading>
              <Text>{stock.name}</Text>
              <Text>{stock.exchange}</Text>
              <Button p={'4'} color={'blue'}><Link to ={`/timeseries/${stock.symbol}`}>time series data</Link></Button>
            </HStack>))
        }

      </Card>


    </div>
  )
}

export default Cart