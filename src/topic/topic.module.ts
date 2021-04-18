import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from './topic.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
  ],
  providers: [TopicService],
  controllers: [TopicController],
})
export class TopicModule {}
