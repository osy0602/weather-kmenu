import React, { useState } from "react";
import Weather from "./components/Weather";

const App = () => {

  const [condition, setCondition] = useState('');

  return (
    <div className="app">
      <Weather/>
    </div>
  );
}

export default App