const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
// post middleware
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC", doc);

        // Create nodemailer transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // Send mail
        let info = await transporter.sendMail({
            from: 'CodeHelp- by Babbar',
            to: doc.email,
            subject: "New File uploaded on cloudinary",
            html: `<h2>Hello Jee</h2> <p>File uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        });
        console.log("INFO", info);
    } catch (error) {
        console.log(error);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;