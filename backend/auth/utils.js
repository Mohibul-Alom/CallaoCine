const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
    //Minimum eight characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return re.test(String(password));
};

const throwError = (status, msg, done) => {
    const error = new Error(msg);
    error.status = status;
    return done(error);
}

module.exports = {
    isValidEmail,
    isValidPassword,
    throwError,
}
