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
import { Box } from "@mui/material";
import RegionFilter from "./RegionFilter";

export default function TableGame() {
    const [data, setData] = useState([]);

    // État pour le filtre Ligue
    const [selectedColumnLigue, setSelectedColumnLigue] = useState("");
    const [columnValuesLigue, setColumnValuesLigue] = useState([]);
    const [selectedValueLigue, setSelectedValueLigue] = useState("");

    // État pour le filtre Région
    const [selectedColumnRegion, setSelectedColumnRegion] = useState("");
    const [columnValuesRegion, setColumnValuesRegion] = useState([]);
    const [selectedValueRegion, setSelectedValueRegion] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/data")
            .then(response => {
                setData(response.data);
                if (response.data.length > 0) {
                    const columnIndexLigue = 14;
                    const columnKeyLigue = Object.keys(response.data[0])[columnIndexLigue];
                    setSelectedColumnLigue(columnKeyLigue);
                    setColumnValuesLigue([...new Set(response.data.map(row => row[columnKeyLigue]))]);

                    const columnIndexRegion = 15;
                    const columnKeyRegion = Object.keys(response.data[0])[columnIndexRegion];
                    setSelectedColumnRegion(columnKeyRegion);
                    setColumnValuesRegion([...new Set(response.data.map(row => row[columnKeyRegion]))]);
                }
            })
            .catch(error => console.error("Erreur :", error));
    }, []);

    return (
        <Box>
            <LigueFilter
                columnValues={columnValuesLigue}
                selectedValue={selectedValueLigue}
                setSelectedValue={setSelectedValueLigue}
                columnName={selectedColumnLigue}
            />

            <RegionFilter
                columnValues={columnValuesRegion}
                selectedValue={selectedValueRegion}
                setSelectedValue={setSelectedValueRegion}
                columnName={selectedColumnRegion}
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
                        {data
                            .filter(row => selectedValueLigue === "" || row[selectedColumnLigue] === selectedValueLigue)
                            .filter(row => selectedValueRegion === "" || row[selectedColumnRegion] === selectedValueRegion)
                            .map((row, index) => (
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
        </Box>
    );
}
