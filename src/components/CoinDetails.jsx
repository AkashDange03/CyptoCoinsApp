import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Coins, server } from '.';
import { CoinCard, Loader,Chart } from './';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

function CoinDetails() {
    const [Coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, seterror] = useState(false);
    const [currency, setCurrency] = useState("inr");
    const [days,setDays]=useState('24h');
    const [chartArray,setChartArray]=useState([]);
    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const params = useParams();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`);
                // data:chartData this allow you to rename object name
                const {data:chartData }=await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
                setCoins(data);
                setChartArray(chartData.prices);
                setLoading(false)
            } catch (e) {
                seterror(true)
            }
        }

        fetchData()
    }, [params.id,currency])

    if (error) {
        return <h1 className='text-center mt-10'>Error while fetching data</h1>
    }


    const handleChange = (e) => {
        setCurrency(e.target.value)
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center w-[100%] mt-4 h-full'>

                <div className='w-[70%] my-4'>
                    <Chart arr={chartArray} currency={currencySymbol} days={days}/>
                </div>

                {/* Labels */}
                <div className='flex flex-row gap-4 justify-start w-[70%] mt-4'>
                    <label >
                        <input type="radio"
                            name="currency"
                            value="inr"
                            onChange={handleChange}
                            className="mr-2"
                            checked={currency === "inr"}
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

                {loading ? <Loader /> :
                    <div className='w-[100%] md:w-[70%] mt-4  flex flex-col justify-center items-center'>
                        <div className='my-2'>
                            <h1>Last Update {Date(Coins.market_data.last_updated).split("G")[0]}</h1>
                        </div>

                        <div className='my-4 ml-10 flex flex-row justify-start w-full'>
                            <img src={Coins.image.large} alt="" className='h-24 w-24' />
                        </div>

                        <div className='flex flex-col justify-start w-full pl-12 gap-4'>
                            <h1 className='text-lg'>{Coins.name}</h1>
                            <h1 className='text-lg font-bold'>{currencySymbol}{Coins.market_data.current_price[currency]}</h1>
                            <div className='flex flex-row gap-2'>
                                {
                                    Coins.market_data.price_change_percentage_24h > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />
                                }
                                <h1>{Coins.market_data.price_change_percentage_24h}%</h1>
                            </div>
                            <div>
                                <h1 className='bg-black text-white p-2 w-10'>{`#${Coins.market_cap_rank}`}</h1>
                            </div>
                            <div>
                                <ProgressBar low={`${currencySymbol}${Coins.market_data.low_24h[currency]}`} high={`${currencySymbol}${Coins.market_data.high_24h[currency]}`} />
                            </div>

                        </div>

                        <div className='my-4  pl-8 w-full'>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-lg font-bold my-1 mx-4 '>Max Supply</h1>
                                <h1 className='text-lg my-1'>{Coins.market_data.max_supply}</h1>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-lg font-bold my-1 mx-4 '>Circulating Supply</h1>
                                <h1 className='text-lg my-1'>{Coins.market_data.circulating_supply}</h1>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-lg font-bold my-1 mx-4'>Market Cap</h1>
                                <h1 className='text-lg my-1'>{currencySymbol}{Coins.market_data.market_cap[currency]}</h1>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-lg font-bold my-1 mx-4'>All Time Low</h1>
                                <h1 className='text-lg my-1'>{currencySymbol}{Coins.market_data.atl[currency]}</h1>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-lg font-bold my-1 mx-4'>All Time High</h1>
                                <h1 className='text-lg my-1'>{currencySymbol}{Coins.market_data.ath[currency]}</h1>
                            </div>
                        </div>

                    </div>

                }
            </div>
        </>
    )
}



const ProgressBar = ({ low, high }) => {
    return (
        <>
            <div className='w-full mt-4'>
                <progress className='w-full' value={50} max={100} />
                <div className='flex flex-row justify-between'>
                    <h1>{low}</h1> <h1>24H Range</h1> <h1>{high}</h1>
                </div>
            </div>
        </>
    )
}

export default CoinDetails