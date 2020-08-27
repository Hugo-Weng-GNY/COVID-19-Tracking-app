import React, {useState, useEffect} from 'react';
import '../styling/App.css';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import DataBox from './dataBox';
import MapChart from './mapChart';
import DataTable from './dataTable';
import { sortData, prettyPrintStat } from './util';
import LineChart from './lineChart';
import 'leaflet/dist/leaflet.css';

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState('cases');

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all').then(res => res.json())
            .then(data => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then(res => res.json())
                .then(data => {
                    const countries = data.map(country => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2
                        }
                    ));

                    const sortedData = sortData(data);
                    setTableData(sortedData);
                    setMapCountries(data);
                    setCountries(countries);
                })
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        const url = countryCode == 'worldwide'
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url).then(res => res.json())
            .then(data => {
                setCountryInfo(data);
                setCountry(countryCode);

                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
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
                            {countries.map((country, index) => (
                                    <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </div>

                <div className="app-stats">
                    <DataBox
                        active={casesType === 'cases'}
                        onClick={e=>setCasesType("cases")}
                        casesType={'cases'}
                        title="Coronavirus Cases"
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        total={prettyPrintStat(countryInfo.cases)}/>
                    <DataBox
                        active={casesType === 'recovered'}
                        onClick={e=>setCasesType("recovered")}
                        casesType={'recovered'}
                        title="Recovered"
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={prettyPrintStat(countryInfo.recovered)}/>
                    <DataBox
                        active={casesType === 'deaths'}
                        onClick={e=>setCasesType("deaths")}
                        casesType={'deaths'}
                        title="Deaths"
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={prettyPrintStat(countryInfo.deaths)}/>
                </div>

                <MapChart casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
            </div>
            <Card className="main-right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <DataTable countries={tableData}/>
                    <h3 className="line-chart-title">Worldwide new {casesType}</h3>
                    <LineChart className="line-chart-container" casesType={casesType}/>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
