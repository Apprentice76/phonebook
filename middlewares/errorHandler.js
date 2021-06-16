const errorHandler = (e, request, response, next) => {
    console.error("Error:", e.message, e.errors);

    // 1. Person validation failed: name: Path `name` (`t`) is shorter than the minimum allowed length (3). minlength

    // 2. 
    
    next();
};

module.exports = errorHandler;