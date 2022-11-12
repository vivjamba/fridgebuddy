import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Fridge from "./pages/Todo/FridgeList";
import Shopping from "./pages/Todo/ShoppingList";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import { useGetUser } from "./hooks";

function App() {
  // eslint-disable-next-line
  const [{ user, isLoading, isError }, dispatch] = useGetUser();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/fridge">
          {user ? <Fridge user={user} dispatch={dispatch} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/shoppinglist">
           {user ? <Shopping user={user} dispatch={dispatch} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/fridge" /> : <Login dispatch={dispatch}/>}
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

// import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// import Fridge from "./pages/Todo/FridgeList";
// import Shopping from "./pages/Todo/ShoppingList";
// import Login from "./pages/Login/Login";
// import Landing from "./pages/Landing/Landing";
// import { useGetUser } from "./hooks";

// function App() {
//   // eslint-disable-next-line
//   const [{ user, isLoading, isError }, dispatch] = useGetUser();

//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/fridgelist">
//           {user ? <Fridge user={user} dispatch={dispatch} /> : <Redirect to="/login" />}
//         </Route>
//         <Route path="/shoppinglist">
//           {user ? <Shopping user={user} dispatch={dispatch} /> : <Redirect to="/login" />}
//         </Route>
//         <Route path="/login">
//           {user ? <Redirect to="/shoppinglist" /> : <Login dispatch={dispatch}/>}
//         </Route>
//         <Route exact path="/">
//           <Landing />
//         </Route>
//         <Redirect to="/" />
//       </Switch>
//     </BrowserRouter>
//   );
// }

// export default App;


export default App;
