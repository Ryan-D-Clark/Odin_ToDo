import { displayProjects, retrieveProjects, Project, newProject, displayToday, displayWeekly, displayAllTasks, createDefaultProjects } from "./projectController"

export let projectsArray = retrieveProjects()
if(projectsArray.length == 0){
    createDefaultProjects()
    projectsArray = retrieveProjects()

}
displayProjects(projectsArray)

let burgerIcon = document.getElementById("burger-icon")
let nav = document.getElementById("nav")
let sideNav = document.getElementById("side-nav")
let sideNavDisplayed = false
let displayProject = document.getElementById("plus")

let sideProjects = document.getElementById("side-projects")
let sideToday = document.getElementById("side-today")
let sideWeekly = document.getElementById("side-weekly")
let sideTasks = document.getElementById("side-tasks")
let contentTitle = document.getElementById("content-title")

let projectForm = document.getElementById("project-form")
let taskName = document.getElementById("task-name")
let taskAdd = document.getElementById("task-add")
let taskList = document.getElementById("task-list")
let formClose = document.getElementById("form-close")
let createProject = document.getElementById("create-project")

displayProject.addEventListener("click", function(){
    projectForm.showModal()
})

createProject.addEventListener("click", function(){
    newProject()
    projectForm.close()
})

taskAdd.addEventListener("click", function(){
    if(taskName.value == ""){
        alert("Task cannot be empty")
        return
    }else{
        let task = document.createElement("li")
        task.classList.add("incomplete-task")
        let remove = document.createElement("span")
        remove.innerHTML = "x"
        remove.className = "remove"
        task.textContent = taskName.value
        task.addEventListener("click", function(){
            if(task.classList.contains("incomplete-task")){
                task.classList.remove("incomplete-task")
                task.classList.add("completed-task")
            }
            else{
                task.classList.remove("completed-task")
                task.classList.add("incomplete-task")
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
    projectForm.close()
})

burgerIcon.addEventListener("click", function(){
    if(sideNavDisplayed == false){
        nav.style.width = "80%"
        sideNav.style.borderRight = "0.5px solid grey"
        document.body.style.marginLeft = "20%"
        sideNav.style.width = "20%"
        sideNavDisplayed = true
    }
    else{
        nav.style.width = "100%"
        sideNav.style.borderRight = ""
        document.body.style.marginLeft = "0"
        sideNav.style.width = "0"
        sideNavDisplayed = false
    }
})

sideToday.addEventListener("click", function(){
    displayToday()
    contentTitle.innerText = "Today's Projects"
    burgerIcon.click()
})

sideProjects.addEventListener("click", function(){
    displayProjects(projectsArray)
    contentTitle.innerText = "All Projects"
    burgerIcon.click()

})

sideWeekly.addEventListener("click", function(){
    displayWeekly()
    contentTitle.innerText = "Weekly Projects"
    burgerIcon.click()

})

sideTasks.addEventListener("click", function(){
    displayAllTasks()
    contentTitle.innerText = "All Tasks"
    burgerIcon.click()

})