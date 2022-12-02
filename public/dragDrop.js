/* events fired on the draggable target */
const items = document.querySelectorAll(".item");
const holders = document.querySelectorAll(".list");

items.forEach(item => {
  let dragged;
  item.addEventListener('dragstart',(e)=>{
  dragged = e.target;
    const dataSendOver = {
      "text":item.getElementsByTagName('p')[0].textContent,
      "date":item.getElementsByTagName('p')[1].textContent,
      "_id":item.getElementsByTagName('p')[2].textContent
  }
    e.dataTransfer.clearData();
    e.dataTransfer.setData('text/plain',JSON.stringify(dataSendOver));
    item.classList.add('dragging');
    // console.log(JSON.stringify(dataSendOver));
  })
})

items.forEach(item => {
  item.addEventListener('dragend',()=>{
    item.classList.remove('dragging');
  })
})

holders.forEach(holder => {
  holder.addEventListener('dragover',(e)=>{
    e.preventDefault();
    const aftEle = getDragAfterElement(holder,e.clientY);
    const item = document.querySelector('.dragging');
    if (aftEle==null){
      holder.appendChild(item);
    } else{
      holder.insertBefore(item,aftEle);
    };
  });

  holder.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.className === "list") {
      dragged.parentNode.removeChild(dragged);
      e.target.appendChild(dragged);
    }
    let dataReceive = JSON.parse(e.dataTransfer.getData('text'));
    const taskStatus_dict = {
      "scoping":"Scoping",
      "wipList":"Work in Progress",
      "completedList":"Completed"
    };
    updateBackend();
    function updateBackend(){
      const listName = taskStatus_dict[holder.id];
      const taskText = dataReceive['text'];
      const taskDate = dataReceive['date'];
      const _id = dataReceive['_id']
      fetch('/api/update',{
        method:'POST',
        headers:{
        //   Accept:'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          "_id":_id,
          "task":taskText,
          "taskStatus":listName,
          "taskDateCreated":taskDate
        })
      }).then(()=>{console.log("Post Method Success!")}).catch((err)=>{console.log(err)});
    };
  },false);

})


function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}