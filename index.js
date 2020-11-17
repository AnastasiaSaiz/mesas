const express = require("express");
const mongodb = require("mongodb");
const servidor = express();
const MongoClient = mongodb.MongoClient;

servidor.use(express.static("public"));
servidor.use(express.urlencoded({ extended: false }));
servidor.use(express.json());

let db;

MongoClient.connect("mongodb://localhost:27017", function (error, client) {
    if (error !== null) {
        console.log(error);
    } else {
        db = client.db("mesas");
    }
});



servidor.get("/api/mesas", function (request, response) {
    db.collection("mesas").find().toArray(function (error, datos) {
        if (error !== null) {
            response.send(error);
        } else response.send(datos);
    })
});



servidor.post("/api/anyadir", function (request, response) {

    let mesa = {
        tamanyo: request.body.tamanyo,
        color: request.body.color,
        material: request.body.material,
        patas: request.body.patas,

    };

    db.collection("mesas").insertOne(mesa, function (error, datos) {
        if (error !== null) {
            response.send(error);
        } else {
            db.collection("mesas").find().toArray(function (error, data) {
                if (error !== null) {
                    response.send(error);
                } else {
                    response.send(data);
                }
            });
        }
    });
});

servidor.put("/api/modificar/:color", function (request, response) {
    const color = request.params.color;

    db.collection("mesas").updateMany({ color: color }, { $set: { color: "Granate" } }, function (error, datos) {
        if (error !== null) {
            response.send(error)
        } else {
            response.send(datos);
        }
    });

});

servidor.delete("/api/borrar/:patas", function (request, response) {
    const patas = parseInt(request.params.patas);
    const body = request.body;
    console.log(body);

    db.collection("mesas").deleteMany({ patas: patas }, function (error, datos) {
        if (error !== null) {
            response.send(error)
        } else {
            response.send(datos);
        }
    })
})
servidor.listen(3000);