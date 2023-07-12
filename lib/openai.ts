import { Configuration, OpenAIApi } from 'openai';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  baseOptions: {
    adapter: fetchAdapter,
  },
});
delete configuration.baseOptions.headers['User-Agent'];

export const openai = new OpenAIApi(configuration);
