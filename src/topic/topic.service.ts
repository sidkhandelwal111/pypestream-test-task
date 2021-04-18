import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as FuzzySearch from 'fuzzy-search';
import { Topic, TopicDocument } from './topic.model';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,
  ) {}

  async subscribe(name: string, email: string) {
    const existingTopic = await this.topicModel.findOne({ name: name });

    if (existingTopic) {
      const isAlreadySubscribed = await this.topicModel.findOne({
        name: name,
        subscribers: {
          $in: [email],
        },
      });

      if (isAlreadySubscribed) {
        throw new HttpException('Already Subscribed', HttpStatus.BAD_REQUEST);
      } else {
        return await this.topicModel.findOneAndUpdate(
          { name: name },
          {
            $push: {
              subscribers: email,
            },
          },
          {
            new: true
          }
        );
      }
    } else {
      const newTopic = await this.topicModel.create({
        name: name,
        subscribers: [email],
      });

      return newTopic;
    }
  }

  async publish(name: string, message: string) {
    const existingTopic = await this.topicModel.findOne({ name: name });

    if (existingTopic) {
      const updatedTopic = await this.topicModel.findOneAndUpdate(
        { name: name },
        {
          $push: {
            messages: message,
          },
        },
        {
          new: true
        }
      );

      return {topic: updatedTopic, latestMessage: message};
    } else {
      throw new HttpException('Topic does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async listAll(search: string) {
    const topics = await this.topicModel.find();
    if (search) {
      const searcher = new FuzzySearch(topics, ['name', 'messages', 'subscribers'], {
        caseSensitive: true,
      });
      const searchedTopics = searcher.search(search);
      return searchedTopics;
    }
    
    return topics;
  }
}
