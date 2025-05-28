import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Paper, TextField, Checkbox, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const TransportAssignment = () => {
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const drivers = [
    { id: 1, name: "יוסי כהן", car: "מרצדס לבן", capacity: 8, phone: "050-1234567" },
    { id: 2, name: "דוד כהן", car: "יונדאי כחול", capacity: 7, phone: "050-7654321" },
    { id: 3, name: "שרה מזרחי", car: "פורד אדום", capacity: 6, phone: "050-9876543" },
  ];

  const students = [
    { id: 1, name: "דני כהן", school: "בית ספר אופק", address: "רחוב הרצל 15, תל אביב" },
    { id: 2, name: "מיכל לוי", school: "בית ספר אופק", address: "רחוב בן גוריון 42, תל אביב" },
    { id: 3, name: "יעל אברהם", school: "בית ספר רימון", address: "רחוב אלנבי 78, תל אביב" },
    { id: 4, name: "אבי ישראלי", school: "בית ספר שקק", address: "רחוב דיזנגוף 120, תל אביב" },
    { id: 5, name: "שירה גולן", school: "בית ספר רימון", address: "רחוב ביאליק 15, רמת גן" },
  ];

  const handleStudentSelect = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((studentId) => studentId !== id) : [...prev, id]
    );
  };

  const currentDriver = drivers.find((driver) => driver.name === selectedDriver);

  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      {/* בחירת נהג */}
      <Paper sx={{ p: 2, width: "30%" }}>
        <Typography variant="h6">בחירת נהג</Typography>
        <Select
          fullWidth
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          displayEmpty
          sx={{ mt: 2 }}
        >
          <MenuItem value="" disabled>בחר נהג</MenuItem>
          {drivers.map((driver) => (
            <MenuItem key={driver.id} value={driver.name}>
              {driver.name}
            </MenuItem>
          ))}
        </Select>

        {/* הצגת פרטי הנהג */}
        {currentDriver && (
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">{currentDriver.name}</Typography>
            <Typography>רכב: {currentDriver.car}</Typography>
            <Typography>קיבולת: {currentDriver.capacity} נוסעים</Typography>
            <Typography>טלפון: {currentDriver.phone}</Typography>
          </Paper>
        )}
      </Paper>

      {/* בחירת תלמידים */}
      <Paper sx={{ p: 2, flex: 1, textAlign: "center" }}>
        <Typography variant="h6">בחירת תלמידים</Typography>
        {selectedDriver ? (
          <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>בחירה</TableCell>
                    <TableCell>שם התלמיד</TableCell>
                    <TableCell>מוסד חינוכי</TableCell>
                    <TableCell>כתובת</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentSelect(student.id)}
                        />
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.school}</TableCell>
                      <TableCell>{student.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button variant="contained" sx={{ mt: 2 }}>
              שמור שיבוץ
            </Button>
          </>
        ) : (
          <Box sx={{ mt: 5, color: "gray" }}>
            <Typography variant="body1">יש לבחור נהג כדי לשבץ תלמידים</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TransportAssignment;
