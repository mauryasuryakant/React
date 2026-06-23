import {useState} from 'react'

const LetSee = () => {

    const [number, setNumber] = useState(0)

  return (
    <main className='h-screen w-full bg-black text-white'>
        <h1>
        {number}
        </h1>
    </main>
  )
}

export default LetSee