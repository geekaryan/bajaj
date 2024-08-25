import { db } from "../components/firbaseConfig";
import { ref, set } from "firebase/database";
import React, { useState } from "react";

async function addDataToRealtimeDatabase(data) {
  try {
    // Create a unique ID or key for the new data entry
    const newEntryRef = ref(db, "messages/" + Date.now());

    // Set the data at the new reference
    await set(newEntryRef, data);
    console.log("Data successfully written to Realtime Database.");
    return true;
  } catch (err) {
    console.error("Error adding data", err);
    return false;
  }
}

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredOutput, setFilteredOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsed = JSON.parse(jsonInput);
      const dataArray = parsed.data || [];

      // Extract numbers and alphabets
      const numbers = dataArray.filter((item) => !isNaN(item));
      const alphabets = dataArray.filter((item) => /^[a-zA-Z]+$/.test(item));

      // Find the highest lowercase alphabet
      const lowercaseAlphabets = alphabets.filter(
        (char) => char >= "a" && char <= "z"
      );
      const highestLowercase = lowercaseAlphabets.sort().reverse()[0] || "";

      const data = {
        numbers,
        alphabets,
        highestLowercase,
      };

      setParsedData(data);

      // Send the data to Realtime Database
      const added = await addDataToRealtimeDatabase(data);
      if (added) {
        setJsonInput("");
      }
    } catch (err) {
      console.error("Invalid JSON format", err);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);

    if (parsedData) {
      let output = "";

      if (e.target.value === "numbers") {
        output = parsedData.numbers.join(", ");
      } else if (e.target.value === "alphabets") {
        output = parsedData.alphabets.join(", ");
      } else if (e.target.value === "highestLowercase") {
        output = parsedData.highestLowercase;
      }

      if (output) {
        setFilteredOutput(output);
      } else {
        alert("You haven't added that data.");
        setFilteredOutput("");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Aryan Rana 21BCE11263(VIT, B)</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              id="jsonInput"
              value={jsonInput}
              placeholder='Enter JSON data here (e.g., {"data": ["M", "1", "344", "4", "B"]})'
              onChange={(e) => setJsonInput(e.target.value)}
              rows={5}
              cols={50}
              style={styles.textarea}
            />
          </div>
          <div>
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </div>

      {parsedData && (
        <div>
          <h2 style={styles.subheading}>Filter Results</h2>
          <div>
            <label htmlFor="filter">Select Filter: </label>
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              style={styles.dropdown}
            >
              <option value="">--Select--</option>
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highestLowercase">
                Highest Lowercase Alphabet
              </option>
            </select>
          </div>
          {filteredOutput && (
            <div>
              <h3 style={styles.subheading}>Filtered Output:</h3>
              <p>{filteredOutput}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#6a0dad", // Purple background
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    justifyContent: "center",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "20px",
    textAlign: "center",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  subheading: {
    fontSize: "1.5em",
    marginTop: "20px",
  },
  dropdown: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#fff",
    color: "#6a0dad",
    cursor: "pointer",
  },
};
