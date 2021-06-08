import React from "react";
import ROUTES, { RenderRoutes } from "./utils/routes";

function App() {
  return (
        <RenderRoutes routes={ROUTES} />
  );
}

export default App;