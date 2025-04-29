import React, { useEffect, useState } from "react";

function Cards({ name, flag }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "5px",
        textAlign: "center",
        height: "200px",
        width: "200px",
      }}
    >
      <img
        style={{
          height: "100px",
          width: "100px",
        }}
        src={flag}
        alt={`Flag of ${name}`}
      />
      <h2>{name}</h2>
    </div>
  );
}

const API_ENDPOINT = "https://xcountries-backend.azurewebsites.net/all";

function Counties() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCounty = async () => {
      try {
        const res = await fetch(API_ENDPOINT);
        const res_json = await res.json();
        setCountries(res_json);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchCounty();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div style={{ padding: "20px" }}>
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "10px",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "10px",
        }}
      >
{filteredCountries.map(({ name, flag, abbr }, index) => (
  <Cards
    name={name}
    flag={flag}
    key={`${abbr || name}-${index}`} 
  />
))}
      </div>
    </>
  );
}

export default Counties;
