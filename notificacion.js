import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./notificacion.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./notificacion.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.send("Dani Dani");
});

app.get("/notificacion", (req, res) => {
    const data = readData();
    res.json(data.notificacion);
});

app.get("/notificacion/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const notificacion = data.notificacion.find((noti) => noti.id_not === id);
    res.json(notificacion);
});
//Creem un endpoint del tipus post per afegir un llibre

app.post("/notificacion", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newnotificacion = {
        id: data.notificacion.length + 1,
        ...body,
    };
    data.notificacion.push(newnotificacion);
    writeData(data);
    res.json(newnotificacion);
});

app.put("/notificacion/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificacionIndex = data.notificacion.findIndex((noti) => noti.id_not === id);
    data.notificacion[notificacionIndex] = {
        ...data.notificacion[notificacionIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "usuari updated successfully con indice: " + notificacionIndex });
});
//Creem un endpoint per eliminar un llibre
app.delete("/notifiacion/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notifiacionIndex = data.notificacion.findIndex((noti) => noti.id_not === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.notificacion.splice(notifacionIndex, 1);
    writeData(data);
    res.json({ message: "deleted successfully" });
  });

//Funció per Escoltar
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});
