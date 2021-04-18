import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { JoiValidationPipe } from '../../pipes/joi.pipe';
import { ConfigService } from '../../config/config.service';
import { MailerService } from '../mailer/mailer.service';
import { TopicService } from './topic.service';
import { message, subscriberEmail, topicName } from './topic.validation';

@Controller('topics')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly mailer: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @Post(':name/subscribe')
  async subscribe(
    @Param('name', new JoiValidationPipe(topicName)) name: string,
    @Body('email', new JoiValidationPipe(subscriberEmail)) email: string,
  ) {
    try {
      return await this.topicService.subscribe(name, email);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post(':name/publish')
  async publish(
    @Param('name', new JoiValidationPipe(topicName)) name: string,
    @Body('message', new JoiValidationPipe(message)) message: string,
  ) {
    try {
      const { topic, latestMessage } = await this.topicService.publish(
        name,
        message,
      );
      await this.mailer.broadcast(
        topic.subscribers,
        latestMessage,
        this.configService.get('orgEmail'),
        topic.name,
      );
      return { message: latestMessage, recipients: topic.subscribers };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get()
  async listAll(
    @Query('search') message: string,
    @Body('filters') filters: { topics: [string]; subscribers: [string] },
  ) {
    try {
      return await this.topicService.listAll(filters, message);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
