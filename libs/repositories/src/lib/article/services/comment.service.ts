import { Injectable, Logger } from "@nestjs/common";
import { randomUUID } from "crypto";
import { UserService } from "../../auth/services/user.service";
import { CommentRepository } from "../comment.repository";

const logger = new Logger();

@Injectable()
export class CommentService {

  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userService: UserService
  ) { }

  async createComment(comment) {
    logger.log('ARTICLE-SERVICE: Comment creation method triggered');

    delete comment.token;
    const uuid = randomUUID();
    comment.id = uuid;

    await this.commentRepository.create(comment);
    return comment;
  }

  async getCommentsByArticle(payload) {
    logger.log('ARTICLE-SERVICE: Comments by article method triggered');

    const comments = await this.commentRepository.getByArticle(payload.articleID);
    const users = await this.userService.getAll();

    const mutatedComments = comments.map((comment) => {
      const owner = users.find(user => user.email === comment.author);

      return {
        ...comment,
        author: {
          username: owner.username,
          email: owner.email,
          bio: owner.bio,
          image: owner.image
        }
      }
    });

    return mutatedComments;
  }

  deleteComment(id) {
    logger.log('ARTICLE-SERVICE: Delete comment method triggered');

    this.commentRepository.remove(id);
    
    return id;
  }
}