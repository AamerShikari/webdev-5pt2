
import { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Zip from "./components/Zip.jsx";
import CitySearchField from "./components/CitySearchField"

function App() {
  const [cityName, setCityName] = useState("");
  const [zipCodes, setZipCode] = useState([]);

  useEffect (() =>  {
    const getCity = async() => { 
      if (cityName === "") {return;}
      let baseURL = "https://ctp-zip-api.herokuapp.com/city/";
      
      try { 
        let results = await axios.get(baseURL + cityName);
        setZipCode(results.data);
      } catch (error) { 
        console.error(error.response.data);//Not Found
        console.error(error.response.status);//404
        setZipCode([]);
      }
      
    };
    getCity(); 
  });

  const cityHandler = (e) => {
    setCityName(e.target.value.trim().toUpperCase());
  }

  const generateZip = () => { 
    if (zipCodes.length === 0){ 
      return <li> No Results </li>;
    } else { 
        return zipCodes.map((zipCodes, index) => { 
          return <Zip key={index} zip={zipCodes}/> 
        }) 
    }
  }

  return (
    <div className="App">
      <header className="Top row justify-content-center">
        <div className="col-4">
          <h1>City Search</h1>
        </div>
      </header>

      <div className="row justify-content-center results">
        <div className="col-4" style={{textAlign: "-webkit-center"}}>
          <CitySearchField cityChanged={cityHandler} />
          {generateZip()}
        </div>
      </div>
    </div>
  );
}

export default App;
