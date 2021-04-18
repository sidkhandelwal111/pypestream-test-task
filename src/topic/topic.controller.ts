import { Body, Controller, Param, Post } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
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
}
