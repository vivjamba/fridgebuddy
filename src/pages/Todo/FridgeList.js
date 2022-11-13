import { useState } from "react";
import api from "../../api/api";
import { FetchState, useGetTodos } from "../../hooks";
import { Server } from "../../utils/config";
import Alert from "../Alert/Alert";
import FridgeItem from "./FridgeItem";
import { useHistory } from "react-router-dom";


const Fridge = ({ user, dispatch }) => {
  const [stale, setStale] = useState({ stale: false });
  const [{ todos, isLoading, isError }] = useGetTodos(stale);
  const [currentTodo, setCurrentTodo] = useState("");
  const history = useHistory();

  const handleNav = () => {
    history.push("/shoppinglist");
  };


  const handleAddTodo = async (e) => {
    e.preventDefault();
    console.log("Adding Todo");
    const data = {
      content: currentTodo,
      isBought: false,
    };
    console.log(data, user);
    try {
      await api.createDocument(
        Server.collectionID,
        data,
        [`user:${user["$id"]}`],
        [`user:${user["$id"]}`]
      );
      setStale({ stale: true });
      setCurrentTodo("");
    } catch (e) {
      console.log("Error in adding todo");
    }
  };


  const handleLogout = async (e) => {
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.deleteCurrentSession();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  }

  return (
    <>

      <section className="container h-screen max-h-screen px-3 max-w-xl mx-auto flex flex-col">
        {isError && <Alert color="red" message="Something went wrong..." />}
        <div className="my-auto p-16 rounded-lg text-center">
          <div className="font-bold text-3xl md:text-5xl lg:text-6xl">
           ❄️ <br /> &nbsp; My Fridge
          </div>


          {isLoading && <h1> Loading .... </h1>}

          <ul>
            {todos.filter((item) => item["isBought"]).map((item) => (
              <FridgeItem key={item["$id"]} item={item} setStale={setStale} />
            ))}
          </ul>
        </div>
      </section>

      <section className="absolute top-0 left-0 py-3 px-6 mr-8 mb-8">
        <button
            onClick={handleNav}
            className="mx-auto mt-4 py-3 px-12 font-semibold text-md rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none">
            Go to My Shopping List
          </button>
      </section>
      <section className="absolute top-0 right-0 py-3 px-6 mr-8 mb-8">
        <button onClick={handleLogout} className="mx-auto mt-4 py-3 px-12 font-semibold text-md rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none">
          Logout 
        </button>
      </section>

    </>
  );
};

export default Fridge;
