import api from "../../api/api";
import { Server } from "../../utils/config";
import { deleteButton } from "../icons";
import React, {useEffect, useState} from "react";

import {Grid, Typography, Box, IconButton, Alert, Collapse, Paper, Modal, Button, TextField} from '@mui/material'

import Select from 'react-select'


const FridgeItem = ({ item, setStale }) => {
  const [addItemModal, openAddItem] = useState(false);
  const [currentExpDate, setCurrentExpDate] = useState("");
  const [currentBoughtDate, setCurrentBoughtDate] = useState("");
  const [currentDaysLeft, setCurrentDaysLeft] = useState("");

  const handleAddItem = () =>{
    openAddItem(true)
  }

  const handleCloseModal = () => {
    openAddItem(false)
  }
  const handleOnClick = () => {
    //datastuff
    handleCloseModal()
  }
  const getMMDDYYYY= (dateString) => {
    //datastuff
    const d = (new Date(dateString))
    // return String(d.getMonth())+'/'+String(d.getDay())+'/'+d.getFullYear();
    return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  }

  const handleDelete = async (e, item) => {
    console.log("Deleting");
    try {
      await api.deleteDocument(Server.collectionID, item["$id"]);
      setStale({ stale: true });
    } catch (e) {
      console.log("Error in deleting todo");
    }
  };

  const updateBoughtDate = async (e, item) => {
    let data = {
      boughtDate : currentBoughtDate
    };
    try {
      console.log(currentBoughtDate)
      console.log(Date(currentBoughtDate))
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
      console.log("Error in updating date");
    }
  };

  const updateExpDate = async (e, item) => {
    let data = {
      expDate : currentExpDate
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
      console.log("Error in updating date");
    }
  };

  const updateDaysLeft = async (e, item) => {
    let data = {
      expDate : currentExpDate
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
      console.log("Error in updating date");
    }
  };



  // console.log(item["expDate"]);
  // console.log(new Date(item['expDate']).getDate());

  return (
    <><li className="flex justify-between items-center mt-4 px-4">
      <div className="flex">
        <div
          //puts line through item if not bought
          className={`capitalize ml-3 text-md font-medium ${!item["isBought"] ? "line-through" : ""}`}
        >
          {item["content"]}
        </div>
      </div>
      <div
        //puts line through item if not bought
        className={`capitalize ml-3 text-md font-medium ${!item["isBought"] ? "line-through" : ""}`}
      >
        {new Date(item['expDate']).getDate() - new Date().getDate()} days left
      </div>

      <div className="flex">
        <button
          onClick={(e) => handleDelete(e, item)}
          className="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125"
        >
          {deleteButton}
        </button>
        <button
          onClick={handleAddItem}
          className="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125"
        >
          ✎
        </button>
      </div>
      {/* <Button variant="contained" onClick = {handleAddItem} sx = {{margin: "10px", backgroundColor: 'rgb(138, 220, 255)', color: 'rgb(0,0,0)', hover: { backgroundColor: 'rgb(195, 184, 222)'}}}>
      Edit Item
    </Button> */}
      {/* <Button onClick = {handleAddItem} sx = {{margin: "1px", backgroundColor: 'rgb(138, 220, 255)', color: 'rgb(0,0,0)', hover: { backgroundColor: 'rgb(195, 184, 222)'}}}>
      ✎
    </Button> */}
    </li><Modal
      open={addItemModal}
      onClose={handleCloseModal}
    >
        <Box style={{ borderRadius: '20px' }} sx={{ position: 'absolute', top: '10%', left: '25%', width: "50%", height: "80%", padding: "30px", backgroundColor: 'rgb(255, 255, 255)' }}>
          <Typography id="modal-modal-title" variant="h5" component="h4">
            <b>Edit Item</b>
          </Typography><Typography id="modal-modal-title" variant="h5" style={{ paddingTop: "30px", justifyContent: "center", alignText: "center", width: "100%" }}>
            {item["content"]}
          </Typography>
          <ul style={{ paddingTop: "30px" }}>
            <li>
              Bought Date:
              <form onSumbit={updateBoughtDate} style={{ paddingBottom: "30px" }}>
                <input
                  type="text"
                  className="w-full my-2 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
                  placeholder={getMMDDYYYY(item["boughtDate"])}
                  value={currentBoughtDate}
                  onChange={(e) => setCurrentBoughtDate(e.target.value)}
                ></input>
              </form>
            </li>
            <li>
              <form onSumbit={updateExpDate} style={{ paddingBottom: "30px" }}>
                <input
                  type="text"
                  className="w-full my-2 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
                  placeholder={getMMDDYYYY(item["expDate"])}
                  value={currentExpDate}
                  onChange={(e) => setCurrentExpDate(e.target.value)}
                ></input>
              </form>
              {/* <button
className="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125"
>
✎
</button> */}
            </li>

            <li>
              Days Left: <form onSumbit={updateDaysLeft} style={{ paddingBottom: "30px" }}>
                <input
                  type="text"
                  className="w-full my-2 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
                  placeholder={4}
                  value={currentDaysLeft}
                  onChange={(e) => setCurrentDaysLeft(e.target.value)}
                ></input>
              </form>
            </li>
          </ul>
          <Button variant="contained" onClick={handleOnClick} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", marginInline: "auto", fontFamily: 'Arial', backgroundColor: 'rgb(138, 220, 255)', ': hover': { backgroundColor: 'rgb(207, 241, 255)' } }}>Close</Button>

        </Box>
      </Modal></>
  );
};

export default FridgeItem;
