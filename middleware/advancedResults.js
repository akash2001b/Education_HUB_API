const { populate } = require("../models/Bootcamp");

 const advancedResults = function(model, populate){
    return async (req,res,next) =>{
        let query;
        // copy req.query
        const resQuery={...req.query};
    
        // fiels to exclude
        const removeFields=['select','sort','page','limit'];
    
        // loop over remove fileds and delete them for reqQuery
        removeFields.forEach( (p) => delete resQuery[p]);
    
        console.log(resQuery);  //testing.........
        console.log(req.query); //tesging..........
    
        // create query string
        let queryStr=JSON.stringify(resQuery);
    
        // create operators($gt,$gte ..etc)
        queryStr=queryStr.replace(/\b(gt|gte|lte|lt|in)\b/g, match=>`$${match}`);   
    
        // finding resourse
        query=model.find(JSON.parse(queryStr));
    
        // select fields
        if(req.query.select){
            const fields=req.query.select.split(',').join(' ');
            query.select(fields);
        }
    
        // sort
        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(" ");
            query=query.sort(sortBy);
        }else{
            query.sort('-createdAt');
        }
    
        //Pagination
        const page=parseInt(req.query.page,10) || 1;
        const limit=parseInt(req.query.limit,10) || 25;
        const startIndex=(page-1)*limit;
        const endIndex=page*limit;
        const total=await model.countDocuments();
    
        query=query.skip(startIndex).limit(limit);
        
        if(populate){
            query=query.populate(populate);
        }

        // executing query
        const results=await query;
    
        // pagination result
        const pagination={};
    
        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit:limit
            }
        }
        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit:limit
            }
        }

        res.advancedResults={
            success:true,
            count:results.length,
            pagination,
            data:results
        };

        next();    
    };
 }













 module.exports=advancedResults;