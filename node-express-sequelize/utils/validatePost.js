module.exports = ({ content, title }) => {
	let errors = {};
	let valid = true;
	if (content.trim() === '') {
		errors.content = 'Body of post must not be empty !';
		valid = false;
	}

	if (title.trim() === '') {
		errors.title = 'Title of post must not be empty!';
		valid = false;
	}
	return {
		errors,
		valid
	};
};
