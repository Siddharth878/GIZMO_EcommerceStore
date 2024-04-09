module.exports = fn =>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    };
}


// how this works still a doubt