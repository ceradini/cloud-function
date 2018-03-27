exports.testNLP = (event, callback) => {
	const language  = require('@google-cloud/language');

	const language_client = new language.LanguageServiceClient();

	// The text to analyze
	const text = 'Ciao a tutti. Oggi è una bella giornata e sono contento. Per domani è prevista pioggia e sarà una giornata bruttissima';

	const document = {
	  content: text,
	  type: 'PLAIN_TEXT',
	  language: 'it'
	};

	// Detects the sentiment of the text
	language_client
	.analyzeSentiment({document: document})
	.then(results => {
		const sentences = results[0].sentences;
		sentences.forEach(sentence => {
	        console.log(`Sentence: ${sentence.text.content}`);
	        console.log(`Score: ${sentence.sentiment.score}`);
	        console.log(`Magnitude: ${sentence.sentiment.magnitude}`);
		});
	})
	.catch(err => {
		console.error('ERROR:', err);
	});

	callback.send('END');
};