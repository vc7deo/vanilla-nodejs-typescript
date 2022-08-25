import http from "http";

const sendJson = (
  status: number,
  data: string,
  response: http.ServerResponse
) => {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(data);
  return response;
};
export default sendJson;
