// app create
const express = require("express");
const app = express();

// port find karna hai
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middleware add karna hai
app.use(express.json());

// Corrected import statement for express-fileupload
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));

// db sa connect karna
const db = require("./config/database");
db.connect();

// cloud sa connect karna
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount karna
const Upload = require("./routes/FileUpload");
// Corrected route mounting path
app.use('/api/v1/upload', Upload);

// activate server
app.listen(PORT, () => {
    console.log(`APP is running at ${PORT}`);
});
