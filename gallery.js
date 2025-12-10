let files = document.getElementById('files');
let videos = document.getElementById('videos');
let images = document.getElementById('images');
let imageview_box = document.getElementById('imagebox');
let videoview_box = document.getElementById('videobox');

files.addEventListener('click', () => setCurrent(files));
videos.addEventListener('click', () => setCurrent(videos));
images.addEventListener('click', () => setCurrent(images));

function setCurrent(activeBtn) {
  // Remove current class from all buttons
  [files, videos, images].forEach(btn => btn.classList.remove('current'));
  
  // Add current class to the clicked button
  activeBtn.classList.add('current');
}

function loadImages() {
  fetch('http://127.0.0.1:5000/files')
  .then(res => res.json())
  .then(data => {
   let images = data.files;
   images.forEach(item => {
    //get the extension
    let ext = item.split('.').pop().toLowerCase();
    //alert(`this is the ${item}`)
    let url = `http://127.0.0.1:5000/files/${item}`
    //check for file type by extension
    if (['png','jpg','jpeg','gif','webp'].includes(ext)) {
      const img = document.createElement('img');
      img.src = url;
      img.classList.add('photo')
      imageview_box.appendChild(img)
    }
    else if (['mp4','mov','avi','mkv'].includes(ext)) {
      const video = document.createElement('video');
      video.src = url;
      video.classList.add('photo')
      videoview_box.appendChild(video)
    }
  })
 })
 .catch(err => {
   alert("error: ", data.message)
 });
}

loadImages()
