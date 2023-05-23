import { useState, useEffect } from "react";
import "./App.css";

function SearchPanel() {
  const [searchParam, setSearchParam] = useState("");
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    if (searchParam) {
      fetch(`http://universities.hipolabs.com/search?country=${searchParam}`)
        .then((response) => response.json())
        .then((data) => setUniversities(data))
        .catch((error) => console.error(error));
    }
  }, [searchParam]);

  function handleSearch() {
    if (searchParam) {
      fetchUniversities(searchParam);
    }
  }

  function fetchUniversities(searchparam) {
    fetch(`https://universitiesapi.onrender.com/v1/api/universities/${searchparam}`)
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.error(error));
  }

  function resetSearch() {
    setSearchParam("");
    setUniversities([]);
  }

  return (
    <div className="container">
      <h1 className="description desc1">
          {" "}
          <span className="first-letter">s</span>earch for{" "}
          <span className="first-letter">u</span>niversities by{" "}
          <span className="first-letter">c</span>ountry
        </h1>
      <div className="search-panel">
        <input className="input-container" type="text" placeholder="Enter a country name"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset</button>
      </div>

      <h2 className="result-count">
        Number of universities: {universities.length}
      </h2>

      <div className="universities-grid">
        {universities.map((university) => (
          <div key={university.name} className="university-item">
            <h3>{university.name}</h3>
            <p>Country: {university.country}</p>
            <p>
              Website:{" "}
              <a href={university.web_pages[0]}>{university.web_pages[0]}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPanel;
