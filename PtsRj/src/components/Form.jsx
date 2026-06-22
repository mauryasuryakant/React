// import React from 'react'

const Form = () => {
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(`Hello, ${e}`)
  };

  return (
    <>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <input
          className="bg-white mb-5 text-black rounded-l px-4 py-2 "
          type="text"
          placeholder="Enter Your name"
        />
        <button className="bg-emerald-600 text-shadow-white p-2  rounded">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
