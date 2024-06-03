import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import { useState } from "react";

function Conversions() {

    const [fromUnit, setFormUnit, toUnit, setToUnit] = useState('');
    const [value, setValue, result, setResult] = useState(0);

    const handleFromUnit = (event, newValue) => {
        setFormUnit(newValue);
    }

    const handleToUnit = (event, newValue) => {
        setToUnit(newValue);
    }



    return (
    <>
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <FormControl >  
                    
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Box sx={{marginRight: 4}}>
                            <Typography mt={1} variant="body1">From:</Typography>
                            <Autocomplete
                                id="fromUnit"
                                
                                options={['test', 'test2']}
                                renderInput={(params) => 
                                <TextField {...params} label="Unit" variant="standard" onChange={handleFromUnit}/>}
                                sx={{ width: 200 }}
                            />
                        </Box>
                        <Box>
                            <Typography mt={1} variant="body1">To:</Typography>
                            <Autocomplete
                                id="toUnit"
                                options={['test', 'test2']}
                                renderInput={(params) => 
                                <TextField {...params} label="Unit" variant="standard" onChange={handleToUnit}/>}
                                sx={{ width: 200 }}
                            />
                        </Box>
                    </Box>
                    <Box mt={3} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Input
                            id="value"
                            type="number"
                            inputProps={{ min: "0" }}
                            sx={{ width: 200 }}
                            endAdornment={<InputAdornment position="end">{fromUnit}</InputAdornment>}
                        />
                    </Box>
                </FormControl>

        </Box>
    </>
    );
}

export default Conversions;