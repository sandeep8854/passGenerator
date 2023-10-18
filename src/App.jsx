import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import { useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  function increagePassLenFn(e) {
    setLength(e.target.value);
  }

  function selectNumFn() {
    // this function give us previous access.
    setNumberAllowed((prev) => !prev);
  }

  function selectCharFn() {
    // this function give us previous access.
    setCharAllowed((prev) => !prev);
  }

  const copyPasswordOnClickboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 8);

    window.navigator.clipboard.writeText(password);
  }, [password]);
  // useCallback use for optimzation and he store in chache memory
  //  it is work for only optimazation.
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&'()*+-/:;<=>?@[]^_`{|}~";
    for (let index = 0; index < length; index++) {
      let charNum = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charNum);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    // useEffect use of only rendering the purpose.
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordOnClickboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.3 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={15}
              value={length}
              className="cursor-pointer"
              // onChange={(e) => setLength(e.target.value)}
              onChange={increagePassLenFn}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={selectNumFn}
              // onChange={increagePassLenFn}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className="cursor-pointer"
              onChange={selectCharFn}
              // onChange={increagePassLenFn}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
