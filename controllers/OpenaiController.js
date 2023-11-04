const dotenv = require('dotenv');
dotenv.config();

// Import the OpenAI module from the 'openai' package
const OpenAI = require('openai');

// Create a new instance of the OpenAI class with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_SECRET // You need to set this environment variable
});


// This method translate the currently laguage into the other preferred language - It matches with the language part
exports.translateController = async(req, res) => {
    try{
        const {text} = req.body
        const {data} = await openai.createCompletion({
            model: "text-davinci-003", //The model I chose, probably change to other later
            prompt: `Translate this \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });
        if(data){
            if(data.choices[0].text){
                return res.status(200).json(data.choices[0].text);
            }
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: err.message
        })
    }
}

// This method tries to make the reading more readable - It matches with the reading level part
exports.explainController = async(req, res) => {
    try{
        const {text} = req.body
        const {data} = await openai.createCompletion({
            model: "text-davinci-003", //The model I chose, probably change to other later
            prompt: `Explain this \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });
        if(data){
            if(data.choices[0].text){
                return res.status(200).json(data.choices[0].text);
            }
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: err.message
        })
    }
}
