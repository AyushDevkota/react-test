import React, { useState, useEffect, useContext, createContext } from "react";
import { daysInMonth, formatMonthData } from "./utils";

const dataContext = createContext({});

export const useData = () => useContext(dataContext);

function useProvideData() {
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [month, setMonth] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const x = daysInMonth();
    const monthData = data1 && data2 && formatMonthData(x, data1, data2);
    monthData && setMonth(monthData);
  }, [data1, data2]);

  const fetchData = async () => {
    const employeeRes = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/employee-tasks`
    );
    const employeeData = await employeeRes.json();
    employeeData && setData1(employeeData);
    const hoursRes = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/employee-contracted-hours`
    );
    const hoursData = await hoursRes.json();
    hoursData && setData2(hoursData);
  };
  return { month };
}

const ProvideData = ({ children }) => {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

export default ProvideData;
