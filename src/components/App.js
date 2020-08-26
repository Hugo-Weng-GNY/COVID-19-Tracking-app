import React, { useState, useEffect } from 'react';
import '../styling/App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import DataBox from './dataBox';
import MapChart from './mapChart';
import DataTable from './dataTable'

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/all').then(res=>res.json())
            .then(data=>{
                setCountryInfo(data);
            });
    },[]);

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

                    setTableData(data);
                    setCountries(countries);
                })
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (event)=>{
        const countryCode = event.target.value;
        setCountry(countryCode);

        const url = countryCode == 'worldwide'
            ? 'https://disease.sh/v3/covid-19/all'
            :`https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url).then(res=>res.json())
            .then(data=>{
                setCountryInfo(data);
            })

    };

    return (
        <div className="app">
            <div className="main-left">
            <div className="app-header">
                <h1>Covid-19 Tracking App</h1>
                <FormControl className="app-dropdown">
                    <Select variant="outlined" onChange={onCountryChange} value={country}>
                        <MenuItem value="worldwide">Worldwide</MenuItem>
                        {countries.map((country,index) =>(
                            <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
            </div>

            <div className="app-stats">
                <DataBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
                <DataBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
                <DataBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
            </div>
            </div>
            <Card className="main-right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <DataTable countries={tableData} />
                    <h3>Worldwide new cases</h3>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
