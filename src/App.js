import Main from "./components/Main/Main";
import INavBar from "./components/NavBar/INavBar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
   return (
      <div className="App">
         <INavBar></INavBar>
         <Main></Main>
      </div>
   );
}

export default App;
