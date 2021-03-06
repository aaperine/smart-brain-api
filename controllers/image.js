const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ba086c2aac6d4bde9d13450587292992'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}	

const handleImage = (req, res, db) => {
	const { id } = req.body;
		db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
	})
		.catch(err => {
			console.log(err)
		})
}

module.exports = {
	handleImage,
	handleApiCall
}