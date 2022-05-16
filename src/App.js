import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import TableShow from "./components/TableShow";
import { getAllData } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllData());
  }, []);
  return (
    <div className="App">
      <TableShow />
    </div>
  );
}

export default App;
