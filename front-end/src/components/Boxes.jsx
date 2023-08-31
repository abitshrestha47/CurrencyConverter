import cc from 'currency-codes';
import { useEffect, useState } from 'react';

const Boxes = () => {
    const [country,setCountry]=useState({});
    useEffect(()=>{
        console.log(cc);
        setCountry(cc.data);
        console.log(country);
    });
  return (
    <>
      <div className="container">
        <h1>Currency Converter</h1>
        <div className="convertBox">
          <input type="text" />
          <div className="line">
            <select name="from" id="from">

            </select>
          </div>
        </div>
        <div className="convertBox">
          <input type="text" />
          <div className="line">
            <select name="from" id="from"></select>
          </div>
        </div>
      </div>
    </>
  );
};
export default Boxes;
