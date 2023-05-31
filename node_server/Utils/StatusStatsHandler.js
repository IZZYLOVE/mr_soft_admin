const Course = require('./../Models/courseModel')
const Stats = require('./../Models/statsModal')


// "alumni": {type: Number, default: 0, trim: true},
// "students": {type: Number, default: 0, trim: true},
// "deffered": {type: Number, default: 0, trim: true},

module.exports = async (oldz, newz, courseId) => {
  let DATE = new Date()
  let YY = DATE.getFullYear()
  let mm = DATE.getMonth()
  if(mm <= 9){
      mm = `0${mm}`
  }
  let thisMonth = `${mm}/${YY}`
  const stats = await Stats.findOne({month: thisMonth})
  const course = await Course.findById(courseId)

    switch(old.toUpperCase()){
        case "STUDENT":
            if(oldz !== newz && newz !== 'none'){
              if(newz === "deffered"){
                // UPDATE OR CREATE STATS STARTS

                if(stats){
                    //Ppdate stats
                    console.log('Update stats')
                    stats.alumni += 1
                    stats.students += 1
                    stats.deffered += 1
                    stats.updated = Date.now()
                    stats.save()// we want to allow validation

                    console.log('updated stats')
                    console.log(stats)
                }
                else{
                    //Create stats
                    console.log('Create stats')
                    let newStats = {
                        "month": thisMonth,
                        "regCount": 1
                    }

                    const newstats = await Stats.create(newStats)
                    console.log('newstats')
                    console.log(newstats)
                }
                // UPDATE OR CREATE STATS ENDS
              }
            }
          return(newz) 
        case "DEFFERED":
          return({...cartItems, [itemId]:cartItems[itemId]-1})      
        case "ALUMNI":
          return({...cartItems, [itemId]:newcount})
        default:
          return(old)
      } 
}