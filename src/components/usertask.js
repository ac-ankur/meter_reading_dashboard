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
// import RemarksModal from "./remarksmodal";

import "../assets/css/home.css";
import helmet from "helmet";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NavBar from "./navbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "cornflowerblue",
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 16,
    padding: 18,
    border: "1px solid black",
    borderRight: "1px solid black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "lightblue !important",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserTask = () => {
  const [tasks, setTasks] = useState([]);
  const [openEditMeterReading, setOpenEditMeterReading] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
  const [editedMeterReading, setEditedMeterReading] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [openImageView, setOpenImageView] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
  const [tableData, setTableData] = useState("");

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
  console.log("usertasks comp");
  const [uploadedData, setUploadedData] = useState(null);
  const getData = async () => {
    try {
      const requestBody = {
        userId: "admin",
      };
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
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {}
  };
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
        console.log("log", data);
        const verifiedTasks = data.filter(
          (task) => task.is_manual_verify === "Y"
        );
        const modifiedData = verifiedTasks.map((item) => {
          // Get date and time separately
          const uploadDate = new Date(item.upload_time);
          const uploadTime = new Date(item.upload_time);

          // Formatting date
          const formattedDate = `${uploadDate.getDate()}/${
            uploadDate.getMonth() + 1
          }/${uploadDate.getFullYear()}`;

          // Formatting time
          const formattedTime = `${uploadTime.getHours()}:${uploadTime.getMinutes()}:${uploadTime.getSeconds()}`;

          return {
            ...item,
            upload_date: formattedDate, // Separate date
            upload_time: formattedTime, // Separate time
            meter_photo_path: `http://3.110.171.162/files/${item.meter_photo_path.replace(
              "uploads/bpcl/",
              ""
            )}`,
            croped_reading_path: `http://3.110.171.162/cfiles/${item.croped_reading_path.replace(
              "uploads/bpcl/",
              ""
            )}`,
          };
        });

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

  const convertToXLSX = (data) => {
    // Map data to include only required columns

    const modifiedData = data.map((item) => {
      // Split upload_time into date and time
      const [date, timeWithMilliseconds] = item.upload_time.split("T");
      // Format date to remove time zone offset
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const time = timeWithMilliseconds.slice(0, 8);
      return {
        "Serial Number": item.SNo, // Modify this according to your data structure
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

  const downloadReport = () => {
    if (!uploadedData || uploadedData.length === 0) {
      console.log("No data to export.");
      return;
    }

    const filename = "report.xlsx";

    // Extracting only required fields from uploadedData
    const dataSubset = uploadedData.map((task, index) => ({
      "Serial Number": (currentPage - 1) * itemsPerPage + index + 1,
      "Meter ID": task.meterid,
      "Meter Reading": task.meterreading,
      Date: task.upload_date,
      Time: task.upload_time,
    }));

    // Creating Excel file
    const worksheet = XLSX.utils.json_to_sheet(dataSubset);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Saving the Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, filename);
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

  const filterTasksByStatus = (status) => {
    let filteredTasks;

    if (status === "Completed") {
      filteredTasks = uploadedData.filter(
        (task) => task.is_manual_verify === "Y"
      );
    } else if (status === "Pending") {
      filteredTasks = uploadedData.filter(
        (task) => task.is_manual_verify === "N"
      );
    } else {
      filteredTasks = uploadedData;
    }

    setTasks(filteredTasks);
    console.log("ftask", filteredTasks);
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
        <NavBar />
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
            <h2
              style={{
                fontSize: "1.5rem",
                margin: "0",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              Completed Tasks
            </h2>
          </Box>
          <Box>
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
          </Box>
        </Box>
        <Box style={{ display: "flex" }}>
          <Button
            onClick={downloadReport}
            style={{
              marginRight: "10px",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "black",
              background: "#ff97a8",
              margin: "5px",
              border: "2px solid black",
            }}
          >
            Download Report
          </Button>
          {/* <Link to="/reports" style={{ color: "black" }}>
            <Button
              style={{
                marginRight: "10px",
                justifyContent: "flex-end",
                alignItems: "center",
                color: "black",
                background: "#ff97a8",
                margin: "5px",
                border: "2px solid black",
              }}
            >
              OCR Completed Task
            </Button>
          </Link> */}
          <Link to="/ocrpt" style={{ color: "black" }}>
            <Button
              style={{
                marginRight: "10px",
                justifyContent: "flex-end",
                alignItems: "center",
                color: "black ",
                background: "#ff97a8",
                margin: "5px",
                border: "2px solid black",
              }}
            >
              OCR Pending Task
            </Button>
          </Link>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell className="table-cell">Sr No.</StyledTableCell>
                <StyledTableCell className="table-cell">
                  Meter ID
                </StyledTableCell>
                <StyledTableCell className="table-cell">
                  Meter Reading
                </StyledTableCell>
                <StyledTableCell className="table-cell">Date</StyledTableCell>
                <StyledTableCell className="table-cell">Time</StyledTableCell>
                <StyledTableCell className="table-cell">
                  OCR Verification
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedData &&
                uploadedData
                  .slice(indexOfFirstItem, indexOfLastItem)
                  .map((task, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell className="table-cell">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        {task.meterid}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        {task.meterreading}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        {task.upload_date}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        {task.upload_time}
                      </StyledTableCell>
                      <StyledTableCell className="table-cell">
                        <Button
                          disabled
                          color={
                            task.is_manual_verify === "Y"
                              ? "primary"
                              : "secondary"
                          }
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

export default UserTask;
