import "./App.css";
import React, { useState } from "react";
import { Animated } from "react-animated-css";

import search_svg from "./images/search.svg";
import Weather from "./components/Weather";

function App() {
    const [query, setQuery] = useState("");
    const [input, setInput] = useState(null);

    const handleInput = (event) => {
        if (event.key === "Enter" || event.key === "click") {
            setQuery("");
            setInput(document.getElementById("searchBarID").value);
        }
    };
    return (
        <div className="background">
            <Animated animationIn="slideInUp" isVisible={true} animationInDuration={1000}>
                <div className="mainDiv">
                    <div className="weatherDiv">
                        <div className="input">
                            <input
                                className="searchBar"
                                type="text"
                                name="searchBar"
                                value={query}
                                id="searchBarID"
                                placeholder="search..."
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                                onKeyPress={handleInput}
                            ></input>
                            <img className="searchSvg" onClick={handleInput} alt="searchIcon" src={search_svg} />
                        </div>
                        <Weather query={input} />
                    </div>
                </div>
            </Animated>
        </div>
    );
}

export default App;
