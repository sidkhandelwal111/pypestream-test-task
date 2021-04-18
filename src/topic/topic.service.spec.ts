import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../../test/mongoose.test.module';
import { Topic, TopicSchema } from './topic.model';
import { TopicService } from './topic.service';

describe('TopicService', () => {
  let service: TopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }])
      ],
      providers: [
        TopicService
      ],
    }).compile();

    service = module.get<TopicService>(TopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a subscriber to a topic', async () => {
    const topicName = 'cricket';
    const subscriberEmail = 'tempmail@email.com';
    const topic = await service.subscribe(topicName, subscriberEmail);
    
    expect(topic.name).toEqual(topicName);
    expect(topic.subscribers).toContain(subscriberEmail);
  });

  it('should publish a message for a topic', async () => {
    const topicName = 'cricket';
    const subscriberEmail = 'tempmail@email.com';
    const message = 'message';

    await service.subscribe(topicName, subscriberEmail);
    const { topic, latestMessage } = await service.publish(topicName, message);
    expect(topic.name).toEqual(topicName);
    expect(latestMessage).toContain(message);
  });
});
