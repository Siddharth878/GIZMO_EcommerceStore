
import React ,{useEffect,useState,useRef,useContext} from 'react'

import {useSelector,useDispatch} from "react-redux";
import MetaData from "../layout/metaData";

import {myOrders,clearErrors} from '../../actions/orderActions'
import  { AlertMessagesContext } from 'react-alert-messages';
import {motion} from "framer-motion";
import { DataGrid } from '@material-ui/data-grid';
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';

import OverlayNavbar from '../layout/overlayNavbar';


export default function MyOrders() {


    const {user} = useSelector((state)=>state.user);
    const [bg,setBg] = useState(false);
    const rows = [];


    const {loading,error,orders} = useSelector((state)=>state.myOrders);
    const { postAlertMessage } = useContext(AlertMessagesContext);
    const dispatch = useDispatch();


    const columns = [

        {
            field:"id",
            headerName:"Order ID",
            minWidth:250,
            flex:0.7
        },
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5
        },
        {
            field:"itemsQty",
            headerName:"items Qty",
            type:"number",
            minWidth:150,
            flex:0.3
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:150,
            flex:0.5
        }
        ,{
            field:'actions',
            flex:0.3,
            minWidth:150,
            headerName:'Actions',
            type:'number', // because woh side meh 3 dot left side chaiye
            sortable:false,
            renderCell:((params) =>{ 
                return (
                <Link  className = " flex justify-center items-center text-[rgb(187,187,187)] "to ={`/order/${params.getValue(params.id,'id')}`}>
                 <ion-icon class = "visible h-[3.2rem] w-[3.2rem] hover:text-[rgb(14,14,14)]"name="expand-outline"></ion-icon> 
                </Link>)
                    
            })
        }
    ]
    

  

    


    orders && 
    orders.forEach((item,index)=>{
        rows.push({
            itemsQty:item.orderItems.length,
            id :item._id,
            status:item.orderStatus,
            amount:item.totalPrice
        });
    })


   
    useEffect(()=>{
        if(error){
            postAlertMessage({text:error});
            dispatch(clearErrors());
        }

        dispatch(myOrders());
       

    },[dispatch,error]);


  return (
      <>
         <figure className = "" onClick={() => setBg((bg) => !bg)}>
         <OverlayNavbar />
         </figure>
         <MetaData title = "My - orders"/>
        <div className = {`h-screen max-w-screen-xl container mx-auto flex flex-col items-center ${bg?"blur-xl":"blue-none"} gap-[2.4rem]`}>
         <h3 className = "text-[4.4rem]">Your Orders {user?user.name:""}</h3>
         
         {loading? <ReactLoading className = "container mx-auto  max-w-screen-xl" type={'bubbles'} color={'black'} height={667} width={375} />:
         (<div className = "myOrderPage h-screen">
             <DataGrid
            //   rows = {rows}
            //   columns = {columns}
            //   pageSize = {10}
            //   disableSelectionOnClick
            //   autoHeight = {true}

            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            
            disableSelectionOnClick
            autoHeight
              />
         </div>)}
        
        </div>
    </>
  )
}
