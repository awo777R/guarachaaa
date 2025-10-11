// --- Enlaces externos ---
document.getElementById('btnGoogle').onclick = () => window.open('https://www.google.com','_blank');
document.getElementById('btnIG').onclick     = () => window.open('https://www.instagram.com','_blank');
document.getElementById('btnFB').onclick     = () => window.open('https://www.facebook.com','_blank');

// --- Foro ---
let posts = [
  { title:'Remix urbano en la Plaza 8', body:'Se armó una rumba el viernes con guaracha 🔥', category:'eventos' },
  { title:'Nuevo track: “Baila hasta el amanecer”', body:'Subí una versión de 2 minutos, feedback please.', category:'tracks' }
];
function renderPosts(){
  const postsEl = document.getElementById('posts');
  postsEl.innerHTML = '';
  posts.forEach((p,i)=>{
    const div = document.createElement('div');
    div.className='post';
    div.innerHTML = `<h3>${p.title}</h3><p>${p.body}</p>
      <small>${p.category}</small>
      <div style="margin-top:8px">
        <button class="btn btn-ghost" onclick="removePost(${i})">Eliminar</button>
      </div>`;
    postsEl.appendChild(div);
  });
}
function removePost(i){ posts.splice(i,1); renderPosts(); }
document.getElementById('btnPublish').onclick = ()=>{
  const t=document.getElementById('postTitle').value.trim();
  const b=document.getElementById('postBody').value.trim();
  const c=document.getElementById('postCategory').value;
  if(!t||!b){alert('Completa título y descripción');return;}
  posts.unshift({title:t,body:b,category:c});
  document.getElementById('postTitle').value='';
  document.getElementById('postBody').value='';
  renderPosts();
};
renderPosts();

// --- Tienda ---
const products=[
  {name:'Track Guaracha Vol.1',price:'$4.99'},
  {name:'Camisa GuarachaQ',price:'$19.99'},
  {name:'Entrada Privado',price:'$9.99'}
];
function renderProducts(){
  const productsEl=document.getElementById('products');
  productsEl.innerHTML='';
  products.forEach(p=>{
    const d=document.createElement('div');
    d.className='product';
    d.innerHTML=`<div><strong>${p.name}</strong><br><small>${p.price}</small></div>
    <button class="btn btn-primary" onclick="alert('Compra simulada')">Comprar</button>`;
    productsEl.appendChild(d);
  });
}
renderProducts();

// --- Reproductor de música ---
let tracks=[];
const audioPlayer=document.getElementById('audioPlayer');
const playlistEl=document.getElementById('playlist');

document.getElementById('audioFiles').addEventListener('change',e=>{
  const files=[...e.target.files];
  files.forEach(f=>{
    if(f.type.startsWith('audio/')){
      const url=URL.createObjectURL(f);
      tracks.push({name:f.name,url});
    }
  });
  updatePlaylist();
});

function updatePlaylist(){
  playlistEl.innerHTML='';
  tracks.forEach((t,i)=>{
    const div=document.createElement('div');
    div.className='track';
    div.innerHTML=`<span>${t.name}</span>
    <div>
      <button onclick="playTrack(${i})">▶</button>
      <button onclick="removeTrack(${i})">✖</button>
    </div>`;
    playlistEl.appendChild(div);
  });
  if(tracks.length>0) audioPlayer.style.display='block';
}
function playTrack(i){ audioPlayer.src=tracks[i].url; audioPlayer.play(); }
function removeTrack(i){
  tracks.splice(i,1); updatePlaylist();
  if(tracks.length===0){ audioPlayer.pause(); audioPlayer.style.display='none'; }
}
document.getElementById('playBtn').onclick=()=>{ if(!audioPlayer.src && tracks[0]) audioPlayer.src=tracks[0].url; audioPlayer.play(); };
document.getElementById('pauseBtn').onclick=()=> audioPlayer.pause();
document.getElementById('stopBtn').onclick=()=>{ audioPlayer.pause(); audioPlayer.currentTime=0; };
