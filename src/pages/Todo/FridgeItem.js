import api from "../../api/api";
import { Server } from "../../utils/config";
import { deleteButton } from "../icons";

const FridgeItem = ({ item, setStale }) => {

  const handleDelete = async (e, item) => {
    console.log("Deleting Todo");
    try {
      await api.deleteDocument(Server.collectionID, item["$id"]);
      setStale({ stale: true });
    } catch (e) {
      console.log("Error in deleting todo");
    }
  };

  // console.log(item["expDate"]);
  // console.log(new Date(item['expDate']).getDate());

  return (
    <li className="flex justify-between items-center mt-4 px-4">
      <div className="flex">
        <div
        //puts line through item if not bought
          className={`capitalize ml-3 text-md font-medium ${
            !item["isBought"] ? "line-through" : ""
          }`}
        >
          {item["content"]}
        </div>
      </div>
      <div
        //puts line through item if not bought
          className={`capitalize ml-3 text-md font-medium ${
            !item["isBought"] ? "line-through" : ""
          }`}
        >
          {new Date(item['expDate']).getDate() - new Date().getDate()} days left
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

export default FridgeItem;
