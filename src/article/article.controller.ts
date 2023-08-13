import {
  Controller,
  Post,
  UseGuards,
  Body,
  Headers,
  UsePipes,
  Get,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ReqArticleCreateDto } from './dto/reqArticleCreate.dto';
import { ArticleCreateDto } from '@app/article/dto/articleCreate.dto';
import { IArtilceQueryParamsOptional } from './article.interface';
import { ResArticleDto } from './dto/resArticle.dto';
import { ResArticeFeedDto } from './dto/resArticleFeed.dto';
import { Token } from '@app/auth/iterface/auth.interface';
import { parseQueryParams } from './article.helper';
import { ReqArticleUpdateDto } from './dto/reqArticleUpdate.dto';
import { ArticleUpdateDto } from './dto/articleUpdate.dto';
import { ResCommentDto } from '@app/comment/dto/resComment.dto';
import { CommentCreateDto } from '@app/comment/dto/commentCreate.dto';
import { ResCommentListDto } from '@app/comment/dto/resCommentList.dto';
import { CustomValidationPipe } from '@app/common/common.pipe';
import { ArticleEntity } from './entity/article.entity';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  // @Get()
  // @ApiCreatedResponse({ type: ResArticeFeedDto })
  // @UsePipes(new CustomValidationPipe())
  // async getArticleAll(
  //   @Headers('Authorization') token: Token,
  //   @Query() query: IArtilceQueryParamsOptional,
  // ): Promise<ResArticeFeedDto> {
  //   const params = parseQueryParams(query);
  //   return await this.articleService.getArticleAllByParamsAndToken(
  //     params,
  //     token,
  //   );
  // }

  @UseGuards(AuthGuard)
  @Get('feed')
  @ApiCreatedResponse({ type: ResArticeFeedDto })
  @UsePipes(new CustomValidationPipe())
  async getArticleFeed(
    @Headers('Authorization') token: Token,
    @Query() query: IArtilceQueryParamsOptional,
  ): Promise<ResArticeFeedDto> {
    const params = parseQueryParams(query);
    return await this.articleService.getArticleFollowByParamsAndToken(
      params,
      token,
    );
  }

  @Get(':slug')
  @ApiCreatedResponse({ type: ResArticleDto })
  @UsePipes(new CustomValidationPipe())
  async getArticleBySlug(
    @Headers('Authorization') auth: Token,
    @Param('slug') slug: string,
  ): Promise<ResArticleDto> {
    return await this.articleService.getArticleBySlugAndToken(slug, auth);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: ReqArticleCreateDto })
  @ApiCreatedResponse({ type: ReqArticleCreateDto })
  @UsePipes(new CustomValidationPipe())
  async createArticle(
    @Headers('Authorization') auth: string | undefined,
    @Body('article') articleCreateDto: ArticleCreateDto,
  ): Promise<ResArticleDto> {
    return await this.articleService.createArticle(articleCreateDto, auth);
  }

  @UseGuards(AuthGuard)
  @Put(':slug')
  @ApiBody({ type: ReqArticleUpdateDto })
  @ApiCreatedResponse({ type: ReqArticleUpdateDto })
  @UsePipes(new CustomValidationPipe())
  async updateArticleBySlug(
    @Headers('Authorization') auth: Token,
    @Param('slug') slug: string,
    @Body('article') articleUpdatedDto: ArticleUpdateDto,
  ): Promise<ResArticleDto> {
    return await this.articleService.updateArticleBySlugAndToken(
      slug,
      articleUpdatedDto,
      auth,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':slug')
  @UsePipes(new CustomValidationPipe())
  async deleteArticleBySlug(
    @Headers('Authorization') auth: Token,
    @Param('slug') slug: string,
  ): Promise<void> {
    console.log('deleteArticleBySlug');
    return await this.articleService.deleteArticleBySlugAndToken(slug, auth);
  }

  @UseGuards(AuthGuard)
  @Post(':slug/favorite')
  @ApiCreatedResponse({ type: ResArticleDto })
  @UsePipes(new CustomValidationPipe())
  async addFavoriteBySlug(
    @Headers('Authorization') auth: Token,
    @Param('slug') slug: string,
  ): Promise<ResArticleDto> {
    return await this.articleService.addToFavorite(slug, auth);
  }

  @UseGuards(AuthGuard)
  @Delete(':slug/favorite')
  @ApiCreatedResponse({ type: ResArticleDto })
  @UsePipes(new CustomValidationPipe())
  async deleteFavoriteBySlug(
    @Headers('Authorization') auth: Token,
    @Param('slug') slug: string,
  ): Promise<ResArticleDto> {
    return await this.articleService.deleteFromFavorite(slug, auth);
  }

  @UseGuards(AuthGuard)
  @Post(':slug/comments')
  @ApiCreatedResponse({ type: ResCommentDto })
  @UsePipes(new CustomValidationPipe())
  async addCommentBySlug(
    @Headers('Authorization') auth: Token,
    @Param('slug') slug: string,
    @Body('comment') commentCreateDto: CommentCreateDto,
  ): Promise<ResCommentDto> {
    return await this.articleService.createCommentBySlugAndToken(
      slug,
      commentCreateDto,
      auth,
    );
  }

  @Get(':slug/comments')
  @ApiCreatedResponse({ type: ResCommentDto })
  @UsePipes(new CustomValidationPipe())
  async getCommentListBySlug(
    @Param('slug') slug: string,
  ): Promise<ResCommentListDto> {
    return await this.articleService.getCommentListBySlug(slug);
  }

  @UseGuards(AuthGuard)
  @Delete(':slug/comments/:id')
  @ApiCreatedResponse({ type: ResCommentDto })
  @UsePipes(new CustomValidationPipe())
  async deleteCommentBySlug(
    @Headers('Authorization') auth: Token,
    @Param('slug') slug: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.articleService.deleteCommentById(slug, id, auth);
  }

  // @ApiCreatedResponse()
  @Get()
  // @UsePipes(new CustomValidationPipe())
  async findAll(): Promise<ArticleEntity[]> {
    console.log('hehe');
    return await this.articleService.getAllArticles();
  }

}
