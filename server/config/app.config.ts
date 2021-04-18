import * as convict from 'convict';

const schema = {
  smtpHost: {
    doc: 'SMTP Host',
    format: String,
    default: 'smtp.mailtrap.io',
    env: 'SMTP_HOST',
  },
  orgEmail: {
    doc: 'organisation email',
    format: String,
    default: 'testing@broadcaster.com',
    env: 'ORG_EMAIL',
  },
  smtpUsername: {
    doc: 'STMP Username',
    format: String,
    default: '',
    env: 'SMTP_USERNAME',
  },
  smtpPassword: {
    doc: 'SMTP Password',
    format: String,
    default: '',
    env: 'SMTP_PASSWORD',
  },
  mongoURI: {
    doc: 'mongo db uri',
    format: String,
    default: 'mongodb://localhost/mailer',
    env: 'MONGO_URI',
  },
  env: {
    doc: 'node environment',
    format: String,
    default: 'dev',
    env: 'NODE_ENV',
  },


}

const config = convict(schema);
type Config = Record<keyof typeof schema, any>;
config.validate({ allowed: 'strict' });
export { config, Config };
