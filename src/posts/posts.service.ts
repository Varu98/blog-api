import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostsService {
  private posts = [];

  findAll() {
    return this.posts;
  }

  findOne(id: string) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  create(createPostDto: CreatePostDto) {
    const newPost = { id: Date.now().toString(), ...createPostDto };
    return newPost;
  }

  update(id: string, updatePostDto: CreatePostDto) {
    const post = this.findOne(id);
    Object.assign(post, updatePostDto);
    return post;
  }

  delete(id: string) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1)
      throw new NotFoundException(`post with id ${id} not found.`);
    return this.posts.splice(postIndex, 1);
  }
}
