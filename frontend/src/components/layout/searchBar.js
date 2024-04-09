import React ,{useState} from 'react'
import { createBrowserHistory } from "history";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productActions';
import productCard from './productCard';

export default function SearchBar() {
  
    
    const history = createBrowserHistory();
    const dispatch = useDispatch();

    const {products} = useSelector((state)=>state.products);
    let id = 0;


    
    
    
    
    
    
    
    
    const [keyword,setKeyword] = useState("Hello");
    const searchSumbithandler = (e) =>{
        
        e.preventDefault();
        
        if(keyword.trim){
            
            dispatch(getProduct(keyword));
            
            // history.push(`/products/${id}`);
            // window.location.reload(true);
            
        }else{
            history.push('/products');
        }
    }

    return (
    <div>
         <form className= "pr-[3.2rem]" onSubmit ={searchSumbithandler}>   
                          {/* <label for="default-search" className=" font-medium  sr-only ">Search</label> */}
                <div className="flex justify-center items-center gap-4 ">
                        
                        <input type="search" id="default-search" className="block text-[1.6rem] w-full p-4 pl-10 rounded-[10px]  border-none focus:none " placeholder="Search Product" required
                        
                        onChange = {
                            (e)=>{
                                setKeyword(e.target.value);
                            }
                        }
                        />

                        <button className = "cursor-pointer flex justify-center items-center" type = "sumbit" >
                            <ion-icon class = "h-[2.4rem] w-[2.4rem]" name="search-outline"></ion-icon>
                        </button>
                              
                </div>
          </form>
    </div>
  )
}
