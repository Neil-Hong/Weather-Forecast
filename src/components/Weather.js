import React, { useState, useEffect } from "react";
import CityInfo from "./CityInfo.js";

import Error from "./Error.js";
import TemperatureInfo from "./TemperatureInfo.js";
import Hourly from "./Hourly.js";

export default function Weather(props) {
    const [dataReact, setDataReact] = useState({});
    const [error, setError] = useState();
    const [date, setDate] = useState([]);
    const [sunriseState, setSunrise] = useState();

    useEffect(() => {
        if (props.query != null) {
            getData();
        }
    }, [props.query]);

    const getData = async () => {
        setError(false);
        const fetchData = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${props.query}&appid=5372145e35fd3603b17dbf343fedb497&units=metric`
        );
        const data = await fetchData.json();
        if (parseInt(data.cod) >= 400) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1000);
            return;
        }
        const fetchDataHourly = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&%20&appid=3803f6a6a3d667409ef82e45fd337af5&units=metric`
        );
        const dataHourly = await fetchDataHourly.json();
        console.log(dataHourly);
        const sunrise = { sunrise: data.sys.sunrise, sunset: data.sys.sunset };
        setSunrise(sunrise);
        const tempDate = new Date();
        const fullDate = new Date((data.dt + data.timezone + tempDate.getTimezoneOffset() * 60) * 1000);
        console.log(fullDate);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const exactDate = [
            fullDate.getDate(),
            fullDate.getMonth(),
            fullDate.getFullYear(),
            days[fullDate.getDay()],
            months[fullDate.getMonth() + 1],
        ];
        setDate(exactDate);
        const icon = data.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const neededData = {
            city: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            main: data.weather[0].main,
            weatherID: data.weather[0].id,
            temp: data.main.temp,
            highestTemp: dataHourly.daily[0].temp.max,
            lowestTemp: dataHourly.daily[0].temp.min,
            clouds: data.clouds.all,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            hourly: dataHourly.hourly,
            timezoneOffset: data.timezone,
            dt: data.dt,
            sunrise: data.sys.sunrise,
            sunst: data.sys.sunset,
            icon: imgUrl,
        };
        setDataReact(neededData);
    };

    return (
        <div>
            <div className="mainInfo">
                <Error error={error} />
                <div className="mainInfoTLXD">
                    <CityInfo date={date} data={dataReact} />
                </div>
                <div className="mainInfoTRXD">
                    <TemperatureInfo data={dataReact} />
                </div>
            </div>
            <div className="hourlyDiv">
                <Hourly data={dataReact} sunrise={sunriseState} hour="2" />
                <Hourly data={dataReact} sunrise={sunriseState} hour="3" />
                <Hourly data={dataReact} sunrise={sunriseState} hour="4" />
                <Hourly data={dataReact} sunrise={sunriseState} hour="5" />
                <Hourly data={dataReact} sunrise={sunriseState} hour="6" />
                <Hourly data={dataReact} sunrise={sunriseState} hour="7" />
            </div>
        </div>
    );
}
