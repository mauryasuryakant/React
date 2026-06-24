import { useState } from "react";

const Button = () => {
  let [button, setbutton] = useState("on");
  return (
    <main className="bg-black text-white h-screen w-full p-10">
      <button
        on={() => {
          setbutton(button === 'on' ? 'off' : 'on');
        }}
        className="bg-emerald-600 text-shadow-white p-2  rounded"
      >
        {button}
      </button>
    </main>
  );
};

export default Button;
