class ValidationError extends Error {
	constructor(error){
		super(error.message);

		this.name = 'Validation Error';
		this.status = 400
		this.path = error.path;
	}

	// definir métodos
	toJson(){

		return{
			name: this.name,
			status: this.status,
			message: this.message,
			path: this.path,
		};
	}

}

module.exports = ValidationError;
