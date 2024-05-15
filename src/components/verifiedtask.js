import React, { useEffect, useState } from "react";
import {
  TextField,
  IconButton,
  Modal,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Close, Visibility, ModeEdit } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MuiAlert from "@mui/material/Alert";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import RemarksModal from "./remarksmodal";

import "../assets/css/home.css";
import helmet from "helmet";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NavBar from "./navbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'cornflowerblue',
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 16,
    padding:18,
    border:'1px solid black',
    borderRight:'1px solid black'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: 'lightblue',
    borderBottom:'1px solid black',
    borderRight:'1px solid black'
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const VerifiedTask = () => {
  const [tasks, setTasks] = useState([]);
  const [openEditMeterReading, setOpenEditMeterReading] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
  const [editedMeterReading, setEditedMeterReading] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);
  const [openImageView, setOpenImageView] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [openEditMeterReading, setOpenEditMeterReading] = useState(false);
  // const [editedMeterReading, setEditedMeterReading] = useState("");
  const [anchorElSort, setAnchorElSort] = useState(null);
  const [anchorElFilter, setAnchorElFilter] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [newMeterReading, setNewMeterReading] = useState("");
  const [meterPhotoPath, setMeterPhotoPath] = useState("");
  const [CroppedPhotoPath, setCroppedPhotoPath] = useState("");
  const [selectedImageURL, setSelectedImageURL] = useState("");
  const [openRemarksModal, setOpenRemarksModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [remark, setRemark] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenRemarksModal = (task) => {
    setSelectedTaskDetails(task); // Set selected task details
    setOpenRemarksModal(true); // Open the remarks modal
  };

  const handleCloseRemarksModal = () => {
    setOpenRemarksModal(false);
  };

  const [uploadedData, setUploadedData] = useState(null);
  const fetchData = async () => {
    try {
      // Request body
      const requestBody = {
        userId: "admin",
      };

      // Make the fetch request to the API endpoint
      const response = await fetch(
        "https://api.consultit.world/admin/uploadeddata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        // Parse the JSON data from the response
        const data = await response.json();
        // Set the data to the state variable
        const verifiedTasks = data.filter(task => task.is_manual_verify === "Y");
        const modifiedData = verifiedTasks.map((item) => ({
          ...item,
          meter_photo_path: `https://api.consultit.world/meter/${item.meter_photo_path.replace(
            "uploads/bpcl/",
            ""
          )}`,
          croped_reading_path: `https://api.consultit.world/meter/${item.croped_reading_path.replace(
            "uploads/bpcl/",
            ""
          )}`,
          capture_time_formatted: new Date(item.capture_time).toLocaleString(),
          upload_time_formatted: new Date(item.upload_time).toLocaleString(),
        }));
        // console.log(data);
        console.log("Modified data:", modifiedData);
        setUploadedData(modifiedData);
        const upload_time = modifiedData.upload_time;
        // console.log(upload_time);
        setMeterPhotoPath(data.meter_photo_path);
        setCroppedPhotoPath(data.croped_reading_path);
        setTasks(modifiedData);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to fetch data!");
      setSnackbarOpen(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditMeterReading = (task) => {
    setSelectedTaskDetails(task);
    setOpenEditMeterReading(true);
  };

  const openImageViewModal = (imageURL, task) => {
    if (imageURL && imageURL !== "undefined") {
      console.log("Image URL:", imageURL);
      setSelectedImageURL(imageURL);
      setOpenImageView(true);
      if (task) {
        handleEditMeterReading(task);
      }
    } else {
      console.error("Invalid image URL:", imageURL);
      // Optionally, you can display an error message to the user or handle the case in any other appropriate way
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // const convertToXLSX = (data) => {
  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Tasks");
  //   const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   return wbout;
  // };
  const convertToXLSX = (data) => {
    // Map data to include only required columns

    const modifiedData = data.map((item) => {
      // Split upload_time into date and time
      const [date, timeWithMilliseconds] = item.upload_time.split("T");
      // Format date to remove time zone offset
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const time = timeWithMilliseconds.slice(0, 8);
      return {
        "Serial Number": item.serialNumber, // Modify this according to your data structure
        "Meter ID": item.meterid,
        "Meter Reading": item.meterreading,
        Date: formattedDate,
        Timestamp: time,
      };
    });

    const ws = XLSX.utils.json_to_sheet(modifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    return wbout;
  };

  const downloadXLSX = () => {
    const wbout = convertToXLSX(tasks);
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    FileSaver.saveAs(blob, "task_report.xlsx");
  };

  const handleSaveMeterReading = async () => {
    try {
      if (!selectedTaskDetails) return; // Check if a task is selected
      const requestBody = {
        taskid: selectedTaskDetails.localtaskid,
        readingdata: editedMeterReading,
      };
      console.log("selected local task id", selectedTaskDetails.localtaskid);
      console.log("selected local meter  reading", editedMeterReading);

      const response = await fetch(
        "https://api.consultit.world/admin/updatemeterreading",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const { status } = response.status;
      console.log(status);
      if (response.ok) {
        // Handle success, maybe show a message or update UI
        fetchData();
        setSnackbarSeverity("success");
        setSnackbarMessage("OCR updated successfully.");
        setSnackbarOpen(true);
        console.log("Meter reading updated successfully");
        setOpenImageView(false);
        setEditedMeterReading("");
      } else {
        // Handle error
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to update OCR.  ");
        setSnackbarOpen(true);
        console.error("Failed to update meter reading");
      }

      setOpenImageView(false); // Close the modal after saving
    } catch (error) {
      console.error("Error updating meter reading:", error);
    }
  };
  const handleSubmitRemarks = async (
    selectedOption,
    otherRemarks,
    localtaskid
  ) => {
    try {
      // Make a POST request to the API
      console.log(localtaskid, selectedOption);

      const response = await axios.post(
        "https://api.consultit.world/admin/checkmeterreading",
        {
          taskid: localtaskid,
          verify: "Y",
          remark: selectedOption ? selectedOption : otherRemarks,
        }
      );

      // Check if the request was successful
      console.log(localtaskid, selectedOption);
      if (response.status === 200) {
        // Show success message to the user
        setSnackbarSeverity("success");
        setSnackbarMessage("Remarks submitted successfully");
        setSnackbarOpen(true);
        fetchData();
        // Optionally, you can perform any other actions here upon successful submission
      } else {
        // Show error message to the user
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to submit remarks");
        setSnackbarOpen(true);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error submitting remarks:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to submit remarks");
      setSnackbarOpen(true);
    }
  };

  const sortByDateAsc = () => {
    const sortedTasks = [...tasks].sort(
      (a, b) =>
        new Date(a.capture_time_formatted) - new Date(b.capture_time_formatted)
    );
    setTasks(sortedTasks);
    setAnchorElSort(null);
  };

  const sortByDateDesc = () => {
    const sortedTasks = [...tasks].sort(
      (a, b) =>
        new Date(b.capture_time_formatted) - new Date(a.capture_time_formatted)
    );
    setTasks(sortedTasks);
    setAnchorElSort(null);
  };

  const filterTasksByStatus = (status) => {
    let filteredTasks;
  
    if (status === "Completed") {
      filteredTasks = uploadedData.filter((task) => task.is_manual_verify === "Y");
    } else if (status === "Pending") {
      filteredTasks = uploadedData.filter((task) => task.is_manual_verify === "N");
    } else {
      // Display all tasks
      filteredTasks = uploadedData;
    }
  
    setTasks(filteredTasks);
    console.log("ftask",filteredTasks)
    setAnchorElFilter(null);
  };

    
  const totalPages = uploadedData
    ? Math.ceil(uploadedData.length / itemsPerPage)
    : 0;
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div>
        <Helmet>
          <title>Admin Dashboard</title>
        </Helmet>
        <NavBar/>
      </div>
      <Box padding="20px">
        <Box
          width={"100%"}
          sx={{ display: "flex", marginTop: "0px" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={3}
        >
          <Box
            boxShadow={3}
            p={2}
            bgcolor="#007BC9"
            borderRadius="30px"
            width="fit-content"
          >
            <h2 style={{ fontSize: "1.5rem", margin: "0", color: "white" }}>
              Verified Tasks
            </h2>
          </Box>
{/* 
          <Box>
            <Button
              variant="contained"
              // color="primary"
              aria-controls="sort-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorElSort(event.currentTarget)}
              style={{ marginRight: "10px" }}
              className="sortButton"
            >
              Sort
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={anchorElSort}
              open={Boolean(anchorElSort)}
              onClose={() => setAnchorElSort(null)}
              // className="sortButton"
            >
              <MenuItem onClick={sortByDateAsc}>Date (Ascending)</MenuItem>
              <MenuItem onClick={sortByDateDesc}>Date (Descending)</MenuItem>
            </Menu>
            <Button
              variant="contained"
              // color="primary"
              aria-controls="filter-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorElFilter(event.currentTarget)}
              className="sortButton"
            >
              Filter
            </Button>
            <Menu
              id="filter-menu"
              anchorEl={anchorElFilter}
              open={Boolean(anchorElFilter)}
              onClose={() => setAnchorElFilter(null)}
            >
              <MenuItem onClick={() => filterTasksByStatus("Verified")}>
                Completed Tasks
              </MenuItem>
              <MenuItem onClick={() => filterTasksByStatus(" OCR Pending")}>
                Pending Tasks
              </MenuItem>
            </Menu>
          </Box> */}
        </Box>
        <Box style={{ display: "flex" }}>
        <Button
            // variant="contained"
            // onClick={() => setOpenDownloadModal(true)}
            onClick={downloadXLSX}
            style={{
              marginRight: "10px",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "black",
              background:"lightseagreen",
              margin:"5px",
              border:'2px solid black'
            }}
          >
            Download Report
          </Button>
          <Button
            style={{
              marginRight: "10px",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "black !important",
              background:"lightseagreen",
              margin:"5px",
              border:'2px solid black'
            }}
          >
            <Link to="/home" style={{color:'black'}} >
              All Tasks
            </Link>
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell className="table-cell">Sr No.</StyledTableCell>
                <StyledTableCell className="table-cell">
                  Local Task ID
                </StyledTableCell>

                <StyledTableCell className="table-cell">
                  Server Task ID
                </StyledTableCell>
                <StyledTableCell className="table-cell">
                  Capture Date
                </StyledTableCell>
                <StyledTableCell className="table-cell">
                  Uploaded Date
                </StyledTableCell>
                <StyledTableCell className="table-cell">
                  Full Image{" "}
                </StyledTableCell>
                <StyledTableCell className="table-cell">
                  Cropped Image{" "}
                </StyledTableCell>
                <StyledTableCell className="table-cell">
                  Meter ID
                </StyledTableCell>
                <StyledTableCell className="table-cell">
                  OCR Reading
                </StyledTableCell>
                {/* <StyledTableCell className="table-cell">Edit</StyledTableCell> */}
                {/* <StyledTableCell className="table-cell">
                  Remarks
                </StyledTableCell> */}
                <StyledTableCell className="table-cell">
                  Manual Verification
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {uploadedData &&
                uploadedData.map((task, index) => (
                  <TableRow key={index}> */}
              {uploadedData &&
                uploadedData
                  .slice(indexOfFirstItem, indexOfLastItem)
                  .map((task, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell className="table-cell">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </StyledTableCell>

                      <StyledTableCell className="table-cell">
                        {task.localtaskid}
                      </StyledTableCell>

                      <StyledTableCell className="table-cell">
                        {task.servertaskid}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        {task.capture_time_formatted}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        {task.upload_time_formatted}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        <IconButton
                          onClick={() =>
                            openImageViewModal(task.meter_photo_path, task)
                          }
                        >
                          <Visibility />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        <IconButton
                          onClick={() =>
                            openImageViewModal(task.croped_reading_path, task)
                          }
                        >
                          <Visibility />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        {task.meterid}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        {task.meterreading}{" "}
                      </StyledTableCell>
                      {/* <StyledTableCell className="table-cell">
                      <IconButton onClick={() => handleEditMeterReading(task)}>
                        <ModeEdit />
                      </IconButton>{" "}
                    </StyledTableCell> */}
{/* 
                      <StyledTableCell className="table-cell">
                        <Button onClick={() => handleOpenRemarksModal(task)}>
                          Remarks
                        </Button>
                        <RemarksModal
                          open={openRemarksModal}
                          onClose={handleCloseRemarksModal}
                          onSubmit={handleSubmitRemarks}
                          localtaskid={
                            selectedTaskDetails
                              ? selectedTaskDetails.localtaskid
                              : null
                          }
                        />
                      </StyledTableCell> */}
                      <StyledTableCell className="table-cell">
                        <Button
                          disabled
                          color={
                            task.is_manual_verify === "Y"
                              ? "primary"
                              : "secondary"
                          }
                          onClick={() => {
                            // Add your implementation here if needed
                          }}
                        >
                          {task.is_manual_verify === "Y"
                            ? "Verified"
                            : "Pending"}
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          className="snackbar-right"
          autoHideDuration={6000}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            elevation={6}
            variant="filled"
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
        {/* <div style={{ display: "flex" ,flexDirection: "row", alignItems: "flex-start"}}>
        <Modal
          open={openEditMeterReading}
          onClose={() => setOpenEditMeterReading(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "50%"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid #570b4b",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              padding: "20px",
              position: "relative",
              maxWidth: "50%",
            }}
          >
            <IconButton
              onClick={() => setOpenEditMeterReading(false)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
              }}
            >
              <Close />
            </IconButton>
            <h2>Edit Meter Reading</h2>
            <hr />
            {selectedTaskDetails && (
              <div>
                <p>Task ID: {selectedTaskDetails.localtaskid}</p>
                <p>Meter ID: {selectedTaskDetails.meterid}</p>
                <p>Meter Reading:{selectedTaskDetails.meterreading}</p>
                <TextField
                  label="New Meter Reading"
                  value={editedMeterReading}
                  onChange={(e) => setEditedMeterReading(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                  onClick={handleSaveMeterReading}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </Modal>
        
        <Modal
          open={openImageView}
          onClose={() => setOpenImageView(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50%"
          }}
        >
          <div style={{ backgroundColor: "white", padding: "20px" }}>
            <img
              src={selectedImageURL}
              alt="Meter Image"
              style={{ maxWidth: "100%", maxHeight: "60vh" }}
            />
          </div>
        </Modal>
        </div> */}
        <Modal
          open={openImageView}
          onClose={() => setOpenImageView(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80%",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <div style={{ width: "50%", paddingRight: "20px" }}>
              {/* Image */}
              <img
                src={selectedImageURL}
                alt="Meter Image"
                style={{ maxWidth: "100%", maxHeight: "60vh" }}
              />
            </div>
            <div style={{ width: "50%" }}>
              {/* Edit Meter Reading Content */}
              <h2>Edit Meter Reading</h2>
              <hr />
              <br />

              {selectedTaskDetails && (
                <div>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Task ID:</span>{" "}
                    {selectedTaskDetails.localtaskid}
                  </p>
                  <br />
                  <p>
                    <span style={{ fontWeight: "bold" }}>Meter ID:</span>{" "}
                    {selectedTaskDetails.meterid}
                  </p>
                  <br />
                  <p>
                    <span style={{ fontWeight: "bold" }}>OCR Reading:</span>{" "}
                    {selectedTaskDetails.meterreading}
                  </p>
                  <br />

                  <TextField
                    label="New Meter Reading"
                    value={editedMeterReading}
                    onChange={(e) => setEditedMeterReading(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px" }}
                    onClick={handleSaveMeterReading}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </Box>
      {uploadedData && uploadedData.length > 0 && (
        <div className="pageN">
          <button
            className="pagenatbut"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              className={`pagenatbut ${currentPage === number ? "active" : ""}`}
              key={number}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="pagenatbut"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifiedTask;
