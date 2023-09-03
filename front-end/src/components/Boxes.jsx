import cc from 'currency-codes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const currentDate=moment();
const localTimezone=moment.tz.guess();  
const localTimeNow=currentDate.tz(localTimezone);
const formattedDateTime = localTimeNow.format('MMM D, HH:mm');

const Boxes = () => {
    const [sentAmount,setSentAmount]=useState('');
    const [isfrom,setIsfrom]=useState(false);
    const [isto,setIsto]=useState(false);
    const [country,setCountry]=useState([]);
    const [generatedData,setGeneratedData]=useState({});
    const [fromCurrency,setFromCurrency]=useState('USD');
    const [toCurrency,setToCurrency]=useState('NPR');
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');
    const [tochangeCurrency,setTochangeCurrency]=useState('');
    const [changeCurrency,setChangeCurrency]=useState('');
    useEffect(()=>{
        setCountry(cc.data);
        console.log(isfrom)
        console.log(isto);
        console.log(from);
        console.log(to);
    },[country]);

    useEffect(() => {
      console.log(generatedData);
      if(isfrom){
        setTo(generatedData.new_amount);
      }
      if(isto){
        setFrom(generatedData.new_amount);
      }
  }, [generatedData]);

    const frominputChanged=(e)=>{
      setFrom(e.target.value);
      setIsto(false);
      setIsfrom(true);
      setSentAmount(e.target.value);
      setTochangeCurrency(fromCurrency);
      setChangeCurrency(toCurrency);
    }
    const toinputChanged=(e)=>{
      setTo(e.target.value);
      setIsfrom(false);
      setIsto(true);
      setSentAmount(e.target.value);
      setTochangeCurrency(toCurrency)
      setChangeCurrency(fromCurrency);
    }
    const fromCurrencyChanged=(e)=>{
      setFromCurrency(e.target.value); 
    }
    const toCurrencyChanged=(e)=>{
      setToCurrency(e.target.value);
    }
    

    //for limited api
    const generate=async ()=>{
      try{
        const response=await axios.get(`http://localhost:2000/getConverted`,{
          params:{
            sentAmount:sentAmount,
            fromCurrency:tochangeCurrency,
            toCurrency:changeCurrency
          }
        })
        console.log(response);
        const responseData=JSON.parse(response.data);
        setGeneratedData(responseData);
      }catch(err){
        console.err(`Error:,${err.message}`);
      }
    }

    //to generate based on input change too many apis (limited apis)
    // const inputChanged=async ()=>{
    //   try{
    //     const response=await axios.get(`http://localhost:2000/getConverted`,{
    //       params:{
    //         from:from,
    //         to:to,
    //         fromCurrency:fromCurrency,
    //         toCurrency:toCurrency
    //       }
    //     })
    //     console.log(response);
    //   }catch(err){
    //     console.err(`Error:,${err.message}`);
    //   }
    // }
  return (
    <>
      <div className="container">
        <h1>Currency Converter</h1>
        <p className='date'>{formattedDateTime}</p>
        <div className="convertBox">
          <input type="text" onChange={frominputChanged} name='from' value={from}/>
          <div className="line">
            <select name="from" id="from" value={fromCurrency} onChange={fromCurrencyChanged}>
              {country.map((currency,index)=>(
                <option key={index} value={currency.code}>{currency.currency}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="convertBox">
          <input type="text" onChange={toinputChanged} name='to' value={to}/>
          <div className="line">
            <select name="from" id="from" onChange={toCurrencyChanged} value={toCurrency}>
              {country.map((currency,index)=>(
                <option key={index} value={currency.code}>{currency.currency}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={generate}>Generate</button>
      </div>
    </>
  );
};
export default Boxes;
