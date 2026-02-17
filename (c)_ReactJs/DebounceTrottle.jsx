// npm i debounce
// typing... typing... typing... STOP → call API once | Wait until user stops typing, then run once.

import { useState, useMemo } from "react";
import debounce from "lodash/debounce";

function Search() {
  const [query, setQuery] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        console.log("API call:", value);
      }, 500),
    []
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return <input value={query} onChange={handleChange} />;
}

// Throttle does NOT keep calling the API when the user stops.

import throttle from "lodash/throttle";
import { useMemo, useEffect } from "react";

function ScrollTracker() {
  
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        console.log("Scroll event");
      }, 500),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return <div>Scroll me</div>;
}
