import axios from 'axios';

const url = 'http://localhost:5000/api/posts';

class Post {
  // Get Posts
  static getPosts() {
    return new Promise((resolve, reject) => {
      try {
        const res = axios.get(url);

        res.then(response => response.data).then(data => mapPosts(data));
      } catch (err) {
        reject(err);
      }

      const mapPosts = data => {
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt),
          })),
        );
      };
    });
  }
  // Add Post
  static insertPost(text) {
    axios.post(url, {
      text,
    });
  }

  // Delete Post
  static deletePost(id) {
    axios.delete(`${url}/${id}`);
  }
}

export default Post;
