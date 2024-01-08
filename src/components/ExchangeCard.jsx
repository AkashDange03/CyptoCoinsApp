import React from 'react'

function ExchangeCard({name,img,rank,url}) {
  return (
    <>
    <div className=' w-[200px] h-[200px] shadow-xl m-2 flex flex-col items-center justify-center hover:scale-110 transition ease-in-out rounded-lg hover:shadow-blue-500 '>
        <a href={url} target="blank" className='text-center'>
            <img src={img} alt={name} className="w-[70px] h-[70px] my-2" />
            <h1 className='my-2 font-bold text-lg'>{rank}</h1>
            <h2 className='my-2 '>{name}</h2>
        </a>
    </div>
    </>
  )
}

export default ExchangeCard