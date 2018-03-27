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
		var sentiment_result = [];
		const sentences      = results[0].sentences;
		var local_sentence   = '';
		var local_score      = '';
		var local_magnitude  = '';

		sentences.forEach(sentence => {
			local_sentence   = sentence.text.content;
			local_score      = sentence.sentiment.score;
			local_magnitude  = sentence.sentiment.magnitude;

			sentiment_result.push({sentence: local_sentence, score: local_score, magnitude: local_magnitude});
	        console.log(`2. Sentence: ${sentence.text.content}`);
	        console.log(`2. Score: ${sentence.sentiment.score}`);
	        console.log(`2. Magnitude: ${sentence.sentiment.magnitude}`);
		});
	})
	.catch(err => {
		console.error('ERROR:', err);
	});


	callback.contentType('application/json');
	callback.send(JSON.stringify(sentiment_result));
};