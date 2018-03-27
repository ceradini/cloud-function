exports.testNLP = (event, callback) => {
	const language  = require('@google-cloud/language');

	const language_client = new language.LanguageServiceClient();

	// The text to analyze
	const text = 'Hello, world!';

	const document = {
	  content: text,
	  type: 'PLAIN_TEXT',
	};

	console.log(text);

	// Detects the sentiment of the text
	language_client
	.analyzeSentiment({document: document})
	.then(results => {
		console.log(results);
		const sentiment = results[0].documentSentiment;

		console.log(`Text: ${text}`);
		console.log(`Sentiment score: ${sentiment.score}`);
		console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
	})
	.catch(err => {
		console.error('ERROR:', err);
	});

	callback.send('END');
};