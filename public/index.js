recibirMesas();
function recibirMesas() {

    fetch("/api/mesas").then(function (response) {
        return response.json();
    }).then(function (datos) {
        let mesas = ""
        for (let i = 0; i < datos.length; i++) {
            mesas += `
        <div>
        <p>Color : ${datos[i].color}</p>
        <p>Tamaño : ${datos[i].tamanyo}</p>
        <p>Material : ${datos[i].material}</p>
        <p>Patas : ${datos[i].patas}</p>
        </div>
        
        `;
        }
        document.getElementById("div1").innerHTML = mesas;
    });
}
function anyadir() {
    const tamanyo = document.getElementById("tamanyo").value;
    const color = document.getElementById("color").value;
    const material = document.getElementById("material").value;
    const patas = document.getElementById("patas").value;

    const mesa = {
        tamanyo,
        color,
        material,
        patas,
    };

    fetch("api/anyadir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mesa)
    }).then(function (response) {
        return response.json();
    }).then(function (datos) {
        console.log(datos);
        recibirMesas();
    })

};

function cambiar() {
    const color = document.getElementById("cambiarColor").value;
    fetch(`/api/modificar/${color}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        //se envía el objeto vacío//
        body: JSON.stringify()
    }).then(function (response) {
        return response.json();
    }).then(function (datos) {
        console.log(datos);
    });

};

function borrar() {
    const patas = document.getElementById("borrarPatas").value;
    fetch(`/api/borrar/${patas}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        //se envía el objeto vacío porque lo estamos recibiendo por parametros en vez de por el body//
        body: JSON.stringify()
    }).then(function (response) {
        return response.json();
    }).then(function (datos) {
        console.log(datos);
        recibirMesas();
    });
}