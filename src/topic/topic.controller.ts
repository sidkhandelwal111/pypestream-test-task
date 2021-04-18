import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { MailerService } from '../mailer/mailer.service';
import { TopicService } from './topic.service';

@Controller('topics')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly mailer: MailerService,
    private readonly configService: ConfigService
    ) {}

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
  async publish(@Param('name') name: string, @Body('message') message: string, @Body('htmlMessage') htmlMessage: string) {
    try {
      const { topic, latestMessage } = await this.topicService.publish(name, message);
      await this.mailer.broadcast(topic.subscribers, htmlMessage, latestMessage, this.configService.get('orgEmail'), topic.name);
      return { message: latestMessage, recipients: topic.subscribers}
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
