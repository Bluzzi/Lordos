const FS = require("fs");
const BASE_PATH = "./resources/images/";

//C EST DEGEU, OK, MAIS TU PEUX LE REFAIRE SI T4ES PAS CONTENT

server.get("/api/images/:x/:y", async (request, response) => {
    let image = request.params.x + "/" + request.params.y;

    if(FS.existsSync(BASE_PATH + image)){
        response.status(200).sendFile(image, {root: BASE_PATH});
    } else {
        response.status(404).end();
    }
});

server.get("/api/images/:x", async (request, response) => {
    let image = request.params.x;

    if(FS.existsSync(BASE_PATH + image)){
        response.status(200).sendFile(image, {root: BASE_PATH});
    } else {
        response.status(404).end();
    }
});
