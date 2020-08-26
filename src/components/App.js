import React, { useState, useEffect } from 'react';
import '../styling/App.css';
import { MenuItem, FormControl, Select} from "@material-ui/core";

function App() {
    const [countries, setCountries] = useState([]);

    useEffect(()=>{
        const getCountriesData = async ()=> {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then(res=>res.json())
                .then(data=>{
                    const countries = data.map(country=>(
                        {
                            name: country.country,
                            value: country.countryInfo.iso2
                        }
                    ));
                    setCountries(countries);
                })
        };
        getCountriesData();
    }, []);

    return (
        <div className="app">
            <div className="app-header">
                <h1>Covid-19 Tracking App</h1>
                <FormControl className="app-dropdown">
                    <Select variant="outlined" value="covid">
                        {countries.map((country,index) =>(
                            <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
            </div>

        </div>
    );
}

export default App;
