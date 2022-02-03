let inputTextDom = document.getElementById("inputText");
let addBtnDom = document.getElementById("addBtn");
let taskBoxDom = document.getElementById("taskBox");
let taskList = [];

addBtnDom.addEventListener("click" , addTask );
inputTextDom.addEventListener("click" , ()=>{
  inputTextDom.value=null;
});

function addTask() {
  let taskObject = {
    inputValue: inputTextDom.value,
    isComplete: false
  };

  if(taskObject.inputValue==""){
    return;
  };

  taskList.push(taskObject);
  render();
}

function render() {
  let resultHTML = '';

  for(let i=0;i<taskList.length;i++){
    resultHTML +=`<div class="task">
    <div class>
      ${taskList[i].inputValue}
    </div>
    <div>
      <button onclick="taskComplete(${i})">check</button>
      <button >delete</button>
    </div>
  </div>`
  };

  taskBoxDom.innerHTML = resultHTML;
}

function taskComplete(i) {
  taskList[i].isComplete=taskList[i].isComplete?false:true;
  console.log(taskList);
}