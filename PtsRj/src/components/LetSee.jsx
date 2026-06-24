import { useState } from "react";

const LetSee = () => {
  const [number, setNumber] = useState(0);

  return (
    <main className="h-screen w-full bg-black text-white">
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number => number + 1)
      }} class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150">
        Click me
      </button>
    </main>
  );
};

export default LetSee;
