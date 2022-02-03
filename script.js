let inputTextDom = document.getElementById("inputText");
let addBtnDom = document.getElementById("addBtn");
let taskBoxDom = document.getElementById("taskBox");
let taskTypesDom = document.querySelectorAll("#taskTypes div");
let taskList = [];
let filterList =[];
let type="all";

addBtnDom.addEventListener("click" , addTask );
inputTextDom.addEventListener("click" , ()=>{
  inputTextDom.value=null;
});

function enterkey(){
  if(window,event.keyCode == 13){
    addTask();
    inputTextDom.value=null;
  }
}

for(let i=1;i<taskTypesDom.length;i++) {
  taskTypesDom[i].addEventListener("click" , (event)=>{filter(event)})
}

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
  let list = [];

  if(type=="all"){
    list = taskList
  }else if(type == "notDone" ||type == "done") {
    list = filterList
  }

  for(let i=0;i<list.length;i++){
    if(list[i].isComplete==true){
      resultHTML +=`<div class="task">
      <div class="taskIsComplete taskStyle">
        ${list[i].inputValue}
      </div>
      <div class="btnFlex">
        <button class="cancleIcon btnStyle" onclick="taskComplete('${list[i].id}')">check</button>
        <button class="deleteIcon btnStyle" onclick="taskDelete('${list[i].id}')">delete</button>
      </div>
    </div>`
    }else{
    resultHTML +=`<div class="task">
    <div class="taskStyle">
      ${list[i].inputValue}
    </div>
    <div class="btnFlex">
      <button class="checkIcon btnStyle" onclick="taskComplete('${list[i].id}')">check</button>
      <button class="deleteIcon btnStyle" onclick="taskDelete('${list[i].id}')">delete</button>
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
    for(let i=0;i<filterList.length;i++) {
      if(filterList[i].id==id){
        filterList.splice(i,1)
        break;
      }
    }
  
  render();
}

function createId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function filter(event) {
  type = event.target.id;
  filterList =[];
  filterList = [];

  document.getElementById("underLine").style.width = event.target.offsetWidth + "px"
  document.getElementById("underLine").style.top = event.target.offsetHeight-4 + "px"
  document.getElementById("underLine").style.left = event.target.offsetLeft + "px"

  if(type=="all"){
    render ();
  }
  else if(type == "notDone"){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete == false){
        filterList.push(taskList[i])
      }
    }
    render();
  }
  else if(type == "done") {
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete == true){
        filterList.push(taskList[i])
      }
    }
    render();
  }
}