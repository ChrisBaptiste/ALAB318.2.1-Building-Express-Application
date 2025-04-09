const express = require("express");
const path = require("path");
const app = express();
const port = 3000;


//setting up ejs as the view ebgine.
app.set ("view engine", "ejs");