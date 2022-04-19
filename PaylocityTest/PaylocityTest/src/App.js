import React, { Component, useEffect, useState } from 'react';
import MainContainer from './containers/MainContainer/MainContainer';

const App = () => {
    const [Employees, SetEmployees] = useState([]);

    useEffect(() => {
        (async () => {
            await getEmployees();
        })();
    }, []);

        

    async function getEmployees() {
        const response = await fetch('http://localhost:7234/api/employee');
        const data = await response.json();
        this.SetEmployees([...Employees, data]);
        console.log(data);
    }

    //async populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const data = await response.json();
    //    this.setState({ forecasts: data, loading: false });
    //}

    return (
        <div>
            <MainContainer />
        </div>
    );
}

export default App;
