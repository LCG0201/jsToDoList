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
    id: createId(),
    inputValue: inputTextDom.value,
    isComplete: false
  }

  if(taskObject.inputValue==""){
    return;
  }

  taskList.push(taskObject);
  render();
}

function render() {
  let resultHTML = '';

  for(let i=0;i<taskList.length;i++){
    if(taskList[i].isComplete==true){
      resultHTML +=`<div class="task">
      <div class="taskIsComplete">
        ${taskList[i].inputValue}
      </div>
      <div>
        <button onclick="taskComplete('${taskList[i].id}')">check</button>
        <button onclick="taskDelete('${taskList[i].id}')">delete</button>
      </div>
    </div>`
    }else{
    resultHTML +=`<div class="task">
    <div class>
      ${taskList[i].inputValue}
    </div>
    <div>
      <button onclick="taskComplete('${taskList[i].id}')">check</button>
      <button onclick="taskDelete('${taskList[i].id}')">delete</button>
    </div>
  </div>`
    }
  }

  taskBoxDom.innerHTML = resultHTML;
}

function taskComplete(id) {
  
  for(let i=0;i<taskList.length;i++) {
    if(taskList[i].id==id){
      taskList[i].isComplete=!taskList[i].isComplete;
      console.log(taskList[i].isComplete);
    }
  }

  render();
}

function taskDelete(id) {
  
  for(let i=0;i<taskList.length;i++) {
    if(taskList[i].id==id){
      taskList.splice(i,1)
      break;
    }
  }

  render();
}

function createId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}