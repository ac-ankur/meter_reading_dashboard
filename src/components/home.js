// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Switch,
//   TextField,
//   IconButton,
//   Modal,
//   Box,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Close, Visibility, ModeEdit } from "@mui/icons-material";

// const MyTask = () => {
//   const [tasks, setTasks] = useState(
//     Array.from({ length: 10 }, (_, i) => ({
//       id: `Task-${i}`,
//       image1: `https://source.unsplash.com/random/200x200?${i}`,
//       image2: `https://source.unsplash.com/random/200x200?${i + 1}`,
//       remarks: "",
//       status: "Pending",
//       date: randomDate(new Date(2023, 0, 1), new Date()),
//     }))
//   );
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [anchorElSort, setAnchorElSort] = useState(null);
//   const [anchorElFilter, setAnchorElFilter] = useState(null);

//   const handleToggle = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index].status =
//       newTasks[index].status === "Pending" ? "Completed" : "Pending";
//     setTasks(newTasks);
//   };

//   const handleViewImage = (image) => {
//     setSelectedImage(image);
//     setOpenModal(true);
//   };

//   // Function to generate a random date between two dates
//   function randomDate(start, end) {
//     return new Date(
//       start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     );
//   }

//   // Function to sort tasks by date in ascending order
//   const sortByDateAsc = () => {
//     const sortedTasks = [...tasks].sort((a, b) => a.date - b.date);
//     setTasks(sortedTasks);
//     setAnchorElSort(null); // Close the sort dropdown menu after sorting
//   };

//   // Function to sort tasks by date in descending order
//   const sortByDateDesc = () => {
//     const sortedTasks = [...tasks].sort((a, b) => b.date - a.date);
//     setTasks(sortedTasks);
//     setAnchorElSort(null); // Close the sort dropdown menu after sorting
//   };

//   // Function to filter tasks by status (completed or pending)
//   const filterTasksByStatus = (status) => {
//     const filteredTasks = tasks.filter((task) => task.status === status);
//     setTasks(filteredTasks);
//     setAnchorElFilter(null); // Close the filter dropdown menu after filtering
//   };
//   const handleEditMeterReading = (index) => {
//     // Implement the logic to handle editing of the meter reading manually
//     // For example, you can open a dialog or prompt for the user to input the new meter reading
//     // Once the new meter reading is obtained, update the corresponding task in the tasks array
//     // and update the state using setTasks
//     const newTasks = [...tasks];
//     // For demonstration purposes, let's prompt the user to input a new meter reading
//     const newMeterReading = prompt("Enter the new meter reading:");
//     if (newMeterReading !== null) {
//       // Prompt returns null if cancelled
//       newTasks[index].meterReading = newMeterReading;
//       setTasks(newTasks);
//     }
//   };

//   return (
//     <div>
//       <Box padding="20px">
//         <Box
//           className="boxheadge"
//           width={"100%"}
//           sx={{ display: "flex", marginTop: "0px" }}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           my={3}
//         >
//           <Box
//             boxShadow={3}
//             p={2}
//             bgcolor="#007BC9"
//             borderRadius="30px"
//             width="fit-content"
//             className="geback"
//           >
//             <h2
//               style={{
//                 fontSize: "1.5rem",
//                 margin: "0",
//                 backgroundColor: "#007BC9",
//                 color: "white",
//               }}
//             >
//               Tasks
//             </h2>
//           </Box>
//           <Box>
//             <Button
//               variant="contained"
//               color="primary"
//               aria-controls="sort-menu"
//               aria-haspopup="true"
//               onClick={(event) => setAnchorElSort(event.currentTarget)}
//               style={{ marginRight: "10px" }}
//             >
//               Sort
//             </Button>
//             <Menu
//               id="sort-menu"
//               anchorEl={anchorElSort}
//               open={Boolean(anchorElSort)}
//               onClose={() => setAnchorElSort(null)}
//             >
//               <MenuItem onClick={sortByDateAsc}>Date (Ascending)</MenuItem>
//               <MenuItem onClick={sortByDateDesc}>Date (Descending)</MenuItem>
//             </Menu>
//             <Button
//               variant="contained"
//               color="primary"
//               aria-controls="filter-menu"
//               aria-haspopup="true"
//               onClick={(event) => setAnchorElFilter(event.currentTarget)}
//             >
//               Filter
//             </Button>
//             <Menu
//               id="filter-menu"
//               anchorEl={anchorElFilter}
//               open={Boolean(anchorElFilter)}
//               onClose={() => setAnchorElFilter(null)}
//             >
//               <MenuItem onClick={() => filterTasksByStatus("Completed")}>
//                 Completed Tasks
//               </MenuItem>
//               <MenuItem onClick={() => filterTasksByStatus("Pending")}>
//                 Pending Tasks
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Box>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Task ID</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Image 1</TableCell>
//                 <TableCell>Image 2</TableCell>
//                 <TableCell>QR Location</TableCell>
//                 <TableCell>Meter Reading</TableCell>
//                 <TableCell>Remarks</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tasks.map((task, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{task.id}</TableCell>
//                   <TableCell>{task.date.toDateString()}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleViewImage(task.image1)}>
//                       <Visibility />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleViewImage(task.image2)}>
//                       <Visibility />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>QR Reading Placeholder</TableCell>
//                   <TableCell>
//                     <Box display="flex" alignItems="center">
//                       <TextField
//                         value={task.meterReading || ""}
//                         onChange={(e) => {
//                           const newTasks = [...tasks];
//                           newTasks[index].meterReading = e.target.value;
//                           setTasks(newTasks);
//                         }}
//                         style={{ marginRight: "10px" }}
//                       />
//                       <IconButton onClick={() => handleEditMeterReading(index)}>
//                         <ModeEdit />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       value={task.remarks}
//                       onChange={(e) => {
//                         const newTasks = [...tasks];
//                         newTasks[index].remarks = e.target.value;
//                         setTasks(newTasks);
//                       }}
//                     />
//                   </TableCell>
                 
//                   <TableCell>
//                     {task.status ? (
//                       <Button
//                         variant="contained"
//                         color={
//                           task.status === "Completed" ? "primary" : "secondary"
//                         }
//                         onClick={() => handleToggle(index)}
//                       >
//                         {task.status}
//                       </Button>
//                     ) : (
//                       <span>No status</span>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Modal
//           open={openModal}
//           onClose={() => setOpenModal(false)}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               border: "2px solid #570b4b",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//               padding: "20px",
//               position: "relative",
//               maxWidth: "90%",
//               maxHeight: "90%",
//               overflow: "hidden",
//             }}
//           >
//             <IconButton
//               onClick={() => setOpenModal(false)}
//               style={{
//                 position: "absolute",
//                 top: "5px",
//                 right: "5px",
//               }}
//             >
//               <Close />
//             </IconButton>
//             <img
//               src={selectedImage}
//               alt="Selected"
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "100%",
//                 display: "block",
//                 margin: "auto",
//               }}
//             />
//           </div>
//         </Modal>
//       </Box>
//     </div>
//   );
// };

// export default MyTask;


// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   IconButton,
//   Modal,
//   Box,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import '../assets/css/home.css'
// import { Close, Visibility, ModeEdit } from "@mui/icons-material";

// const MyTask = () => {
//   const [tasks, setTasks] = useState(
//     Array.from({ length: 10 }, (_, i) => ({
//       id: `Task-${i}`,
//       image1: `https://source.unsplash.com/random/200x200?${i}`,
//       image2: `https://source.unsplash.com/random/200x200?${i + 1}`,
//       remarks: "",
//       status: "Pending",
//       date: randomDate(new Date(2023, 0, 1), new Date()),
//       meterReading: `Meter-${i}`,
//     }))
//   );
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const[setImage,setSelectedImage]=useState(null)
//   const [openImageView, setOpenImageView] = useState(false);
//   const [anchorElSort, setAnchorElSort] = useState(null);
//   const [anchorElFilter, setAnchorElFilter] = useState(null);
//   const [openEditMeterReading, setOpenEditMeterReading] = useState(false);

//   const handleToggle = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index].status =
//       newTasks[index].status === "Pending" ? "Completed" : "Pending";
//     setTasks(newTasks);
//   };

//   // const handleViewImage = (image) => {
//   //   setSelectedImage(image);
//   //   setOpenModal(true);
//   // };
//   const handleViewImage = (image) => {
//     setSelectedImage(image);
//     setOpenImageView(true);
//   };

//   const handleEditMeterReading = (index) => {
//     // Set the selected task for editing
//     setSelectedTask(tasks[index]);
//     // Open the modal for editing
//     setOpenModal(true);
//   };

//   // Function to generate a random date between two dates
//   function randomDate(start, end) {
//     return new Date(
//       start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     );
//   }
//   const sortByDateAsc = () => {
//     const sortedTasks = [...tasks].sort((a, b) => a.date - b.date);
//     setTasks(sortedTasks);
//     setAnchorElSort(null); // Close the sort dropdown menu after sorting
//   };
 
//   // Function to sort tasks by date in descending order
//   const sortByDateDesc = () => {
//     const sortedTasks = [...tasks].sort((a, b) => b.date - a.date);
//     setTasks(sortedTasks);
//     setAnchorElSort(null); // Close the sort dropdown menu after sorting
//   };

//   // Function to filter tasks by status (completed or pending)
//   const filterTasksByStatus = (status) => {
//     const filteredTasks = tasks.filter((task) => task.status === status);
//     setTasks(filteredTasks);
//     setAnchorElFilter(null); // Close the filter dropdown menu after filtering
//   };
//   return (
//     <div>
//       <Box padding="20px">
      
//         <Box
//           className="boxheadge"
//           width={"100%"}
//           sx={{ display: "flex", marginTop: "0px" }}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           my={3}
//         >
//           <Box
//             boxShadow={3}
//             p={2}
//             bgcolor="#007BC9"
//             borderRadius="30px"
//             width="fit-content"
//             className="geback"
//           >
//             <h2
//               style={{
//                 fontSize: "1.5rem",
//                 margin: "0",
//                 backgroundColor: "#007BC9",
//                 color: "white",
//               }}
//             >
//               Tasks
//             </h2>
//           </Box>
//           <Box>
//             <Button
//               variant="contained"
//               color="primary"
//               aria-controls="sort-menu"
//               aria-haspopup="true"
//               onClick={(event) => setAnchorElSort(event.currentTarget)}
//               style={{ marginRight: "10px" }}
//             >
//               Sort
//             </Button>
//             <Menu
//               id="sort-menu"
//               anchorEl={anchorElSort}
//               open={Boolean(anchorElSort)}
//               onClose={() => setAnchorElSort(null)}
//             >
//               <MenuItem onClick={sortByDateAsc}>Date (Ascending)</MenuItem>
//               <MenuItem onClick={sortByDateDesc}>Date (Descending)</MenuItem>
//             </Menu>
//             <Button
//               variant="contained"
//               color="primary"
//               aria-controls="filter-menu"
//               aria-haspopup="true"
//               onClick={(event) => setAnchorElFilter(event.currentTarget)}
//             >
//               Filter
//             </Button>
//             <Menu
//               id="filter-menu"
//               anchorEl={anchorElFilter}
//               open={Boolean(anchorElFilter)}
//               onClose={() => setAnchorElFilter(null)}
//             >
//               <MenuItem onClick={() => filterTasksByStatus("Completed")}>
//                 Completed Tasks
//               </MenuItem>
//               <MenuItem onClick={() => filterTasksByStatus("Pending")}>
//                 Pending Tasks
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Box>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Task ID</TableCell>
//                 <TableCell>Capture Date</TableCell>
//                 <TableCell>Uploaded Date</TableCell>
//                 <TableCell>Image 1</TableCell>
//                 <TableCell>Image 2</TableCell>
//                 <TableCell>QR Location</TableCell>
//                 <TableCell>Meter Reading</TableCell>
//                 <TableCell>Remarks</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tasks.map((task, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{task.id}</TableCell>
//                   <TableCell>{task.date.toDateString()}</TableCell>
//                   <TableCell>{task.date.toDateString()}</TableCell>

//                   <TableCell>
//                     <IconButton onClick={() => handleViewImage(task.image1)}>
//                       <Visibility />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleViewImage(task.image2)}>
//                       <Visibility />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>QR Reading Placeholder</TableCell>
//                   <TableCell>
//                     <TextField
//                       value={task.meterReading || ""}
//                       disabled
//                       style={{ marginRight: "10px" }}
//                     />
//                     <IconButton onClick={() => handleEditMeterReading(index)}>
//                       <ModeEdit />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       value={task.remarks}
//                       onChange={(e) => {
//                         const newTasks = [...tasks];
//                         newTasks[index].remarks = e.target.value;
//                         setTasks(newTasks);
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     {task.status ? (
//                       <Button
//                         variant="contained"
//                         color={
//                           task.status === "Completed" ? "primary" : "secondary"
//                         }
//                         onClick={() => handleToggle(index)}
//                       >
//                         {task.status}
//                       </Button>
//                     ) : (
//                       <span>No status</span>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Modal
//         open={openImageView}
//         onClose={() => setOpenImageView(false)}
//         /* Your modal styles and content for image view */
//       >
//         {/* Your modal content for image view */}
//       </Modal>
//         <Modal
//           // open={openModal}
//           // onClose={() => setOpenModal(false)}
//           open={openEditMeterReading}
//           onClose={() => setOpenEditMeterReading(false)}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               border: "2px solid #570b4b",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//               padding: "20px",
//               position: "relative",
//               maxWidth: "50%",
//             }}
//           >
//             <IconButton
//               onClick={() => setOpenEditMeterReading(false)}
//               style={{
//                 position: "absolute",
//                 top: "5px",
//                 right: "5px",
//               }}
//             >
//               <Close />
//             </IconButton>
//             <h2>Edit Meter Reading</h2>
//             {selectedTask && (
//               <div>
//                 <p>Task ID: {selectedTask.id}</p>
//                 <p>Date: {selectedTask.date.toDateString()}</p>
//                 <p>QR Location: QR Reading Placeholder</p>
//                 <TextField
//                   label="New Meter Reading"
//                   defaultValue={selectedTask.meterReading}
//                   fullWidth
//                   margin="normal"
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   style={{ marginTop: "20px" }}
//                 >
//                   Save
//                 </Button>
//               </div>
//             )}
//           </div>
//         </Modal>
//       </Box>
//     </div>
//   );
// };

// export default MyTask;



// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   IconButton,
//   Modal,
//   Box,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Close, Visibility, ModeEdit } from "@mui/icons-material";

// const MyTask = () => {
//   const [tasks, setTasks] = useState(
//     Array.from({ length: 10 }, (_, i) => ({
//       id: `Task-${i}`,
//       image1: `https://source.unsplash.com/random/200x200?${i}`,
//       image2: `https://source.unsplash.com/random/200x200?${i + 1}`,
//       remarks: "",
//       status: "Pending",
//       date: randomDate(new Date(2023, 0, 1), new Date()),
//       meterReading: `Meter-${i}`,
//     }))
//   );
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [openImageView, setOpenImageView] = useState(false);
//   const [anchorElSort, setAnchorElSort] = useState(null);
//   const [anchorElFilter, setAnchorElFilter] = useState(null);
//   const [openEditMeterReading, setOpenEditMeterReading] = useState(false);

//   const handleToggle = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index].status =
//       newTasks[index].status === "Pending" ? "Completed" : "Pending";
//     setTasks(newTasks);
//   };

//   const handleViewImage = (image) => {
//     // Logic to handle image view
//   };

//   const handleEditMeterReading = (index) => {
//     setSelectedTask(tasks[index]);
//     setOpenEditMeterReading(true);
//   };

//   // Function to generate a random date between two dates
//   function randomDate(start, end) {
//     return new Date(
//       start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     );
//   }

//   const sortByDateAsc = () => {
//     const sortedTasks = [...tasks].sort((a, b) => a.date - b.date);
//     setTasks(sortedTasks);
//     setAnchorElSort(null);
//   };

//   const sortByDateDesc = () => {
//     const sortedTasks = [...tasks].sort((a, b) => b.date - a.date);
//     setTasks(sortedTasks);
//     setAnchorElSort(null);
//   };

//   const filterTasksByStatus = (status) => {
//     const filteredTasks = tasks.filter((task) => task.status === status);
//     setTasks(filteredTasks);
//     setAnchorElFilter(null);
//   };

//   return (
//     <div>
//       <Box padding="20px">
//         <Box
//           width={"100%"}
//           sx={{ display: "flex", marginTop: "0px" }}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           my={3}
//         >
//           <Box
//             boxShadow={3}
//             p={2}
//             bgcolor="#007BC9"
//             borderRadius="30px"
//             width="fit-content"
//           >
//             <h2 style={{ fontSize: "1.5rem", margin: "0", color: "white" }}>
//               Tasks
//             </h2>
//           </Box>
//           <Box>
//             <Button
//               variant="contained"
//               color="primary"
//               aria-controls="sort-menu"
//               aria-haspopup="true"
//               onClick={(event) => setAnchorElSort(event.currentTarget)}
//               style={{ marginRight: "10px" }}
//             >
//               Sort
//             </Button>
//             <Menu
//               id="sort-menu"
//               anchorEl={anchorElSort}
//               open={Boolean(anchorElSort)}
//               onClose={() => setAnchorElSort(null)}
//             >
//               <MenuItem onClick={sortByDateAsc}>Date (Ascending)</MenuItem>
//               <MenuItem onClick={sortByDateDesc}>Date (Descending)</MenuItem>
//             </Menu>
//             <Button
//               variant="contained"
//               color="primary"
//               aria-controls="filter-menu"
//               aria-haspopup="true"
//               onClick={(event) => setAnchorElFilter(event.currentTarget)}
//             >
//               Filter
//             </Button>
//             <Menu
//               id="filter-menu"
//               anchorEl={anchorElFilter}
//               open={Boolean(anchorElFilter)}
//               onClose={() => setAnchorElFilter(null)}
//             >
//               <MenuItem onClick={() => filterTasksByStatus("Completed")}>
//                 Completed Tasks
//               </MenuItem>
//               <MenuItem onClick={() => filterTasksByStatus("Pending")}>
//                 Pending Tasks
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Box>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Task ID</TableCell>
//                 <TableCell>Capture Date</TableCell>
//                 <TableCell>Uploaded Date</TableCell>
//                 <TableCell>Image 1</TableCell>
//                 <TableCell>Image 2</TableCell>
//                 <TableCell>QR Location</TableCell>
//                 <TableCell>Meter Reading</TableCell>
//                 <TableCell>Remarks</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tasks.map((task, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{task.id}</TableCell>
//                   <TableCell>{task.date.toDateString()}</TableCell>
//                   <TableCell>{task.date.toDateString()}</TableCell>

//                   <TableCell>
//                     <IconButton onClick={() => handleViewImage(task.image1)}>
//                       <Visibility />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleViewImage(task.image2)}>
//                       <Visibility />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>QR Reading Placeholder</TableCell>
//                   <TableCell>
//                     <TextField
//                       value={task.meterReading || ""}
//                       disabled
//                       style={{ marginRight: "10px" }}
//                     />
//                     <IconButton onClick={() => handleEditMeterReading(index)}>
//                       <ModeEdit />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       value={task.remarks}
//                       onChange={(e) => {
//                         const newTasks = [...tasks];
//                         newTasks[index].remarks = e.target.value;
//                         setTasks(newTasks);
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color={task.status === "Completed" ? "primary" : "secondary"}
//                       onClick={() => handleToggle(index)}
//                     >
//                       {task.status}
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
     
//         <Modal
//           open={openEditMeterReading}
//           onClose={() => setOpenEditMeterReading(false)}
//           style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               border: "2px solid #570b4b",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//               padding: "20px",
//               position: "relative",
//               maxWidth: "50%",
//             }}
//           >
//             <IconButton
//               onClick={() => setOpenEditMeterReading(false)}
//               style={{
//                 position: "absolute",
//                 top: "5px",
//                 right: "5px",
//               }}
//             >
//               <Close />
//             </IconButton>
//             <h2>Edit Meter Reading</h2>
//             {selectedTask && (
//               <div>
//                 <p>Task ID: {selectedTask.id}</p>
//                 <p>Date: {selectedTask.date.toDateString()}</p>
//                 <p>QR Location: QR Reading Placeholder</p>
//                 <TextField
//                   label="New Meter Reading"
//                   defaultValue={selectedTask.meterReading}
//                   fullWidth
//                   margin="normal"
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   style={{ marginTop: "20px" }}
//                 >
//                   Save
//                 </Button>
//               </div>
//             )}
//           </div>
//         </Modal>
//         <Modal
//           open={openImageView}
//           onClose={() => setOpenImageView(false)}
//         >
//           {/* Your modal content for image view */}
//           <img src={selectedImage} alt="Selected Image" />
//         </Modal>
//       </Box>
//     </div>
//   );
// };

// export default MyTask;
//----------------------------------//

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Modal,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Close, Visibility, ModeEdit } from "@mui/icons-material";
import '../assets/css/home.css'
const MyTask = () => {
  const [tasks, setTasks] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: `Task-${i}`,
      image1: `https://source.unsplash.com/random/200x200?${i}`,
      image2: `https://source.unsplash.com/random/200x200?${i + 1}`,
      remarks: "",
      status: "OCR Pending",
      date: randomDate(new Date(2023, 0, 1), new Date()),
      meterReading: `Meter-${i}`,
    }))
  );
  const [selectedTask, setSelectedTask] = useState(null);
  const [openImageView, setOpenImageView] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openEditMeterReading, setOpenEditMeterReading] = useState(false);
  const [editedMeterReading, setEditedMeterReading] = useState("");
  const [anchorElSort, setAnchorElSort] = useState(null);
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
  const handleToggle = (index) => {
    const newTasks = [...tasks];
    newTasks[index].status =
      newTasks[index].status === "OCR Pending" ? "Verified" : "OCR Pending";
    setTasks(newTasks);
  };
  const [uploadedData, setUploadedData] = useState(null);
  useEffect(() => {
    // Define a function to fetch the data
    const fetchData = async () => {
      try {
        // Request body
        const requestBody = {
          userId: 'admin'
        };

        // Make the fetch request to the API endpoint
        const response = await fetch('https://bpcl.connectingit.in/admin/uploadeddata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        // Check if the response is successful (status code 200)
        if (response.ok) {
          // Parse the JSON data from the response
          const data = await response.json();
          // Set the data to the state variable
          console.log(data)
          setUploadedData(data);
          setSelectedTaskDetails(data);
        } else {
          // If the response is not successful, throw an error
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch data function
    fetchData();
    // Since this effect doesn't have any dependencies, it will only run once when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run the effect only once

  const handleEditMeterReading = (index) => {
    const selectedTask = tasks[index];
    setSelectedTaskDetails(selectedTask);
    setOpenEditMeterReading(true);
  };
  
  const handleSaveMeterReading = async () => {
    try {
      if (!selectedTaskDetails) return; // Check if a task is selected
      const requestBody = {
        taskid: selectedTaskDetails.id,
        readingdate: selectedTaskDetails.date.getTime(),
      };
  
      const response = await fetch('https://bpcl.connectingit.in/admin/updatemeterreading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        // Handle success, maybe show a message or update UI
        console.log('Meter reading updated successfully');
      } else {
        // Handle error
        console.error('Failed to update meter reading');
      }
  
      setOpenEditMeterReading(false); // Close the modal after saving
    } catch (error) {
      console.error('Error updating meter reading:', error);
    }
  };
  
  const handleViewImage = (image) => {
    setSelectedImage(image);
    setOpenImageView(true);
  };
  

 
  // Function to generate a random date between two dates
  
  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
    const sortByDateAsc = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.date - b.date);
    setTasks(sortedTasks);
    setAnchorElSort(null);
  };

  const sortByDateDesc = () => {
    const sortedTasks = [...tasks].sort((a, b) => b.date - a.date);
    setTasks(sortedTasks);
    setAnchorElSort(null);
  };

  const filterTasksByStatus = (status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    setTasks(filteredTasks);
    setAnchorElFilter(null);
  };

  return (
    <div>
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
              Tasks
            </h2>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              aria-controls="sort-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorElSort(event.currentTarget)}
              style={{ marginRight: "10px" }}
            >
              Sort
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={anchorElSort}
              open={Boolean(anchorElSort)}
              onClose={() => setAnchorElSort(null)}
            >
              <MenuItem onClick={sortByDateAsc}>Date (Ascending)</MenuItem>
              <MenuItem onClick={sortByDateDesc}>Date (Descending)</MenuItem>
            </Menu>
            <Button
              variant="contained"
              color="primary"
              aria-controls="filter-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorElFilter(event.currentTarget)}
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
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task ID</TableCell>
                <TableCell>Capture Date</TableCell>
                <TableCell>Uploaded Date</TableCell>
                <TableCell>Full Image </TableCell>
                <TableCell>Cropped Image </TableCell>
                <TableCell>Meter ID</TableCell>
                <TableCell>Meter Reading</TableCell>
                <TableCell>Edit</TableCell>

                <TableCell>Remarks</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {uploadedData &&
                uploadedData.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task.servertaskid}</TableCell>
                    <TableCell>{task.capture_time}</TableCell>
                    <TableCell>{task.upload_time}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewImage(task.meter_photo_path)}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewImage(task.croped_reading_path)}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                    <TableCell>{task.meterid}</TableCell>
                    <TableCell>{task.meterreading} </TableCell>
                    <TableCell><IconButton onClick={() => handleEditMeterReading(index)}>
                      <ModeEdit />
                    </IconButton> </TableCell>

                    <TableCell>
                      <TextField
                        value={task.remarks || ""}
                        onChange={(e) => {
                          // Add your implementation here if needed
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={task.status === "Y" ? "primary" : "secondary"}
                        onClick={() => {
                          // Add your implementation here if needed
                        }}
                      >
                        {task.status === "Y" ? "Verified" : "OCR Pending"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={openEditMeterReading}
          onClose={() => setOpenEditMeterReading(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            <hr/>
            {selectedTaskDetails && (
  <div>
    <p>Task ID: {selectedTaskDetails.id}</p>
    <p>Date: {selectedTaskDetails.date.toDateString()}</p>
    <p>QR Location: QR Reading Placeholder</p>
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
          onClose={() => setOpenImageView(false)} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
        >
       
          <img src={selectedImage} alt="Selected Image" />
        </Modal>
      </Box>
    </div>
  );
};

export default MyTask;
