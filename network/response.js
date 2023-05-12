exports.success = (req,res, message,status) =>{

    res.status(status || 200).send({
        "error": "",
        "body": message
    });

}

exports.error = (req,res,error,status, details) =>{
    //En el server
    console.error('[response error]: \t' + details);
    //En cliente
    res.status(status || 500).send({
        "error": error,
        "body": ""
    });
}

