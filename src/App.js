import "./App.css";
import ExchangeTable from "./pages/ExchangeTable";
import Navbar from "./Components/NavBar";
import { Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Typography variant="h4" sx={{marginTop:"-10vh", marginBottom: "3vh"}}>Exchangify</Typography>
        <ExchangeTable />
      </header>
    </div>
  );
}

export default App;
