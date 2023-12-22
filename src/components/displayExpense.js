import React, { useEffect, useState } from "react";
import axios from "axios";
import "./displayExpense.css";

const DisplayExpense = () =>{
    const[expenseAmount, setexpenseAmount] = useState(null);
    const fetchExpenseAmount = async () =>{
        try{
            const URL = process.env.REACT_APP_URL;
            const response = await axios.get(`${URL}/expenseamount`);
            if(response.data){
                setexpenseAmount(response.data.amount);
                
            }else{
                setexpenseAmount(null);
            }
        }catch(error){
            console.log("Error fetching latest budget:", error.message);
        }
    };

    const handleRefresh = () =>{
        fetchExpenseAmount();
    };

    useEffect(() =>{
        fetchExpenseAmount();
    }, []);

    return(
        <div className="displayExpenseBox">
            <div className="expenseAmount">
                Expense  :{" "}
                {expenseAmount !== null ? ` ₹${expenseAmount}` : "No Budget Data available"}
            </div>
            <div className="refreshButtonExpense">
                <button className="refreshButton" onClick={handleRefresh}>
                    🔄
                </button>
            </div>
            
        </div>
        
    );
};

export default DisplayExpense;




