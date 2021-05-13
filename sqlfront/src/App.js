import logo from './logo.svg';
import './App.css';
import axios from "axios"
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = React.useState([]);
  const [idCustomer, setIDCustomer] = useState(12);
  const [Name, setName] = useState("Alex");
  const [Address, setAddress] = useState("SJ");

  const url = "http://localhost:4001/";

  useEffect(() => {
   // handleClick();
    
  }, []);

  const handleSubmit = async () => {
    const newData = {
      idCustomer,
      Name,
      Address,
    };

    try{
      await axios.post("http://localhost:4001/submit", newData);
    }catch(err){
      console.log(err)
    }
  }
  

  const handleClick = async () => {
    try{
      axios.get(url).then((res) => {
        console.log(res.data.customers);
        setData(res.data.customers)
    })
  }catch(err) {
    console.log(err);
  }

  }
  return (
    <div className="App">
     
     
      <div  className="App-header">
      <div className="list">
        <input type="text" placeholder="id" onChange={(e) => setIDCustomer(e.target.value)}></input>
        <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)}></input>
        <input type="text" placeholder="address" onChange={(e) => setAddress(e.target.value)}></input>
      </div>
      <button onClick={() => handleSubmit()}>Upload customer</button>
        <button onClick={() => handleClick()}>Click me</button>
        {data.map((data) =>
        <div className="list" key={data.idCustomers}>
          <h2>{data.idCustomers}</h2>
          <h2>{data.Name}</h2>
          <h2>{data.Address}</h2>
        </div>
        )}
      </div>
      
    </div>
  );
}

export default App;
