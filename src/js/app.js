import config from './config.js';
import home from './home.js';
import posts from './posts.js';
import admin from './admin.js';

const render = () => {
    let hashLocation = location.hash;
    if (!hashLocation || hashLocation === '#/home') {
        home.render();
    } else if (hashLocation === '#/admin') {
        admin.render();
        document.getElementById('saveBlog').addEventListener('click', saveBlog);
    } else {
        posts.render();
    }

}
const saveBlog = () => {
    document.querySelector('.overlay').style.display = 'block';
    let titleInput = document.getElementById('titleInput').value;
    let descriptionInput = document.getElementById('descriptionInput').value;
    let bigDescription = CKEDITOR.instances.bigDescription.getData();
    let selectedFile = document.getElementById('upload').files[0];
    let imageUrl;
    let nextID;
    config.blogRef.get().then(function (snapshot) {
        let newID = snapshot.size;
        nextID = ++newID;
    }).then(function () {
        let uploadTask = config.storageRef.child('/post-images/' + nextID).put(selectedFile);
        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                imageUrl = downloadURL;
                config.blogRef.doc(nextID.toString()).set({
                    detail: bigDescription,
                    id: nextID,
                    shortDescription: descriptionInput,
                    title: titleInput,
                    imageUrl: imageUrl
                }).then(function () {
                    document.querySelector('.overlay img').classList.remove('animate');
                    document.querySelector('.overlay img').setAttribute('src', 'images/success.png');
                    setTimeout(cleanup, 1000);
                })
            });
        });
    });
};

const cleanup = () => {
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = '';
    CKEDITOR.instances.bigDescription.setData('');
    document.getElementById('upload').value = '';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.overlay img').classList.add('animate');
    document.querySelector('.overlay img').setAttribute('src', 'images/loader.png');
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);