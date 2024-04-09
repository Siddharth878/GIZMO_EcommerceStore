class ApiFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
    


    search()
    {   
    
        const keyword = this.queryString.keyword?{
            name:{
                $regex:this.queryString.keyword,
                $options:"i", // i means insensitive means for ex. abc and ABC both will be accepted 
            },
        }:{};

        // console.log(keyword);

        this.query = this.query.find({...keyword});

        return this;

    }
    filter()
    {   
        
        const queryObj = {...this.queryString};

        
        const excludedFields = ['keyword','page','sort','limit','fields'];
        excludedFields.forEach(el=>delete queryObj[el]);
        

        
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>
            `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    paginate(resultPerPage){
         

        const page = Number(this.queryString.page)||1;
        // const limit = this.queryString.limit*1||100;
        const limit = resultPerPage;
        const skip  = limit*(page-1);

        this.query = this.query.limit(limit).skip(skip);
        return this;

    }
}

module.exports = ApiFeatures;
