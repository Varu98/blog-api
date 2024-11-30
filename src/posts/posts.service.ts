import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = page - 1 * limit;

    const posts = await this.prisma.post.findMany({
      skip,
      take: limit,
      include: {
        author: true,
        comments: true,
      },
    });
    const totalPosts = await this.prisma.post.count();
    const totalPages = Math.ceil(totalPosts / limit);
    return {
      data: posts,
      meta: {
        totalCount: totalPosts,
        totalPages,
        currentPage: page,
      },
    };
  }

  findOne(id: string) {
    const post = this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        comments: true,
      },
    });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  create(createPostDto: CreatePostDto) {
    const newPost = this.prisma.post.create({ data: createPostDto });
    return newPost;
  }

  update(id: string, updatePostDto: CreatePostDto) {
    const updatedPost = this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    return updatedPost;
  }

  delete(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
