import React from "react";

export default function App() {
  const title = "Hello world";
  const enchanceTitle = title + "-react app!";

  const sendNotification = () => {
    alert("hello world!");
  };
  return (
    <>
      <h1>{enchanceTitle}</h1>
      <button onClick={sendNotification}>send notification</button>
    </>
  );
}
