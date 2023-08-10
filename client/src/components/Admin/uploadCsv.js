import React, { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import apiCall from "../../apiCall/apiCall";
import { routes } from "../../config/serverconfig";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Tooltip from '@mui/material/Tooltip';

var DEV_SERV_ADDRESS_API_UPLOADDATA = routes.DEV_SERV_ADDRESS_API_UPLOADDATA;
var PROD_SERV_ADDRESS_API_UPLOADDATA = routes.PROD_SERV_ADDRESS_API_UPLOADDATA;
//here file is reference to file to be uploaded just pass file value as taken in input field
const UploadCsv2 = async (file, companyName, seCode, token) => {
  const storageRef = ref(storage, `${companyName}/${seCode}/${file.name}`);
  const uploadeRef = await uploadBytes(storageRef, file);
  console.log("Uploaded a blob or file!");
  const downLoadUrl = await getDownloadURL(uploadeRef.ref);
  // console.log(downLoadUrl);
  var uploadCsvRes = await apiCall(
    `${DEV_SERV_ADDRESS_API_UPLOADDATA}/upload/uploadCsv`,
    "POST",
    {
      url: downLoadUrl,
      companyName: companyName,
      seCode: seCode,
    },
    token
  );
  if (uploadCsvRes.status === 200) {
    console.log("uploaded successfully");
  } else {
    console.log("upload failed");
  }
};
const button = {
    background: "linear-gradient( 111.6deg, rgba(174,68,223,1) 27.3%, rgba(246,135,135,1) 112.7% )",
    borderRadius: "15px",
    padding: "10px",
    fontSize: "18px",
    minWidth: "15%",
    color : "white",
    fontWeight : "bold",
    justifyContent : "center",
    alignItems : "center"
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  height:"50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
   
  };
const UploadCsv = () => {
  const [file, setFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [seCode, setSeCode] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
   const handleOpen = () => setOpen(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    UploadCsv2(file, companyName, seCode, null);
  };
  return (
    <main>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
              <Box sx={style}>
      <form onSubmit={handleSubmit}>
        <input type="file" style={{width:"100%",padding:"10px"}} onChange={(e) => setFile(e.target.files[0])} />
        <TextField
          sx={{
            "& label": {
              marginTop: "10px",
              marginLeft: 1,
              "&.Mui-focused": {
                marginLeft: 1
              }
            }
          }}
        style={{width:"100%",padding:"10px"}}
          type="text"
          name="companyName"
          label = "Company Name"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <TextField
        sx={{
          "& label": {
            marginTop: "10px",
            marginLeft: 1,
            "&.Mui-focused": {
              marginLeft: 1
            }
          }
        }}
        style={{width:"100%", padding:"10px"}}
          type="text"
          name="seCode"
          label = "SE code"
          onChange={(e) => setSeCode(e.target.value)}
        />
        <Box sx={{  display:"flex",  justifyContent : "center",
    alignItems : "center", padding: "10px" }}>
        <Button style={button} type="submit">Upload</Button>
        </Box>
      </form>
      </Box>
      </Modal>
      <Tooltip title="Upload company data"  placement="top">
          <Button onClick={()=> handleOpen()} variant="contained" color="primary" sx={{ height: 40 }}><FileUploadIcon /></Button>
        </Tooltip>
     
    </main>
   
  );
};

export default UploadCsv;
