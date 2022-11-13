import api from "../../api/api";
import { Server } from "../../utils/config";
import { deleteButton } from "../icons";

const current = new Date();
// const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
const exp = new Date(current.getTime())+4;
//exp.setFullYear(current.getFullYear(),current.getMonth(),current.getDate()+4);

const ShoppingItem = ({ item, setStale }) => {
  const handleComplete = async (e, item) => {
    console.log("Marking Todo as complete");
    let data = {
      isBought: !item["isBought"],
      boughtDate : current,
      expDate : exp
    };
    try {
      console.log(item)
      await api.updateDocument(
        Server.collectionID,
        item["$id"],
        data,
        item["$read"],
        item["$write"]
      );
      setStale({ stale: true });
    } catch (e) {
      console.log("Error in marking todo as complete");
    }
  };

  const handleDelete = async (e, item) => {
    console.log("Deleting Todo");
    try {
      await api.deleteDocument(Server.collectionID, item["$id"]);
      setStale({ stale: true });
    } catch (e) {
      console.log("Error in deleting todo");
    }
  };

  return (
    <li className="flex justify-between items-center mt-4 px-4">
      <div className="flex">
        <input
          type="checkbox"
          className="h-6 w-6 text-green-500 rounded-md border-4 border-green-200 focus:ring-0 transition duration-75 ease-in-out transform hover:scale-125"
          //checked takes a boolean
          checked={item["isBought"]}
          onChange={(e) => handleComplete(e, item)}
        />
        <div
        //puts line through item if not bought
          className={`capitalize ml-3 text-md font-medium ${
            item["isBought"] ? "line-through" : ""
          }`}
        >
          {item["content"]}
        </div>
      </div>
      <button
        onClick={(e) => handleDelete(e, item)}
        className="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125"
      >
        {deleteButton}
      </button>
    </li>
  );
};

export default ShoppingItem;
