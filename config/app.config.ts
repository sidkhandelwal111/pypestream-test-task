import * as convict from 'convict';

const schema = {
  port: {
    doc: 'Name of the service',
    format: String,
    default: 'neighbourhood-backend',
    env: 'SERVICE',
  }
}

const config = convict(schema);
type Config = Record<keyof typeof schema, any>;
config.validate({ allowed: 'strict' });
export { config, Config };
