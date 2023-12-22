import React, { useEffect, useState } from 'react';
import './expenseTracker.css';

const URL = process.env.REACT_APP_URL;
const ExpenseTracker = () => {
  const [expenseFields, setExpenseFields] = useState([{_id:'', date: '', description: '', amount: '' }]);
  const [isExpenseAdded, setIsExpenseAdded] = useState(false);
  
  const handleChange = (index, e) => {
    const updatedFields = [...expenseFields];
    updatedFields[index][e.target.name] = e.target.value;
    setExpenseFields(updatedFields);
  };

  const getTodaysDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


  const handleAddExpense = async () => {
    try {
      const lastIndex = expenseFields.length - 1;
      const lastField = expenseFields[lastIndex];
      const response = await fetch(`${URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: lastField._id,
          date: lastField.date,
          description: lastField.description,
          amount: lastField.amount,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
      console.log('Expense added successfully with ID:', responseData._id);
        console.log('Expense added successfully');
        setIsExpenseAdded(true);
        
      } else {
        console.error('Error adding expense');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  
  const handleUpdateExpense = async (index) => {
    console.log("Update button clicked");
    try {
      const clickedRecord = expenseFields[index];
      console.log("clickedRecord:"+clickedRecord);
      const response = await fetch(`${URL}/expenses/${clickedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: clickedRecord.description,
          amount: clickedRecord.amount,
        }),
      });
  
      if (response.ok) {
        console.log('Expense updated successfully');
      } else {
        console.error('Error updating expense');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleDeleteExpense = async (index) =>{
    console.log("Delete Button Clicked");
    try{
      const clickedRecord = expenseFields[index];
      const response = await fetch (`${URL}/expenses/${clickedRecord.id}`,{
        method : 'DELETE',
        headers: {
          'Content-type' : 'application/json',
        },
      });


      if (response.ok) {
        console.log('Expense deleted successfully');
        const updatedFields = [...expenseFields];
        updatedFields.splice(index, 1);
        setExpenseFields(updatedFields);
      } else {
        console.error('Error deleting expense');
      }
    }catch(error){
      console.error('An error occurred:', error);
    }
  }


  
  
  const handleAddNewField = () => {
    const newField = { date: getTodaysDate(), description: '', amount: '' };
    setExpenseFields([...expenseFields, newField]);
  };

  
  
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch(`${URL}/getexpenses`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            data.forEach(item => {
              console.log('Response id:', item);
            });
            const formattedData = data.map(item => ({
              id: item._id,
              date: new Date(item.date).toLocaleDateString('en-GB'), // Format the date
              description: item.description,
              amount: item.amount,
            }));
            setExpenseFields(formattedData);
          } else {
            // If no data exists, initialize with default values
            setExpenseFields([{ date: getTodaysDate(), description: '', amount: '' }]);
          }
        } else {
          console.error('Error fetching expense data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    
  
    fetchExpenseData();
    setIsExpenseAdded(false);
  }, [isExpenseAdded]);

  expenseFields.forEach(element =>{
    console.log("Expense fields:",element);
  })

  const onRefresh = async () => {
    try{
      const response = await fetch (`${URL}/refresh`, {
        method :'POST',
        headers : {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        console.log('Database updated successfully');
        const resetExpenseResponse = await fetch(`${URL}/getresetexpenses`);
          if(resetExpenseResponse.ok){
            const resetExpensesData = await resetExpenseResponse.json();
            setExpenseFields(resetExpensesData);
          }else{
            console.error('Error fetching reset expenses');
          }
        } else {
          console.error('Error updating database');
        }
      }catch(error){
        console.error('An error occurred:', error);
      }
    };

      
  return (
    <div className='expenseList'>
      <button className='settlementButton' onClick={onRefresh}>
        Settle
      </button>
      {expenseFields.map((field, index) => (
        <div key={index} className='expenseItem'>
          <div className='dateBox'>       
            <input
              type='text'
              name='date'
              placeholder='Enter Date'
              value={field.date}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div className='amountBox'>
          <input
              type='text'
              name='amount'
              placeholder='Enter Amount'
              value={field.amount}
              onChange={(e) => handleChange(index, e)}
              
            />
          </div>
          <div className=' descBox'>
             <input
              type='text'
              name='description'
              placeholder='Enter Description'
              value={field.description}
              onChange={(e) => handleChange(index, e)}
              
            />
          </div>
          <button className='updateButton' onClick={() => handleUpdateExpense(index)}>
            Update
          </button>
          <button className='deleteButton' onClick={() => handleDeleteExpense(index)}>
            Delete
          </button>
        </div>
      ))}
      
      <button className='addExpenseButton' onClick={handleAddExpense}>
        Add Expense
      </button>
      <div className='addNewFieldButton' onClick={handleAddNewField}>
        +
      </div>
    </div>
  );
};

const ExpenseTrackerContainer = () => {
  return <div className='expenseContainer'> <ExpenseTracker /></div>;
};

export default ExpenseTrackerContainer;
