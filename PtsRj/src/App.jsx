import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(1);

  const runCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <main className="bg-black h-screen text-[#ffffff] p-10 flex justify-center items-center flex-col">
      <h1 className="text-6xl font-extrabold tracking-tighter pb-10">{counter}</h1>

      <button
        onClick={runCounter}
        className="bg-[#20B2AA] hover:bg-[#4b8885] text-white font-medium py-2 px-4 rounded-lg transition colors duration-200"
      >
        Change user
      </button>
    </main>
  );
};

export default App;
