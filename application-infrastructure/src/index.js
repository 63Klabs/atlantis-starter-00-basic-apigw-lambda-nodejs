const AWSXRay = require('aws-xray-sdk');

console.log ("COLD START");

const answers = [ 
	"It is certain",
	"It is decidedly so",
	"Without a doubt",
	"Yes definitely",
	"You may rely on it",
	"As I see it, yes",
	"Most likely",
	"Outlook good",
	"Yes",
	"Signs point to yes",
	"Reply hazy try again",
	"Ask again later",
	"Better not tell you now",
	"Cannot predict now",
	"Concentrate and ask again",
	"Don't count on it",
	"My reply is no",
	"My sources say no",
	"Outlook not so good"
];

/**
 * This is the get function for your application referred to in the SAM 
 * template. It should be kept simple and used as the handler for the 
 * request. Business logic should be put in processRequest()
 * 
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 * @returns 
 */
exports.handler = async (event, context, callback) => {
	// Create a new segment for the Lambda function
	const segment = AWSXRay.getSegment();
	const subsegment = segment.addNewSubsegment('handler');
		
	let response = null;

    try {
        
        response = processRequest(event, context); // process the request and wait for the result
        
    } catch (error) {
		// send error message and trace to CloudWatch logs
		console.error(`Error in 7G: ${error.message}`, error.stack);
		subsegment.addError(error);
        response = {
			statusCode: 500,
			body: JSON.stringify({ status: 500, message: 'Internal server error in 7G' }),
			headers: {'content-type': 'application/json'}
		};
    } finally {
		subsegment.close();
		callback(null, response); // send the result back to Gateway API
	}	
};

/**
 * Process the request
 * 
 * @param {array} event The event passed to the lambda function
 * @param {array} context The context passed to the lambda function
 * @returns {array} Response to send up to AWS API Gateway
 */
const processRequest = function(event, context) {


	const rand = Math.floor(Math.random() * answers.length);

	const prediction = answers[rand];

	// Gets sent to CloudWatch logs. Check it out!
	console.log(`Prediction log: ${prediction}`);

	return {
		statusCode: 200,
		body: JSON.stringify( { prediction } ),
		headers: {'content-type': 'application/json'}
	}; 

};