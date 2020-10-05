const { request } = require("express");

const FS = require("fs");
const BASE_PATH = "./log/";

server.get("/api/logs", (request, response) => {
    var logsFile = [];

    FS.readdirSync(BASE_PATH).forEach(entity => {
        if(FS.lstatSync(BASE_PATH + entity).isFile()){
            logsFile.push(entity);
        }
    }); 
    
    if(!logsFile){
        response.status(404).end();
    } else {
        let logsContent = {};

        logsFile.forEach(file => {
            logsContent[file.split(".")[0]] = FS.readFileSync(BASE_PATH + file, "utf8");
        });

        response.status(200).send(logsContent);
    }
});
