import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '.';
import { ExchangeCard, Loader } from './';


function Exchanges() {
  const [Exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, seterror] = useState(false);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false)
      }catch(e){
        seterror(true)
      }        
      }

    fetchData()
  }, [])

  if (error) {
    return <h1 className='text-center mt-10'>Error while fetching data</h1>
  }

  return (
    <div className='flex flex-row justify-center mt-4 h-full'>
      <div className='w-[80%] h-[100vh] flex flex-row justify-center  flex-wrap'>
        {loading ? <Loader /> :
          Exchanges.map((item, index) => (
            <ExchangeCard name={item.name}
              img={item.image}
              rank={item.trust_score_rank}
              url={item.url}
              key={index}
            />
          ))
        }
      </div>
    </div>

  )
}

export default Exchanges