module.exports = (count) => {

    console.log('count')
    console.log(count) 

    if( count === 0){
            throw new Error('this page is not found')  
    }
}