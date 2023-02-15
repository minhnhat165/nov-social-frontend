import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export default openai;
