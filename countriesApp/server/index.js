const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000'
  }));

// Define a simple route
app.get('/availableCountries', async (req, res) => {
    try {
    const response = await fetch('https://date.nager.at/api/v3/AvailableCountries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
  
     /*  const data = await response.json(); */
     console.log("response", response)
      return res.json(await response.json())
    } catch (error) {
      console.error('Error:', error.message);
    }
});

app.post('/countryInfo', async (req, res) => {
    console.log("IDD", req.body)
    try {
        const countryInfo = await fetch(`https://date.nager.at/api/v3/CountryInfo/${req.body.countryId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          
          const countryPop = await fetch(`https://countriesnow.space/api/v0.1/countries/population`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({country:req.body.countryName})
          })
          
          const countryFlag = await fetch(`https://countriesnow.space/api/v0.1/countries/flag/images`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({iso2:req.body.countryId})
          })


          const dataCountryInfo = await countryInfo.json();
          const dataCountryPop = await countryPop.json();
          const dataCountryFlag = await countryFlag.json();


          const response = {
            info:dataCountryInfo,
            pop:dataCountryPop.data,
            flag:dataCountryFlag.data.flag
          }
          console.log("response", response)
          return res.json(response)

        } catch (error) {
          console.error('Error:', error.message);
        }
})

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});