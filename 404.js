exports.notFound = (req,res,next)=>{
    var error = new Error("Not found")
    error.status = 404;
    next(error);
}

exports.Internal = (error,req,res,next)=>{
    error.status = (error.status || 500 );
    res
    .status(error.status)
    .json({
        message:error.message
    })
}