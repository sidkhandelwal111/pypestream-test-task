import * as joi from 'joi';

export const topicName = joi.string().min(1).required();
export const subscriberEmail = joi.string().email().required();
export const message = joi.string().required();