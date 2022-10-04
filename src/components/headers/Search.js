import React, { useState, useRef } from "react";

const Search = ({ startSearch }) => {
   const refForm = useRef();
   const [search, setSearch] = useState("");

   const onSearch = (e) => {
      const value = e.target.value;
      setSearch(value);
   };

   const onFormSubmit = (e) => {
      e.preventDefault();
      const value = refForm.current[0].value;

      if (value) {
         startSearch(value);
      }
   };

   return (
      <form action="" ref={refForm} onSubmit={onFormSubmit} className="searchForm">
         <input type="text" name="search" id="search" className="search" placeholder="Philippine Top Hits" value={search} onChange={onSearch} />
      </form>
   );
};

export default Search;
