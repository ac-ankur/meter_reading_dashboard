import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Backdrop,
} from "@mui/material";

const RemarksModal = ({ open, onClose, onSubmit,localtaskid  }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherRemarks, setOtherRemarks] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOtherRemarksChange = (event) => {
    setOtherRemarks(event.target.value);
  };

  
  const handleSubmit = () => {
    onSubmit(selectedOption, otherRemarks, localtaskid); // Pass localtaskid to the onSubmit function
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          border: "2px solid #570b4b",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          // maxWidth: "100%",
          textAlign: "center",
          width:'350px'
        }}
      >
        <h2>Select Remark</h2>
        <hr></hr>
        <RadioGroup
          aria-label="remarks"
          name="remarks"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <FormControlLabel
            value="Crop Image Improper"
            control={<Radio />}
            label="Crop Image Improper"
          />
          <FormControlLabel
            value="OCR error"
            control={<Radio />}
            label="OCR error"
          />
          <FormControlLabel
            value="Image quality improper"
            control={<Radio />}
            label="Image quality improper"
          />
          <FormControlLabel
            value="Not human readable"
            control={<Radio />}
            label="Not human readable"
          />
          <FormControlLabel
            value="Others"
            control={<Radio />}
            label="Others"
          />
        </RadioGroup>
        {selectedOption === "Others" && (
          <TextField
            label="Other Remarks"
            value={otherRemarks}
            onChange={handleOtherRemarksChange}
            fullWidth
            margin="normal"
          />
        )}
        <Button
          variant="contained"
          // color="primary"
          style={{ marginTop: "20px" ,width:'120px',backgroundColor:'#007BC9 !important'}}
          onClick={handleSubmit}
          
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default RemarksModal;
