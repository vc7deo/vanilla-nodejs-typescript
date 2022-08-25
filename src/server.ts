import http from "http";
import postController from "./controllers/postController";
import connectDB from "./database/connectDB";
import sendJson from "./utils/sendJson";

const PORT = process.env.PORT || 8000;

const router = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const url = request.url;
  const method = request.method;
  console.log(url, method);
  if (url === "/" && method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Hello world" }));
  } else if (url === "/api/posts" && method === "GET") {
    postController.getAll(request, response);
  } else if (url?.match(/\/api\/posts\/\w+/) && method === "GET") {
    const id = url.split("/")[3];
    postController.getOne(request, response, id);
  } else if (url === "/api/posts" && method === "POST") {
    postController.create(request, response);
  } else if (url?.match(/\/api\/posts\/\w+/) && method === "PUT") {
    const id = url.split("/")[3];
    postController.update(request, response, id);
  } else if (url?.match(/\/api\/posts\/\w+/) && method === "DELETE") {
    const id = url.split("/")[3];
    postController.delete(request, response, id);
  } else {
    const data = JSON.stringify({
      status: false,
      message: "Route Not Found",
    });
    sendJson(404, data, response);
  }
};

const server = http.createServer(router);
try {
  server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    connectDB();
  });
} catch (error) {
  console.log(error);
}
