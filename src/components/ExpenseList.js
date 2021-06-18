import React from "react";
import ExpenseItem from "./ExpenseItem";
import { FiDelete } from "react-icons/fi";
export const ExpenseList = ({
  expense,
  handleEdit,
  handleDelete,
  clearItems,
}) => {
  return (
    <>
      <ul className="list">
        {expense.map((ex, index) => {
          return (
            <ExpenseItem
              key={index}
              expense={ex}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>

      {expense.length > 0 && (
        <button className="btn">
          Clear Expenses{" "}
          <FiDelete className="btn-icon" onClick={clearItems}></FiDelete>
        </button>
      )}
    </>
  );
};
