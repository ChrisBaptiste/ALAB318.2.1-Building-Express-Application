const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;


//setting up ejs as the view ebgine.
app.set("view engine", "ejs");

//This middleware lets us read data frm html forms for (POST requests)
app.use(express.urlencoded({ extended: true }));

//serving static files to render from the "public" folder
app.use(express.static(path.join(__dirname, "public")));



////////Routes////////////

// Logging request details by printing the date, HTTP method, and URL when a request is made.
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`); // Logging request details.
    next();
});

// Setting up index.ejs as the home page.
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });             // Sending "Home" title to index view.
});

// seeting up about.ejs file as the about page.
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });            // Sending "About" title to about view.
});

// Handling the GET request to the user page by taking a dynamic name from the URL and showing user.ejs.
app.get("/user/:name", (req, res) => {
    const userName = req.params.name;                   // Getting the name from the URL.
    res.render("user", { title: "User Profile", name: userName }); // Sending user data to user view.
});

// Handling the POST request from the form submission by printing the form data and sending a success message.
app.post("/submit-form", (req, res) => {
    console.log("Form data received:", req.body);
    res.send("form submited successfully!");

    /// Handling the GET request for downloading the "ChillyBeans.jpg" image file so that the file can be downloaded.
    app.get("/download", (req, res) => {
        const filePath = path.join(__dirname, "public", "images", "ChillyBeans.jpg"); // Creating the file path.
        res.download(filePath, "ChillyBeansDownloaded.jpg", (err) => {                // Sending the file for download.
            if (err) {
                console.log("Error downloading file:", err);       // Printing an error if the download fails.
            }
        });
    });

    // Starting the server 
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

});  
