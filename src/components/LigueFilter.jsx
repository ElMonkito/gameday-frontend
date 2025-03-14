import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function LigueFilter({ columnValues, selectedValue, setSelectedValue }) {
    return (
        <FormControl sx={{ minWidth: 200,marginLeft: "5%" }}>
            <InputLabel>Ligue</InputLabel>
            <Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} variant="standard">
                <MenuItem value="">All</MenuItem>
                {columnValues.map((val, i) => (
                    <MenuItem key={i} value={val}>{val}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
