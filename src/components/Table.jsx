import { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import LigueFilter from "./LigueFilter";

export default function TableGame() {
    const [data, setData] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState("");
    const [columnValues, setColumnValues] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/data")
            .then(response => {
                setData(response.data);
                if (response.data.length > 0) {
                    const columnIndex = 14;
                    const columnKey = Object.keys(response.data[0])[columnIndex];
                    setSelectedColumn(columnKey);
                    setColumnValues([...new Set(response.data.map(row => row[columnKey]))]);
                }
            })
            .catch(error => console.error("Erreur :", error));
    }, []);

    return (
        <>
            <LigueFilter
                columnValues={columnValues}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                columnName={selectedColumn}
            />

            <TableContainer component={Paper} sx={{ maxWidth: "90%", margin: "20px auto", borderRadius: "10px", boxShadow: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="tableau des matchs">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#41644A" }}>
                            {data.length > 0 && Object.keys(data[0]).map((key) => (
                                <TableCell key={key} sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}>
                                    {key}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.filter(row => selectedValue === "" || row[selectedColumn] === selectedValue).map((row, index) => (
                            <TableRow key={index} sx={{
                                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                                '&:hover': { backgroundColor: "#9aada0" }
                            }}>
                                {Object.values(row).map((val, i) => (
                                    <TableCell key={i} sx={{ padding: "10px" }}>
                                        {val || "-"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
