import INavBar from "./components/NavBar/INavBar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main/Main";

function App() {
   return (
      <div className="App">
         <INavBar></INavBar>
         <Main></Main>
      </div>
   );
}

export default App;
