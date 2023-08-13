import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CustomValidationPipe } from '@app/common/common.pipe';
import { ResTagListDto } from './dto/resTagList.dto';
import { TagEntity } from './entity/tag.entity';

@Controller('tags')
@ApiTags('tags')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @ApiCreatedResponse({ type: ResTagListDto })
  @Get()
  @UsePipes(new CustomValidationPipe())
  async findAll(): Promise<ResTagListDto> {
    return await this.tagService.findAll();
  }

  @Post()
  @ApiCreatedResponse()
  async createTag(
    @Query() raw: any
  ): Promise<TagEntity> {
    const map = new Map<string, string>(Object.entries(raw))
    const name = map.get("name")
    return await this.tagService.insertTag(name)
  }
}
