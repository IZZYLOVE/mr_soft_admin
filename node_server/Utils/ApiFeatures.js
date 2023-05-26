class Apifeatures{
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }


    filter(){
        const excludeFilds = ['sort', 'page', 'limit', 'fields']
        const queryObj = {...this.queryStr}
        excludeFilds.forEach((el) => {
        delete queryObj[el]
        })

    // let querystr = JSON.stringify(this.queryStr)
    let querystr = JSON.stringify(queryObj)
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) =>`$${match}`)
    const queryObjnew = JSON.parse(querystr)
    this.query = this.query.find(queryObjnew)
    return this
    }


    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }
        else{
            this.query = this.query.sort('-created')
        }
        return this
    }


    limitfields(){
        if(this.queryStr.fields){
            const filedsBy = this.queryStr.fields.split(',').join(' ')
            this.query = this.query.sort(filedsBy)
            this.query = this.query.select(filedsBy)
        }
        else{
            this.query = this.query.select('-__v')
        }
        return this
    }

    paginate(){
        const page = (this.queryStr.page)*1 || 1
        const limit = (this.queryStr.limit)*1 || 20 // setting the default limit to 20
        const skips = (page - 1) * limit
        this.query = this.query.skip(skips).limit(limit)
        
     
        // if(this.queryStr.page){
        //     const countx = await Movie.countDocuments()
        //     if(skips >= countx){
        //         throw new Error('this page is not found')  
        //     }
        // }
    
        return this
    }
}


module.exports = Apifeatures