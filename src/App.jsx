import React from "react";
import { BrowserRouter } from "react-router-dom";

import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
}

export default App;
