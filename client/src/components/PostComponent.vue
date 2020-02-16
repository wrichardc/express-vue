<template>
  <div class="container">
    <h1>Posts</h1>
    <div class="create-post">
      <label for="create-post">Criar Post:</label>
      <input
        type="text"
        name="create-post"
        v-model="post.text"
        placeholder="Digite Algo..."
      />
      <button v-on:click="createPost">Postar</button>
    </div>

    <hr />
    <p v-if="error">{{ error }}</p>

    <div class="post-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        {{
          `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
        }}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '../services/Post';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      post: {
        text: '',
      },
    };
  },
  async created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        this.posts = await Post.getPosts();
      } catch (err) {
        this.error = err.message;
      }
    },
    createPost() {
      Post.insertPost(this.post.text);

      this.getPosts();
    },
    deletePost(id) {
      Post.deletePost(id);

      this.getPosts();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
