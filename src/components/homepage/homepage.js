import React, {useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./homepage.css"
import AddBudget from "./addBudget";
//import DisplayBudget from "./displayBudget";
import ExpenseTrackerContainer from "./expenseTracker";
import DisplayExpense from "../displayExpense";
import DisplayAmountLeft from "./amountLeft";




const Homepage = ({setLoginUser}) =>{
    const location = useLocation();
    const userName = location.state ? location.state.userName : "";

    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
      // Load the user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
      setLoggedInUser(storedUser);
      console.log("loggedInUser:",storedUser.name);
    }, []);
    
    

    const handleBudgetAdded = async (amount) =>{
      console.log("Budget Amount Added");
    };

    const handleLogout = () =>{
      console.log("Logging out...", loggedInUser ? loggedInUser.name : "No user");
      localStorage.removeItem("loggedInUser");
      setLoginUser({});
    };

    if (loggedInUser === null) {
      return <div>Loading...</div>;
    }

    return(
        <div className="homepage">
            <h1>Hello, {userName || loggedInUser.name}</h1>
            <AddBudget onBudgetAdded={handleBudgetAdded} />
            {/*<DisplayBudget/>*/}
            <ExpenseTrackerContainer/>
            <DisplayExpense/>
            <DisplayAmountLeft/>
            
                 
            <div className="button" onClick={handleLogout}>
              Logout
            </div>
      </div>
    );
};

export default Homepage;





