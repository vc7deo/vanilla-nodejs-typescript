import http, { request } from "http";
import PostService from "../services/postService";
import sendJson from "../utils/sendJson";
const postService = new PostService();
// @desc    Gets All Products
// @route   GET /api/products
exports.getAll = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  try {
    const posts = await postService.getPosts();
    const data = JSON.stringify({
      status: true,
      posts,
    });
    sendJson(200, data, res);
  } catch (error) {
    const data = JSON.stringify({
      status: false,
      message: error,
    });
    sendJson(500, data, res);
  }
};

exports.getOne = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) => {
  try {
    const post = await postService.getPost(id);
    const data = JSON.stringify({
      status: true,
      post,
    });
    sendJson(200, data, res);
  } catch (error) {
    const data = JSON.stringify({
      status: false,
      message: error,
    });
    sendJson(500, data, res);
  }
};

exports.create = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  try {
    const post = await postService.createPost(req, res);
    const data = JSON.stringify({
      status: true,
      post,
    });
    sendJson(200, data, res);
  } catch (error) {
    const data = JSON.stringify({
      status: false,
      message: error,
    });
    sendJson(500, data, res);
  }
};

exports.update = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) => {
  try {
    const post = await postService.updatePost(req, res, id);
    const data = JSON.stringify({
      status: true,
      post,
    });
    sendJson(200, data, res);
  } catch (error) {
    const data = JSON.stringify({
      status: false,
      message: error,
    });
    sendJson(500, data, res);
  }
};

exports.delete = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) => {
  try {
    const post = await postService.deletePost(id);
    const data = JSON.stringify({
      status: true,
      post,
    });
    sendJson(200, data, res);
  } catch (error) {
    const data = JSON.stringify({
      status: false,
      message: error,
    });
    sendJson(500, data, res);
  }
};
const postController = exports;
export default postController;
