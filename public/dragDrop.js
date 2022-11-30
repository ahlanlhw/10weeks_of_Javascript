/* events fired on the draggable target */
const items = document.querySelectorAll(".item");
const holders = document.querySelectorAll(".list");

items.forEach(item => {
  item.addEventListener('dragstart',()=>{
    item.classList.add('dragging');
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
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}