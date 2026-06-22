// import React from 'react'

const App = () => {
  var user = "Ayush";

  const changeUser = () => {
    console.log(`Hello, ${user}`)
  }

  return (
    <main className="bg-black h-screen text-white p-10">
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">Hello, {user}</h1>
      <button onClick={changeUser} className="bg-[#20B2AA] hover:bg-[#4b8885] text-white font-medium py-2 px-4 rounded-lg transition colors duration-200">
        Change user
      </button>
    </main>
  );
};

export default App;
