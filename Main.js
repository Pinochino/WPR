function job () {
    return new Promise(function (resolve, reject) {
        reject();
    } )
}
job().then(function() {
    console.log('success 1')
})
job().then(function() {
    console.log('success 1')
})
job().catch(function() {
    console.log('success 3')
})