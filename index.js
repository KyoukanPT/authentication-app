import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "tiagokyoukan";
const yourPassword = "123456";
const yourAPIKey = "34bebbdb-defa-40ac-a2fb-d1605c87d9d9";
const yourBearerToken = "b778a28b-5b11-46b4-9b71-5c2e7f844509";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  async function randomEndpoint() {
    try {
      const response = await axios.get(API_URL + 'random');
      console.log(response);

      res.render("index.ejs", {
        content: JSON.stringify(response.data.secret)
      })
    } catch (error) {
      console.error(error);
    }
  }
  randomEndpoint();
});

app.get("/basicAuth", (req, res) => {

  async function allEndpoints() {
    try {
      const response = await axios.get(API_URL + 'all?page=2', {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      });

      var length = Object.keys(response).length;
      var randomId = Math.floor(Math.random() * length);

      res.render("index.ejs", {
        content: JSON.stringify(response.data[randomId].secret)
      })
    } catch (error) {
      console.error(error);
    }
  }
  allEndpoints();
});

app.get("/apiKey", (req, res) => {

  async function filterEndpoints() {
    try {
      const response = await axios.get(API_URL + 'filter?score=5&apiKey=' + yourAPIKey);

      var length = Object.keys(response).length;
      var randomId = Math.floor(Math.random() * length);

      res.render("index.ejs", {
        content: JSON.stringify(response.data[randomId].secret)
      })
    } catch (error) {
      console.error(error);
    }
  }
  filterEndpoints();

});

app.get("/bearerToken", (req, res) => {

  const secretId = "42"

  async function specificId() {
    try {
      const response = await axios.get(API_URL + 'secrets/' + secretId, {
        headers: {
          Authorization: `Bearer ${yourBearerToken}`
        }
      }
      );

      res.render("index.ejs", {
        content: JSON.stringify(response.data.secret)
      })
    } catch (error) {
      console.error(error);
    }
  }
  specificId();

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
