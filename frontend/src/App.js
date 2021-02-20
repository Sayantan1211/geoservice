import "./App.scss";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import { useState } from "react";
import { getLocationDetails } from "./services/location.service";

const LOCATION_REQ = "Please enter location";

const App = () => {
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState("");

  function handleChange(e) {
    if (!e.target.value) {
      setError(LOCATION_REQ);
      setLocationName("");
    } else {
      setError("");
      setLocationName(e.target.value);
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (!locationName) {
        setError(LOCATION_REQ);
        return;
      }
      setLoading(true);
      let { data } = await getLocationDetails(locationName);
      if (data.data) {
        console.log(data);
        setResult(data.data.name);
        setLoading(false);
      } else {
        setResult("");
        setLoading(false);
      }
      return;
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <div className="main">
      <Header />
      <main className="content">
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          value={locationName}
          error={error}
          loading={loading}
        />

        {result && (
          <div className="result">
            <label>Result:</label>
            <span>{result}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
