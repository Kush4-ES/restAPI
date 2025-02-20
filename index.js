import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};
app.get("/",(req,res) => {
    res.send("Dani Dani, klk aqui estamo haciendo el primer API");
    });
    app.get("/books", (req, res) => {
        const data = readData();
        res.json(data.books);
    })
   
    app.get("/books/:id",(req,res)=>{
        const data=readData();
        //Extraiem l'id de l'url recordem que req es un objecte tipus requets
        // que conté l'atribut params i el podem consultar
        const id=parseInt(req.params.id);
        const book=data.books.find((book)=>book.id===id);
        res.json(book);
        });
        //Creem un endpoint del tipus post per afegir un llibre

app.post("/books",(req,res)=>{
    const data=readData();
    const body=req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newBook={
    id:data.books.length+1,
    ...body,
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
    });
    app.put("/books/:id", (req, res) => {
        const data = readData();
        const body = req.body;
        const id = parseInt(req.params.id);
        const bookIndex = data.books.findIndex((book) => book.id === id);
        data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
        };
        writeData(data);
        res.json({ message: "Book updated successfully" });
        });
    //Funció per Escoltar
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});
