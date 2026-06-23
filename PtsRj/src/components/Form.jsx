import {useState} from 'react'

const Form = () => {

  const [name, setName] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    cconsole.log(`Hello, ${e.target.value}`)
  };

  return (
    <main className="bg-black text-white h-screen w-full p-10">
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <input
        value={name}
          className="bg-white mb-5 text-black rounded-l px-4 py-2 "
          type="text"
          placeholder="Enter Your name"
        />
        <button className="bg-emerald-600 text-shadow-white p-2  rounded">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Form;
