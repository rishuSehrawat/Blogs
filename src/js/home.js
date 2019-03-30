import config from './config.js';

const home = {
    render: () => {
        let homeStr = '';
        config.blogRef.orderBy("id").get().then(function (snapshot) {
            snapshot.forEach(element => {
                homeStr = `<a href="/#/${element.data().id}"><div class="dataTemplate"><div class="post-template-image"><img src="${element.data().imageUrl}"></div><div class="post-details"><h3>${element.data().title}</h3><p>${element.data().shortDescription}</p></div></div></a>` + homeStr;
            });
            document.querySelector('.container').innerHTML = homeStr;
        }).catch(function () {
            document.querySelector('.container').innerHTML = 'Error happened while getting data from firebase!'
        })
    }
}

export default home;
