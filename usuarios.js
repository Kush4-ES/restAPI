import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./usuaris.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./usuaris.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.send("Dani Dani, klk aqui estamo haciendo el primer API");
});

app.get("/usuaris", (req, res) => {
    const data = readData();
    res.json(data.usuaris);
})

app.get("/usuaris/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    console.log("KK " + data.usuaris);
    const usuario = data.usuaris.find((usuari) => usuari.id === id);
    console.log("KK " + usuario);
    res.json(usuario);
});
//Creem un endpoint del tipus post per afegir un llibre

app.post("/usuaris", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newUsuario = {
        id: data.usuaris.length + 1,
        ...body,
    };
    data.usuaris.push(newUsuario);
    writeData(data);
    res.json(newUsuario);
});

app.put("/usuaris/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuaris.findIndex((user) => user.id === id);
    data.usuaris[usuarioIndex] = {
        ...data.usuaris[usuarioIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "usuari updated successfully con indice: " +usuarioIndex });
});
//Creem un endpoint per eliminar un llibre
app.delete("/usuarios/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const usuariosIndex = data.usuarios.findIndex((book) => usuarios.id === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.usuarios.splice(usuariosIndex, 1);
    writeData(data);
    res.json({ message: "Book deleted successfully" });
  });

//Funció per Escoltar
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});
