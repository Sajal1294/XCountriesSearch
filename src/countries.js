import React, { useEffect, useState } from "react";
import "./countries.css"; // Import CSS file

function Cards({ name, flag }) {
  return (
    <div className="countryCard">
      <img className="countryFlag" src={flag} alt={`Flag of ${name}`} />
      <h2>{name}</h2>
    </div>
  );
}

const API_ENDPOINT =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(API_ENDPOINT);
        const res_json = await res.json();
        setCountries(res_json);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Fetch failed");
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    debouncedQuery.trim() === ""
      ? true
      : country.common.toLowerCase() === debouncedQuery.toLowerCase()
  );

  return (
    <>
      <div className="searchWrapper">
        <input
          type="text"
          placeholder="Search countries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchInput"
        />
      </div>

      <div className="cardsContainer">
        {filteredCountries.map(({ common, png }) => (
          <Cards name={common} flag={png} key={common} />
        ))}
      </div>
    </>
  );
}

export default Countries;
