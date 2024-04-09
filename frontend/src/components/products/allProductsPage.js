import React ,{useEffect, useState} from 'react'


import {getProduct} from "../../actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router';
import Slider from '@mui/material/Slider'
import { motion } from 'framer-motion';

import ProductCard from '../layout/productCard';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate'


import { createBrowserHistory } from 'history';

export default function AllProductsPage(props) {


  const dispatch = useDispatch();

  const [currentPage,setCurrentPage] = useState(1);
  const [filterState,setFilterState] = useState('filter--box');
  const [price,setPrice]  = useState(1000000);


  const {loading,error,products,productCount,resultPerPage,filteredProductsCount} = useSelector((state)=>state.products);
  

  const totalPage = Number(Math.trunc(Math.ceil(filteredProductsCount/resultPerPage)));

  // const params = useParams()
  // console.log(params);
  

  const keyword = "";
  // console.log(keyword);  // it cannot take the keyword variable

   const setCurrentPageNo = (e) =>{
     setCurrentPage(e.selected+1);
   }
  

    const setFilter = () =>{
        if(filterState=='visibleBox')
         setFilterState('filter--box')
        else
         setFilterState('visibleBox') 
    }

    const priceHandler = (event,currentPrice) =>{
        setPrice(currentPrice)
    }

    useEffect(()=>{
      dispatch(getProduct(keyword,currentPage,price,props.category));
    },[dispatch,keyword,currentPage,price,props.category]);



  return (
    <div className = "container mx-auto max-w-screen-xl  flex flex-col  items-center justify-center ">


          <div className = "daddy flex flex-col justify-center items-center">
            <motion.button whileHover= {{scale:1.04}} className = "flex justify-center items-center gap-4 text-[2.4rem] add-to-cart h-[6.4rem] w-[300px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#fff] hover:text-[rgb(14,14,14)] mb-[4.4rem]"
            onClick = {setFilter}>
                <ion-icon name="filter-outline"></ion-icon>
                Apply Filters
            </motion.button> 
            <div className = {`flex flex-col justify-center  gap-[1.6rem] p-[2.4rem] bg-[#fbfbfb] rounded-[4rem] ${filterState} mb-[4.4rem]`}>
                            
                  <p className = "text-[2.4rem]  font-semibold">Price</p>
                                <Slider
                                 aria-label="Price"
                                 defaultValue={500}
                                         // getAriaValueText={8}

                                 onChange = {priceHandler}
                                 valueLabelDisplay="auto"
                                 step={100}
                                 marks
                                 min={100}
                                 max={30000}

                                 sx={{
                                            width: 300,
                                     color: 'rgb(14,14,14)',
                                         
                                 }}
                                    />
              </div>
            </div>



            {loading && <ReactLoading className = "container mx-auto " type={'bubbles'} color={'black'} height={667} width={375} />}
            <div class = "container  grid grid-cols-3 gap-[3.2rem] mb-[11.2rem] mx-[6.4rem]">
              {products && products.map((product) =>{
                return <ProductCard productItem = {product} />
              })}

            </div>

      



        <ReactPaginate

                className = "flex justify-center items-center gap-[3.2rem] text-[2.4rem] w-full h-auto mb-[8.8rem]"
                breakLabel="..."
                nextLabel=" >"              
                onPageChange = {setCurrentPageNo}
                marginPagesDisplayed = {resultPerPage}
                pageCount={Number(totalPage)}
                activePage = {currentPage}
                activeClassName = {"currentPage"}
                previousLabel="< "
                disabledClassName = "disabled--page"
                renderOnZeroPageCount={null}
              />
    </div>
  )
}
