const Coursex = require('./../Models/courseModel')
const Statsx = require('./../Models/statsModal')


module.exports = async (oldz, newz, courseId, byId = true) => {
  let DATE = new Date()
  let YY = DATE.getFullYear()
  let mm = String(DATE).split(' ')[1] // to get th second element of the generated array

  let thisMonth = `${mm}/${YY}`
  const statsx = await Statsx.findOne({month: thisMonth})

  console.log('byId')
  console.log(byId)
  let coursex
  if(byId === false ){
    coursex = await Coursex.findOne({courseCode: courseId})
  }else{
    coursex = await Coursex.findById(courseId)
  }

  const now = Date.now()

    switch(oldz.toUpperCase()){
        case "STUDENT":
            if(oldz !== newz && newz !== 'none'){
              if(newz === "deffered"){
                // UPDATE OR CREATE STATS STARTS

                if(statsx){
                    //Update stats
                    console.log('Update stats')
                    // stats.alumni += 1
                    statsx.students -= 1
                    statsx.deffered += 1
                    statsx.updated = now
                    statsx.save()// we want to allow validation

                    console.log('updated stats')
                    console.log(statsx)
                }
                else{
                    //Create stats
                    let StatsRecord = await Statsx.find()
                    let lastStatsRecord = { ...StatsRecord[StatsRecord.length - 1]}

                    console.log('Create stats')
                    let newStats = {
                        "month": thisMonth, 
                        "students": lastStatsRecord.students - 1,
                        "deffered": lastStatsRecord.deffered + 1,
                        "alumni": lastStatsRecord.deffered - 1
                    }

                    const newstats = await Statsx.create(newStats)
                    console.log('newstats')
                    console.log(newstats)
                }
                // UPDATE OR CREATE STATS ENDS

                // UPDATE OR COURSES STATUS STARTS
                // stats.alumni += 1
                coursex.students -= 1
                coursex.deffered += 1
                coursex.updated = now
                coursex.save()// we want to allow validation
                // UPDATE OR COURSES STATUS ENDs
              }
            }
          return(newz) // returns the new user stats to the authcontroller to update the user stats

        case "DEFFERED":
            if(oldz !== newz && newz !== 'none'){
              if(newz === "student"){
                // UPDATE OR CREATE STATS STARTS

                if(statsx){
                    //Update stats
                    console.log('Update stats')
                    // statsx.alumni += 1
                    statsx.students += 1
                    statsx.deffered -= 1
                    statsx.updated = now
                    statsx.save()// we want to allow validation

                    console.log('updated stats')
                    console.log(statsx)
                }
                else{
                    //Create stats
                    let StatsRecord = await Statsx.find()
                    let lastStatsRecord = { ...StatsRecord[StatsRecord.length - 1]}

                    console.log('Create stats')
                    let newStats = {
                        "month": thisMonth, 
                        "students": lastStatsRecord.students,
                        "deffered": lastStatsRecord.deffered,
                        "alumni": lastStatsRecord.deffered
                    }

                    const newstats = await Statsx.create(newStats)
                    console.log('newstats')
                    console.log(newstats)
                }
                // UPDATE OR CREATE STATS ENDS

                // UPDATE OR COURSES STATUS STARTS
                // coursex.alumni += 1
                coursex.students += 1
                coursex.deffered -= 1
                coursex.updated = now
                coursex.save()// we want to allow validation
                // UPDATE OR COURSES STATUS ENDs
              }
            }
            return(newz)  // returns the new user stats to the authcontroller to update the user stats   
        case "ALUMNI":
          if(oldz !== newz && newz !== 'none'){
            if(newz === "student"){
              // UPDATE OR CREATE STATS STARTS

              if(statsx){
                  //Update stats
                  console.log('Update stats')
                  statsx.alumni -= 1
                  statsx.students += 1
                  // statsx.deffered += 1
                  statsx.updated = now
                  statsx.save()// we want to allow validation

                  console.log('updated stats')
                  console.log(statsx)
              }
              else{
                  //Create stats
                  let StatsRecord = await Statsx.find()
                  let lastStatsRecord = { ...StatsRecord[StatsRecord.length - 1]}

                  console.log('Create stats')
                  let newStats = {
                      "month": thisMonth, 
                      "students": lastStatsRecord.students + 1,
                      "alumni": lastStatsRecord.deffered - 1,
                      "deffered": lastStatsRecord.deffered
                  }

                  const newstats = await Statsx.create(newStats)
                  console.log('newstats')
                  console.log(newstats)
              }
              // UPDATE OR CREATE STATS ENDS

              // UPDATE OR COURSES STATUS STARTS
              coursex.alumni += 1
              // coursex.students -= 1
              coursex.deffered += 1
              coursex.updated = now
              coursex.save()// we want to allow validation
              // UPDATE OR COURSES STATUS ENDs
            }
          }
          return(newz) // returns the new user stats to the authcontroller to update the user stats
          case "NEWCOURSE":
            if(oldz !== newz && newz !== 'none'){
              if(newz === "student"){
                // UPDATE OR CREATE STATS STARTS
              let result = false
                if(statsx){
                    //Update stats
                    console.log('Update stats')
                    // statsx.alumni -= 1 // not required for update
                    statsx.students += 1
                    // statsx.deffered += 1 // not required for update
                    statsx.updated = now
                    statsx.save()// we want to allow validation
  
                    console.log('updated stats')
                    console.log(statsx)
                }
                else{
                    //Create stats
                    let StatsRecord = await Statsx.find()
                    let lastStatsRecord = { ...StatsRecord[StatsRecord.length - 1]}
  
                    console.log('Create stats')
                    let newStats = {
                        "month": thisMonth, 
                        "students": lastStatsRecord.students + 1,
                        "alumni": lastStatsRecord.deffered,
                        "deffered": lastStatsRecord.deffered
                    }
  
                    const newstats = await Statsx.create(newStats)
                    console.log('newstats')
                    console.log(newstats)
                }
                // UPDATE OR CREATE STATS ENDS
  
                // UPDATE OR COURSES STATUS STARTS
                coursex.students += 1
                coursex.updated = now
                coursex.save()// we want to allow validation
                result = true
                // UPDATE OR COURSES STATUS ENDs
              }
            }
            return(newz) // returns the new user stats to the authcontroller to update the user stats
        default:
          return(oldz) // returns the old user stats to the authcontroller since no valid change made
      } 
}