import { useEffect, useRef, useState } from 'react'
import { Block } from './Block'
import './index.css'
import { getCurrencyRate } from './utils/httpClient';

function App() {
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState('0');
  const [toPrice, setToPrice] = useState('1');

  const ratesRef = useRef([]);

  useEffect(() => {
    getCurrencyRate()
      .then(data => {
        ratesRef.current = data.conversion_rates;
        if (ratesRef.current[fromCurrency] && ratesRef.current[toCurrency]) {
          onChangeToPrice('1');
        }
      })
      .catch(err => {
        console.warn(err);
      })
  }, [])

  const onChangeFromPrice = (value) => {
    const price = parseFloat(value) / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3).toString());
    setFromPrice(value.toString());
  };
  
  const onChangeToPrice = (value) => {
    const result = ratesRef.current[fromCurrency] / ratesRef.current[toCurrency] * parseFloat(value);
    setFromPrice(result.toFixed(3).toString());
    setToPrice(value.toString());
  };
  
  useEffect(() => {
    if (ratesRef.current[fromCurrency]) {
      onChangeFromPrice(fromPrice);
    }
  }, [fromCurrency]);

  useEffect(() => {
    if (ratesRef.current[toCurrency]) {
      onChangeToPrice(toPrice);
    }
  }, [toCurrency]);
  
  return (
    <div className="App">
      <Block value={fromPrice} onChangeValue={onChangeFromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block value={toPrice} onChangeValue={onChangeToPrice} currency={toCurrency} onChangeCurrency={setToCurrency} />
    </div>
  )
}

export default App
