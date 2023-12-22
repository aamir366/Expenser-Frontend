import React, { useState } from "react";
import "./addBudget.css";
import axios from "axios";

// Function to handle adding the budget
async function addBudget(budgetData, onBudgetAdded) {
  try {
    const URL = process.env.REACT_APP_URL;
    console.log("ADD BUDGET URL:", `${URL}/budget`);
    const response = await axios.post(`${URL}/budget`, budgetData);
    console.log("Budget Amount added Successfully.", response.data);
    onBudgetAdded(response.data.amount);
    console.log("Budget Amount:", budgetData.amount);
  } catch (error) {
    console.log("Error Adding budget:", error.message);
  }
}

const AddBudget = ({ onBudgetAdded }) => {
  const [budgetData, setBudgetData] = useState({
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBudgetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBudget = async () => {
    await addBudget(budgetData, onBudgetAdded);
    setBudgetData((prevData) => ({
      ...prevData,
      amount:"",
    }));
  };




  return (

        <div className="budgetAmount">
        <label>
            Budget Amount:
            <input
            type="text"
            name="amount"
            value={budgetData.amount}
            onChange={handleInputChange}
            />
        </label>
        <button className="addBudgetButton" onClick={handleAddBudget}>Add Budget</button>
        </div>
    
  );
};

export default AddBudget;
