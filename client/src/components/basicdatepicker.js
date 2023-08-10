import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import Box from '@mui/material/Box';

export default function BasicDatePicker() {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of Birth"
        //inputFormat='DD/MM/YYYY'
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField 
            name="dob"
            required
            fullWidth 
            id="dob"
            label="Date of Birth"
            autoFocus
            variant="filled"
            {...params} />}
       
      
      />
    </LocalizationProvider>
  );
}
