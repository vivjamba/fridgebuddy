import api from "../../api/api";
import { Server } from "../../utils/config";
import { deleteButton } from "../icons";
import React, {useEffect, useState} from "react";

import {Grid, Typography, Box, IconButton, Alert, Collapse, Paper, Modal, Button, TextField} from '@mui/material'

import Select from 'react-select'
const FridgeItem = ({ item, setStale }) => {
  const [addItemModal, openAddItem] = useState(false);

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
    <>
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
          {item["boughtDate"]}
        </div>
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
      {/* <Button variant="contained" onClick = {handleAddItem} sx = {{margin: "10px", backgroundColor: 'rgb(138, 220, 255)', color: 'rgb(0,0,0)', hover: { backgroundColor: 'rgb(195, 184, 222)'}}}>
        Edit Item
      </Button> */}
      {/* <Button onClick = {handleAddItem} sx = {{margin: "1px", backgroundColor: 'rgb(138, 220, 255)', color: 'rgb(0,0,0)', hover: { backgroundColor: 'rgb(195, 184, 222)'}}}>
        ✎
      </Button> */}
    </li>
     <Modal
     open={addItemModal}
     onClose={handleCloseModal}
     >
       <Box style={{borderRadius: '20px'}} sx = {{position: 'absolute', top: '25%', left: '25%', width: "50%", height: "50%", padding: "30px", backgroundColor: 'rgb(255, 255, 255)'}}>
         <Typography id="modal-modal-title" variant="h5" component="h4">
         <b>Edit Item</b>
         </Typography>
         {/* <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: "5px"}}>
           Enter the information about your item 
         </Typography> */}
         {/* <TextField sx = {{width: "100%", padding: "5px"}} id="standard" label="Name of item" variant="standard"/> */}
         {/* <TextField sx = {{width: "100%", padding: "5px"}}id="standard" label="Name of item" variant="standard" onChange={(newValue) => }/> */}
         <Typography id="modal-modal-title" variant="h5" style={{paddingTop: "30px", justifyContent:"center", alignText: "center", width: "100%"}}>
         {item["content"]}
         </Typography>
         <ul style={{paddingTop: "30px"}}>
          <li>
            Bought Date:  <b>{item["boughtDate"]}</b>
          </li>
            {/* <Select 
              styles = {{margin: 5}}
              placeholder = {"Enter item type..."}
              //  onChange = {handleChangeType}
              closeMenuOnSelect={true}
              //  options={optionsForType}
            /> */}
            <li>
            Exp Date:  <b>{item["expDate"]}</b>
            </li>
            {/* <Select
              closeMenuOnSelect={true}
              isMulti
              //  onChange = {handleChangeAttributes}
              placeholder = {"Select one or more attributes"}
              //  options={optionsForWeather}
            /> */}
            <li>
            Days Left:  <b>4</b>
            </li>
          </ul>
         <Button variant="contained" onClick = {handleOnClick} sx={{display: "flex", justifyContent:"center", alignItems: "center", marginTop: "20px", marginInline: "auto", fontFamily: 'Arial', backgroundColor: 'rgb(138, 220, 255)', ': hover': { backgroundColor: 'rgb(207, 241, 255)'}}}>Close</Button>
         
       </Box>
   </Modal>
   </>
  );
};

export default FridgeItem;
