import React from 'react'

function CoinCard({name,img,price,symbol,currencySymbol}) {
  return (
    <>
    <div className='w-[200px] h-[200px] shadow-xl m-2 flex flex-col items-center justify-center hover:scale-110 transition ease-in-out rounded-lg hover:shadow-blue-500 '>
        <div className='text-center'>
            <img src={img} alt={name} className="w-[70px] h-[70px] my-2" />
            <h1 className='my-2 font-bold text-lg'>{symbol}</h1>
            <h2 className='my-2 '>{currencySymbol}{price}</h2>
            <h2 className='my-2 '>{name}</h2>
        </div>
    </div>
    </>
  )
}

export default CoinCard