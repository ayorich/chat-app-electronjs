import React from "react";
import { useHistory } from "react-router-dom";

export default function BackButton({ message = "just one moment please" }) {
  const { goBack } = useHistory();

  return (
    <button className="btn btn-outline-primary" onClick={() => goBack()}>
      Back
    </button>
  );
}
