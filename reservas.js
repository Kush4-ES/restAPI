import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./reservas.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./reservas.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.send("Dani Dani");
});

app.get("/reservas", (req, res) => {
    const data = readData();
    res.json(data.notificacion);
});

app.get("/reservas/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const notificacion = data.notificacion.find((resev) => resev.Id_reservas === id);
    res.json(notificacion);
});
//Creem un endpoint del tipus post per afegir un llibre

app.post("/reservas", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newReserva = {
        id: data.reservas.length + 1,
        ...body,
    };
    data.reservas.push(newReserva);
    writeData(data);
    res.json(newReserva);
});

app.put("/reservas/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservasIndex = data.notificacion.findIndex((resev) => resev.Id_reservas === id);
    data.reservas[reservasIndex] = {
        ...data.reservas[reservasIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "usuari updated successfully con indice: " + reservasIndex });
});
//Creem un endpoint per eliminar un llibre
app.delete("/notifiacion/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reservasIndex = data.reservas.findIndex((resev) => resev.id_not === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.reservas.splice(reservasIndex, 1);
    writeData(data);
    res.json({ message: "deleted successfully" });
  });

//Funció per Escoltar
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});
