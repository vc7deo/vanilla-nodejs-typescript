import http from "http";
import { Post } from "../models/postModel";
import postData from "../utils/postData";
class PostService {
  getPosts = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await Post.find()
          .then((posts) => {
            resolve(posts);
          })
          .catch((error: any) => {
            reject(error);
          });
      } catch (error: any) {
        reject(error);
      }
    });
  };

  getPost = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Post.findById(id)
          .then((posts) => {
            resolve(posts);
          })
          .catch((error: any) => {
            reject(error);
          });
      } catch (error: any) {
        reject(error);
      }
    });
  };

  createPost = async (
    request: http.IncomingMessage,
    response: http.ServerResponse
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let body: any = await postData(request);
        const { title, content } = JSON.parse(body);
        const newPost = new Post({
          title,
          content,
        });
        await newPost
          .save()
          .then((post) => {
            resolve(post);
          })
          .catch((error: any) => {
            reject(error);
          });
      } catch (error: any) {
        reject(error);
      }
    });
  };

  updatePost = async (
    request: http.IncomingMessage,
    response: http.ServerResponse,
    id: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatePost = await Post.findById(id);
        if (updatePost) {
          let body: any = await postData(request);
          const { title, content } = JSON.parse(body);
          updatePost.title = title;
          updatePost.content = content;
          await updatePost
            .save()
            .then((post) => {
              resolve(post);
            })
            .catch((error: any) => {
              reject(error);
            });
        }
        reject("Post not found");
      } catch (error: any) {
        reject(error);
      }
    });
  };

  deletePost = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const selectedPost = await Post.findById(id);
        if (selectedPost) {
          await selectedPost
            .remove()
            .then((post) => {
              resolve(post);
            })
            .catch((error: any) => {
              reject(error);
            });
        }
        reject("Post not found");
      } catch (error: any) {
        reject(error);
      }
    });
  };
}

export default PostService;
