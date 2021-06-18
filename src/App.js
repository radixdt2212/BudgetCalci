import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { Alert } from "./components/Alert";
import { v1 as uuid } from "uuid";

// const initialExpenses = [
//   {
//     id: uuid(),
//     charge: "rent",
//     amount: 1600,
//   },
//   {
//     id: uuid(),
//     charge: "Car Payment",
//     amount: 400,
//   },
//   {
//     id: uuid(),
//     charge: "Credit Card Bill",
//     amount: 1200,
//   },
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // ******** STATE VALUES ********
  // All Expenses, add expense
  const [expenses, setExpense] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("use effect called");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ******** FUNCTIONALITY ********
  // handle Charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // handle amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpense(tempExpenses);
        setEdit(false);

        handleAlert({ type: "success", text: "item edit" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpense([...expenses, singleExpense]);

        handleAlert({ type: "success", text: "item added" });
      }
      // set charge back to empty string
      setCharge("");
      // set amount back to zero
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero`,
      });
    }
  };
  //Clear all Items
  const clearItems = () => {
    setExpense([]);
    handleAlert({
      type: "success",
      text: "All items cleared",
    });
  };
  const handleDelete = (id) => {
    const item = expenses.find((item) => item.id === id);
    const tempExpenses = expenses.filter((item) => item.id !== id);
    setExpense(tempExpenses);

    handleAlert({
      type: "success",
      text: item.charge + " deleted",
    });
  };
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expense={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseFloat(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
