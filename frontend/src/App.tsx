import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const apiCall = () =>
    fetch(
      `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/hello`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          console.error(`API call failed: ${res.status} ${res.statusText}`);
        } else {
          res
            .json()
            .then((data) => {
              setResponse(data.say);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);

  return (
    <div className="App">
      <nav className="navbar bg-light">
        <div className="container">
          <a className="navbar-brand">
            <img src="/images/logo.png" height="24" />
          </a>
        </div>
      </nav>
      <div className="container">
        <form className="mt-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={apiCall}>
            Submit
          </button>
        </form>

        {response && <h1 className="display-4">{response}</h1>}
      </div>
    </div>
  );
}

export default App;
