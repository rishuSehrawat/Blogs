import config from './config.js';

const admin = {
  render: () => {
    let container = document.querySelector('.container');
    container.innerHTML = `<div class="inputArea">
        <input class="inputForm" type="text" id="titleInput" placeholder="Enter blog title here">
        <textarea class="inputForm" name="" id="descriptionInput" cols="30" rows="10"
          placeholder="Enter a short description here"></textarea>
        <textarea class="inputForm bigDescription" name="" id="bigDescription" cols="50" rows="30"
          placeholder="Enter blog here"></textarea>
          <input type="file" id="upload">
        <button class="inputForm" id="saveBlog">Save</button>
      </div>`;
    CKEDITOR.replace('bigDescription');
  }
}

export default admin;