const http = require("http");
const fs = require("fs");
const minimist = require('minimist');
const args = minimist(process.argv,{
  default: {
    port: 5000
  }
});
const port = parseInt(args.port);

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let styleContent = "";
let scriptContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

fs.readFile("style.css", (err, style) => {
  if (err) {
    throw err;
  }
  styleContent = style;
});

fs.readFile("script.js", (err, script) => {
  if (err) {
    throw err;
  }
  scriptContent = script;
});


http
  .createServer((request, response) => {
    let url = request.url;
    let contentType = "text/html"
    switch (url) {
      case "/project":
        response.writeHeader(200, {"Content-Type": contentType})
        response.write(projectContent);
        response.end();
        break;
      case "/style":
        response.writeHeader(200, {"Content-Type": "text/css"})
        response.write(styleContent);
        response.end();
        break;
      case "/script":
        response.writeHeader(200, {"Content-Type": "application/js"})
        response.write(scriptContent);
        response.end();
        break;
      case "/registration":
        response.writeHeader(200, {"Content-Type": contentType})
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.writeHeader(200, {"Content-Type": contentType})
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port,()=>{
    console.log(`Server is running on port ${port}`)
  });

