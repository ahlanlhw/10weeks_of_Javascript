/* events fired on the draggable target */
const items = document.querySelectorAll(".item");
const itemList = document.querySelectorAll(".list");
let dragged;
for (let k = 0;k<items.length;k++){
  const item = items[k];
  item.addEventListener("drag", (e) => {
    console.log("dragging");
  });
  
  item.addEventListener('dragstart',function(e){
    dragged = e.target;
    e.target.classList.add('dragging');
    setTimeout(function(){
      item.style.display='none';
    },0);
  })
  item.addEventListener('dragend',function(e){
    e.target.classList.remove("dragging");
    setTimeout(function(){
      dragged.style.display = 'block';
      dragged=null;
    },0)
  })
  for (let j =0;j<itemList.length;j++){
    const l = itemList[j];
    l.addEventListener('dragover',function(e){
      e.preventDefault();
    },false);
    l.addEventListener('dragenter',function(e){
      if (e.target.classList.contains("list")){
        e.target.classList.add("dragover");
      }
      e.preventDefault();
    },false);
    l.addEventListener('drop',function(e){
      e.preventDefault();
      if (e.target.classList.contains("list")) {
        e.target.classList.remove("dragover");
        dragged.parentNode.removeChild(dragged);
        e.target.appendChild(dragged);
      }
    })
  }
}