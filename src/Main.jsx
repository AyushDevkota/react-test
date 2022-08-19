import React from "react";
import "./App.css";
import { useData } from "./Context";

const calculateTotal = (data, property) =>
  data.reduce((acc, value) => acc + parseFloat(value[property]), 0).toFixed(2);

const Main = () => {
  const { month } = useData();
  const totalAHours = calculateTotal(month, "actual_hour");
  const totalCHours = calculateTotal(month, "contract_hour");
  const totalAdHours = calculateTotal(month, "adjustment_hour");

  const handleClicked = (x) => console.log(x);

  return (
    <main className="main">
      <table className="table">
        <tr className="table__heading">
          <th>Month</th>
          <th>Contract Hours</th>
          <th>Actual Hours</th>
        </tr>
        {month.map((x) => (
          <tr
            key={x.month}
            className="table__spacing"
            onClick={() => handleClicked(x)}
          >
            <td>{x.month}</td>
            <td>
              <p>{x.contract_hour}</p>
              <p className={`${x.adjustment_hour < 0 ? "red" : "green"}`}>
                {x.adjustment_hour}
              </p>
            </td>
            <td>{x.actual_hour}</td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>
            <p>{totalCHours}</p>
            <p className={`${totalAdHours < 0 ? "red" : "green"}`}>
              {totalAdHours}
            </p>
          </td>
          <td>{totalAHours}</td>
        </tr>
      </table>
    </main>
  );
};

export default Main;
