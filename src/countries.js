import React, { useEffect, useState } from "react";
import "./countries.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search for countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="countriesGrid">
        {filteredCountries.map((country, index) => (
          <div className="countryCard" key={index}>
            <img
              src={country.flags?.png}
              alt={`Flag of ${country.name?.common}`}
              className="flagImage"
            />
            <p>{country.name?.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
