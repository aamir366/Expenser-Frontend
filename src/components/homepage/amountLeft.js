import React, { useEffect, useState } from "react";
import axios from "axios";
import "./amountLeft.css";


const DisplayAmountLeft = () =>{
    const[amountLeft, setAmountLeft] = useState(null);
    const fetchAmountLeft = async () =>{
        try{
            const URL = process.env.REACT_APP_URL;
            const response = await axios.get(`${URL}/amount-left`);
            if(response.data){
                setAmountLeft(response.data.amountLeft);
            }else{
                setAmountLeft(null);
            }
        }catch(error){
            console.log("Error fetching latest budget:", error.message);
        }
    };

    const handleRefresh = () =>{
        fetchAmountLeft();
    };

    useEffect(() =>{
        fetchAmountLeft();
    }, []);

    return(
        <div className="displayBoxAmountLeft">
            <div className="amountLeft">
                Wallet :{" "}
                {amountLeft !== null ? ` ₹${amountLeft}` : "No Budget Data available"}
            </div>
            <div className="refreshButtonAmountLeft">
                <button className="refreshButton" onClick={handleRefresh}>
                    🔄
                </button>
            </div>
            
        </div>
        
    );
};

export default DisplayAmountLeft;




