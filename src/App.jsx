import { Provider } from "react-redux";
import "./App.css";
import AppRoust from "./routes/AppRoust";
import store from "./redux/store";

function App() {
  return (
    <div className=" dark:bg-bgk_dark bg-bgk_light min-h-screen dark:text-txt_dark text-txt_light">
      <Provider store={store}>
        <AppRoust />
      </Provider>
    </div>
  );
}

export default App;
