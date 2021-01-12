class AuthError extends Error {
	constructor(){
		super('You do not have access');

		this.name = 'AuthError';
		this.status = 403;
	//	this.message = 'You do not have access';
	}

	// definir métodos
	toJson(){

		return{
			name: this.name,
			status: this.status,
			message: this.message,
		};
	}

}

module.exports = AuthError;
