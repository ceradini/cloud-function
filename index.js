exports.testNLP = (event, callback) => {
	const language  = require('@google-cloud/language');

	const language_client = new language.LanguageServiceClient();

	// The text to analyze
	const text = 'Ciao a tutti. Oggi è una bella giornata e sono contento. Per domani è prevista pioggia e sarà una giornata bruttissima';

	const document = {
	  content: text,
	  type: 'PLAIN_TEXT',
	  language: 'it',

	};

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

	callback.send('END3');
};