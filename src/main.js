import React, { unstable_Suspense as Suspense } from "react";
import { render, unstable_createRoot } from "react-dom";

import { createCache, createResource } from "react-cache";

const cache = createCache();

function longRunningOperation(result) {
  return new Promise(resolve => {
    setTimeout(() => resolve(result), 2000);
  });
}

function Spinner() {
  return <h1>Fallback Loading Spinner</h1>;
}

const UserResource = createResource(longRunningOperation);

function UserData() {
  const userData = UserResource.read(cache, "Lorem Ipsum");
  return <p>User Data: {userData}</p>;
}

function App() {
  return (
    <React.Fragment>
      <h1>Hello World</h1>
      <Suspense maxDuration={1000} fallback={<Spinner />}>
        <UserData />
      </Suspense>
    </React.Fragment>
  );
}

// CASE 1: Spinner too early
// Visible immediately
//  - "Hello World"-h1 (correct)
//  - Spinner (wrong? should be after configured 1000ms)
// Visible after 2000ms:
//  - UserData-Komponenten (correct)
// render(<App />, document.getElementById("mount"));

// CASE 2: h1 too late
// Visible after 1000ms:
//  - "Hello World"-h1 (wrong? should be visible immediately)
//  - Spinner (correct)
// Visible after 2000ms:
//  - UserData-Komponenten (correct)
unstable_createRoot(document.getElementById("mount")).render(<App />);
