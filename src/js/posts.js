let config = require('./config.js');

let posts = {
    render: function () {
        let hashLocation = location.hash;
        let postStr = '';
        config.blogRef.doc(hashLocation.split('/')[1]).get().then(function (doc) {
            console.log(doc.data());
            if (doc.data()) {
                postStr += `<img class="blog-header-image" src="${doc.data().imageUrl}">
                <h1>${doc.data().title}</h1>
                <div class="post">${doc.data().detail}</div>`
                document.querySelector('.container').innerHTML = postStr;
            } else {
                document.querySelector('.container').innerHTML = 'OOPS!! 404'
            }
        }).catch(function (error) {
            console.log(error);
        })
    }
}

module.exports = posts;