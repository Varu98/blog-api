import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { PostsService } from 'src/posts/posts.service';
import { mockPrismaService } from './mocks/prisma.service.mock';

describe('PostsService', () => {
  let postsService: PostsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should create a post successfully', async () => {
      const postData = {
        title: 'Test Post',
        content: 'Test Content',
        authorId: '123',
      };
      const mockPost = { id: '1', ...postData };
      (prismaService.post.create as jest.Mock).mockResolvedValue(mockPost);

      const result = await postsService.create(postData);

      expect(result).toEqual(mockPost);
      expect(prismaService.post.create).toHaveBeenCalledWith({
        data: postData,
      });
    });
  });
});
