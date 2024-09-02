"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
export default function SelectCountries({
  register,
  setSelectedCountry,
  selectedCountry,
}) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=false&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, [setSelectedCountry]);

  return (
    <>
      <Select
        options={countries}
        value={selectedCountry}
        onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
    </>
  );
}
