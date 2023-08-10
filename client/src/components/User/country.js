import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


export default function App() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const selectCountryHandler = (value) => setSelectedCountry(value);

  // Have to register the languages you want to use
  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key
    };
  });

  return (
    <div>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
    <InputLabel > Country</InputLabel>

  
      <Select
        style={{ width: "350px" }}
        //item xs={90}
        label='Country'
        name="country"
        variant="filled"
        required
        value={selectedCountry}
        onChange={(e) => selectCountryHandler(e.target.value)}
      >
        {!!countryArr?.length &&
          countryArr.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
      </FormControl>
    </div>
  );
}
