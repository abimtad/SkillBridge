import React from "react";
import { useParams, useLocation } from "react-router-dom";

const ParamsLocationDemo = () => {
  const params = useParams();
  const location = useLocation();

  const search = new URLSearchParams(location.search);
  const ref = search.get("ref") || "-";

  return (
    <div>
      <h2>useParams & useLocation demo</h2>
      <p>Route param: {JSON.stringify(params)}</p>
      <p>Query string: {location.search || "(none)"}</p>
      <p>Parsed query 'ref': {ref}</p>
      <p>Full location object:</p>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
};

export default ParamsLocationDemo;
