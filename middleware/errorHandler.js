const errorHandler = (err, req, res, next)=>{
    console.error(err.stack);
    res.status(res.status || 500).json({
        success: false,
        message: err.message||'An unexpected error occurred'
    })
}

module.exports = errorHandler;