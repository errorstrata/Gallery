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
    alert(`this is the ${item}`)
    let image = `http://127.0.0.1:5000/files/${item}`
    let fileType = image.type;
    if (fileType.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = image;
      img.classList.add('photo')
      imageview_box.appendChild(img)
    }
    else if(fileType.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = image;
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
