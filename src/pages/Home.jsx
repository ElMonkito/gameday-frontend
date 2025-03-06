import TableGame from "../components/Table";
import Header from "../components/header";
import {Box} from "@mui/material";

export default function Home() {
    return (
        <Box>
            <Header/>
            <TableGame/>
        </Box>
    )
}