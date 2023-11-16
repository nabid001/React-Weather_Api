import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSerachChande }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?minPopulation=100000&namePrefix=${inputValue}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b1ba872f2emsh2b287a983678064p137212jsn95008d391fae",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      {
        return {
          options: result.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSerachChande(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
