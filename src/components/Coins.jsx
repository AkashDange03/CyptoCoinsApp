import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '.';
import { CoinCard, Loader } from './';
import { Link } from 'react-router-dom';

function Coins() {
  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, seterror] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1)
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const handleClick = (pagevalue) => {
    setPage(pagevalue);
    setLoading(true)
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        console.log(data);
        setCoins(data);
        setLoading(false)
      } catch (e) {
        seterror(true)
      }
    }

    fetchData()
  }, [page, currency])

  if (error) {
    return <h1 className='text-center mt-10'>Error while fetching data</h1>
  }

  const btns = new Array(132).fill(1)

  const handleChange = (e) => {
    setCurrency(e.target.value)
  }

  return (
    <>
      <div className='flex flex-col items-center  mt-4 h-full'>

        {/* Labels */}
        <div className='flex flex-row gap-4'>
          <label >
            <input type="radio"
              name="currency"
              value="inr"
              onChange={handleChange}
              className="mr-2"
              checked={ currency=== "inr"}
            />
            INR
          </label>
          <label >
            <input type="radio"
              name="currency"
              value="usd"
              onChange={handleChange}
              checked={currency === "usd"}
            />
            USD
          </label>
          <label >
            <input type="radio"
              name="currency"
              value="eur"
              onChange={handleChange}
              checked={currency === "eur"}
            />
            EUR
          </label>
        </div>

        <div className='w-[80%]  flex flex-row justify-center  flex-wrap'>
          {loading ? <Loader /> :
            Coins.map((item, index) => (
              <Link to={`/coin/${item.id}`}>
                <CoinCard name={item.name}
                id={item.id}
                img={item.image}
                key={item.id}
                price={item.current_price}
                symbol={item.symbol}
                currencySymbol={currencySymbol}
              />
              </Link>
              
            ))
          }
        </div>

        <div className='flex flex-row overflow-x-auto w-[80%] mt-4'>
          {btns.map((item, index) => (<button key={index} className='bg-black text-white py-2 px-4 mx-1' onClick={() => handleClick(index + 1)}>{index + 1}</button>))}
        </div>
      </div>
    </>

  )
}

export default Coins;