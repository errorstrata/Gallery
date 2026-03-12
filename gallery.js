let files = document.getElementById('files');
let videos = document.getElementById('videos');
let images = document.getElementById('images');
let documents = document.getElementById('documents')
let view_box = document.getElementById('view_box');

files.addEventListener('click', () => setCurrent(files));
videos.addEventListener('click', () => setCurrent(videos));
images.addEventListener('click', () => setCurrent(images));
documents.addEventListener('click', () => setCurrent(documents));

function setCurrent(activeBtn) {
  // Remove current class from all buttons
  [files, videos, images, documents].forEach(btn => btn.classList.remove('current'));
  
  // Add current class to the clicked button
  activeBtn.classList.add('current');
  selectiveDisplay(activeBtn.id)
}

function selectiveDisplay(displaying) {
  imageview_box.classList.add("notSelected")
  videoview_box.classList.add("notSelected")
  documents.classList.add("notSelected")

  if (displaying === "files") view_box.classList.remove("notSelected")
  if (displaying === "images") view_box.classList.remove("notSelected")
  if (displaying === "videos") view_box.classList.remove("notSelected")  
}

function loadImages() {
  fetch('http://127.0.0.1:5000/files')
  .then(res => res.json())
  .then(data => {
   let images = data.files;
   images.forEach(item => {
    //get the extension.toLowerCase();
    let ext = item.split('.').pop().toLowerCase()
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
      video.controls = true
      video.classList.add('photo')
      videoview_box.appendChild(video)
    }
    else if (['pdf'].includes(ext)) {
      const link = document.createElement('a')
      link.href = url;
      link.textContent = `📄 ${item}`;
      link.download = item;
      link.classList.add('photo')
      imageview_box.appendChild(link);
    }
  })
 })
 .catch(err => {
   alert("error: ", err.message)
 });
}

loadImages()
