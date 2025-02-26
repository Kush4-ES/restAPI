import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./recursos.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./recursos.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.send("Dani Dani");
});

app.get("/recursos", (req, res) => {
    const data = readData();
    res.json(data.notificacion);
});

app.get("/recursos/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const notificacion = data.notificacion.find((rec) => rec.Id_recursos === id);
    res.json(notificacion);
});
//Creem un endpoint del tipus post per afegir un llibre

app.post("/recursos", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newReserva = {
        id: data.recursos.length + 1,
        ...body,
    };
    data.recursos.push(newReserva);
    writeData(data);
    res.json(newReserva);
});

app.put("/recursos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursosIndex = data.notificacion.findIndex((rec) => rec.Id_recursos === id);
    data.recursos[recursosIndex] = {
        ...data.recursos[recursosIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "usuari updated successfully con indice: " + recursosIndex });
});
//Creem un endpoint per eliminar un llibre
app.delete("/notifiacion/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recursosIndex = data.recursos.findIndex((rec) => rec.id_not === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.recursos.splice(recursosIndex, 1);
    writeData(data);
    res.json({ message: "deleted successfully" });
  });

//Funció per Escoltar
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});
