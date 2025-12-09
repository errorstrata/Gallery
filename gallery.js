let files = document.getElementById('files');
let videos = document.getElementById('videos');
let images = document.getElementById('images');

files.addEventListener('click', () => setCurrent(files));
videos.addEventListener('click', () => setCurrent(videos));
images.addEventListener('click', () => setCurrent(images));

function setCurrent(activeBtn) {
  // Remove current class from all buttons
  [files, videos, images].forEach(btn => btn.classList.remove('current'));
  
  // Add current class to the clicked button
  activeBtn.classList.add('current');
}

let board = document.querySelector('.body')

function loadImages() {
 fetch('http://127.0.0.1:5000/files')
 .then(res => res.json())
 .then(data => {
  let images = data.files;
  images.forEach(image => {
    let imageType = image.type;
    if (imageType.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = `http://127.0.0.1:5000/files/${image}ˋ;
      img.classList.add('image')
      imageview_box.appendChild(image)
    }
    else if(fileType.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = ˋhttp://127.0.0.1:5000/files/${video}ˋ
      video.classList.add('video')
      videoview_box.appendChild(video)
    }
  })
 })
}

loadImages()
