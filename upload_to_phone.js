const uploadFile = document.getElementById('uploadFile');
const uploadBtn = document.getElementById('uploadBtn')
const previewbox = document.getElementById('previewbox')

uploadFile.addEventListener('change', go)

function go() {
 const file = uploadFile.files[0];
 if (!file) return;

 const filetype = file.type;
 const fileURL = URL.createObjectURL(file);

 if (filetype.startsWith('image/')) {
  const img = document.createElement('img');
  img.src = fileURL;
  img.style.width = "200px"
  previewbox.innerHTML = '';
  previewbox.appendChild(img);
 }
}

//const finalsend = document.getElementById('sendBtn');

uploadBtn.addEventListener('click', serve)

function serve() {
 const file = uploadFile.files[0];
 if (!file) return alert('Please choose a file.');

 const formData = new FormData();
 formData.append('image', file)

 fetch('http://127.0.0.1:5000/upload', {
  method: 'POST',
  body: formData
 })
 .then(res => res.json())
 .then(data => {
  console.log(data)
  loadFiles();
 })
 .catch(error => {
  console.log(error)
 })
}
