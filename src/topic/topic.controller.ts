import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Post(':name/subscribe')
  async subscribe(@Param('name') name: string, @Body('email') email: string) {
    try {
      return await this.topicService.subscribe(name, email);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post(':name/publish')
  async publish(@Param('name') name: string, @Body('message') message: string) {
    try {
      return await this.topicService.publish(name, message);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get()
  async listAll(@Query('search') search: string) {
    try {
      return await this.topicService.listAll(search);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
