import Home from "./pages/Home";
import {createTheme, ThemeProvider} from "@mui/material";

function App() {
    const theme = createTheme({
        typography: {
            fontFamily: "Kanit",
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Home/>
        </ThemeProvider>
    )
}

export default App;
