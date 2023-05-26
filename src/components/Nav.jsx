import { Button } from '@chakra-ui/button'
import { Container, Text } from '@chakra-ui/layout'
import React from 'react'
import { HStack } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'


const Nav = () => {
  return (
    //  nav bar using react chakra ui
  <Container w={'full'} maxW={'full'} mt={'2'}>
    <HStack  bgColor={'blue.600'} justifyContent={'space-between'} marginTop={'25'} m={'1'}>
      <Text color={'whiteAlpha.900'} fontSize={'3xl'}><Link to={"/"}>StockWatch</Link></Text>
      <Button colorScheme={'blue'}>
        
        <Link to="/cart">
        Your WishList</Link></Button>
      </HStack>
  </Container>
    )
}

export default Nav