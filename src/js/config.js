module.exports = {
    blogRef: firebase.firestore().collection('blog-post-details'),
    storageRef: firebase.storage().ref()
}