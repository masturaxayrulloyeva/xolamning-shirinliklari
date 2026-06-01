import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router"; // Biz alohida faylga ochgan routerni chaqiramiz

function App() {
  return (
    // RouterProvider butun loyihaga qaysi sahifaga qanday o'tishni o'rgatadi
    <RouterProvider router={router} />
  );
}

export default App;