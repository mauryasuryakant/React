import { useState } from "react";

const Test = () => {
  const [user, setUser] = useState("Ayush");

  const changeUser = (e) => {
    setUser(e);
  };

  return (
    <main className="bg-black text-white h-screen w-full flex justify-center items-center flex-col gap-2">
      <h1>Hello, {user}</h1>

      <form
        onSubmit={(e) => {
          // e.preventDefault();
          changeUser(e);
        }}
        className="flex flex-col p-5 gap-5"
      >
        <input
          onClick={(e) => {
            changeUser(e.target.value);
          }}
          // value={user}
          type="text"
          placeholder="Enter name"
        />
        <button className="bg-emerald-600 text-white rounded px-3 py-2">
          Change name
        </button>
      </form>
    </main>
  );
};

export default Test;
