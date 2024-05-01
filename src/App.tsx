import { useState, useEffect } from "react";

type resultProps = {
  codeword: number;
  id: string;
};

export default function App() {
  const [result, setResult] = useState<resultProps[]>([]);

  const api = async () => {
    const data = await fetch("/get-actions", {
      method: "GET"
    });
    const jsonData = await data.json();
    setResult(jsonData.result);
  };

  useEffect(() => {
    api();
  }, []);

  return (
    <div className="App">
      <h1>
      <button onClick={api}>get-actions</button>
        {result.map((value) => {
          return (
            <div>
              <div>{value.codeword}</div>
              <div>{value.id}</div>
            </div>
          );
        })}
      </h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
