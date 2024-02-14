import { displayProjects, retrieveProjects, Project } from "./projectController"

export let projectsArray = retrieveProjects()
displayProjects(projectsArray)

let burgerIcon = document.getElementById("burger-icon")
let sideNav = document.getElementById("side-nav")
let sideNavDisplayed = false
let createProject = document.getElementById("plus")

let projectForm = document.getElementById("project-form")
let taskName = document.getElementById("task-name")
let taskAdd = document.getElementById("task-add")
let taskList = document.getElementById("task-list")
let formClose = document.getElementById("form-close")

createProject.addEventListener("click", function(){
    console.log("Testing again and again")
    projectForm.showModal()
})

taskAdd.addEventListener("click", function(){
    console.log(`${taskName.value}`)
    if(taskName.value == ""){
        alert("Task cannot be empty")
    }else{
        let task = document.createElement("li")
        let remove = document.createElement("span")
        remove.innerHTML = "x"
        remove.className = "remove"
        task.textContent = taskName.value
        task.addEventListener("click", function(){
            if(task.className == "checked"){
                task.className = ""
            }else{
                task.className = "checked"
            }
        })
        remove.addEventListener("click", function(){
            this.parentElement.remove()
        })
        task.appendChild(remove)
        taskList.appendChild(task)

        taskName.value = ""
    }
})

formClose.addEventListener("click", function(){
    console.log("Test close")
    projectForm.close()
})

burgerIcon.addEventListener("click", function(){
    if(sideNavDisplayed == false){
        sideNav.style.borderRight = "1px solid #000000"
        document.body.style.marginLeft = "300px"
        sideNav.style.width = "300px"
        sideNavDisplayed = true
    }
    else{
        sideNav.style.borderRight = ""
        document.body.style.marginLeft = "0px"
        sideNav.style.width = "0px"
        sideNavDisplayed = false
    }
})



let test = new Project("test","high", "99999", "gdksgndk", ["One", "Two", "Three"], ["Five"])  // Tasks in arrays when creating the objects/when dialog is finished
console.log(Object.keys(localStorage).length)
localStorage.setItem(Object.keys(localStorage).length, JSON.stringify(test))
projectsArray.push(test)
displayProjects(projectsArray)
// // add project to an array

// let newTest = JSON.stringify(test) // Loop through project array and stringify to local storage with set item


// console.log(JSON.parse(newTest).checkedTasks)

// localStorage.setItem("2", newTest)

// const keys = Object.keys(localStorage)
// for (let key of keys) {
//   console.log(`${key}: ${localStorage.getItem(key)}`) // needs to be parsed before object is created
// }

// // will need to loop through all objects and create html elements on start and then within a function for every time a project is created