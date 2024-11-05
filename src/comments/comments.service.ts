import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentsService {
  private comments = [];
  // findAll
  // findByPostId
  //create
  //delete

  findAll() {
    return this.comments;
  }

  findByPostId(postId: string) {
    return this.comments.filter((c) => c.postId === postId);
  }

  create(createCommentDto: CreateCommentDto) {
    const newComment = { id: Date.now().toString, ...createCommentDto };
    this.comments.push(newComment);
    return newComment;
  }

  delete(id: string) {
    const commentIndex = this.comments.findIndex((c) => c.id === id);
    if (!commentIndex)
      throw new NotFoundException(`comment with id ${id} not found`);

    return this.comments.splice(commentIndex, 1);
  }
}
