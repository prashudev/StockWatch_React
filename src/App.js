// import BrowserRouter as Router, Route, Routes 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cart from './components/Cart';
import Nav from './components/Nav';
import Stocks from './components/Stocks';
import TimeSeries from './components/TimeSeries';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toast, useToast } from '@chakra-ui/react';


function App() {
 
// useState hook for wishlist
const [wishlist, setWishlist] = useState([]);


// useToast()
const toast = useToast();

// fetch wishlist from backend server using axios by making http call to http://localhost:3000/wishlist
useEffect(() => {
  axios
    .get('http://localhost:3000/wishlist')
    .then((res) => {
      console.log(res.data.wishlist);
      setWishlist(res.data.wishlist);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

//create a function to make api put call to http://localhost:3000/wishlist, sending wishlist as body. Which updates wishlist in backend server 
const updateWishlistInBackend = () => {
  axios
    .put('http://localhost:3000/wishlist', {wishlist: wishlist })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};




// update the wishlist
const updateWishlist = (stock) => {
  // check if item is already in wishlist
  const isItemInWishlist = wishlist.find((wishlistItem) => {
    return wishlistItem.symbol === stock.symbol;
  });

  // if item is already in wishlist, show toast
  if (isItemInWishlist) {
    toast({
      title: 'Item already in wishlist',
      description: 'You can only add an item once',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  } else {
    // if item is not in wishlist, add it to wishlist
    setWishlist([...wishlist, stock]);
  // show toast for added to wishlist
    toast({
      title: 'Added to wishlist',
      description: 'Item added to wishlist',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    updateWishlistInBackend();

  }
};


 
 
  return (
    
<div className="App">
    {/* craete routes for Cart,Stocks,timeseries component */}
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Stocks updateWishlist={updateWishlist} />} />
        <Route path="/cart" element={<Cart wishlist={wishlist} />} />
        <Route path="/timeseries/:id" element={<TimeSeries />} />
      </Routes>
    </Router>
  

</div>  
);
}

export default App;
