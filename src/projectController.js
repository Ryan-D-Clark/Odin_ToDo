import { projectsArray } from ".";
import {format,getDate,isSame, isSameWeek, isThisWeek, } from "date-fns"


let contentContainer = document.getElementById("content-container")
let refresh = document.getElementById("refresh")

let formInputName = document.getElementById("pname")
let formInputPriority = document.getElementById("ppriority")
let formInputDate = document.getElementById("pdate")
let formInputDescription = document.getElementById("pdescription")
let formCompletedTaskList = document.getElementsByClassName("completed-task")
let formIncompleteTaskList = document.getElementsByClassName("incomplete-task")

refresh.addEventListener("click", function(){
    for(let i = 0; i < projectsArray.length; i++){
        localStorage.setItem(i, JSON.stringify(projectsArray[i]))
    }
    retrieveProjects(projectsArray)
})

export class Project{
    constructor(name, priority, date, description, checkedTasks, tasks){
        this.name = name;
        this.priority = priority;
        this.date = date;
        this.description = description;
        this.checkedTasks = checkedTasks;
        this.tasks = tasks;

    }
}

export function createDefaultProjects(){
    let project = new Project("Clean House", "low", format(new Date(), 'yyyy-MM-dd'), "A Project that is set for today", ["Hoover Stairs", "Clean bathroom"], ["Cut grass", "Wash pots", "Tidy bedroom"])
    let projectDaily = new Project("Make Salt & Pepper Chips", "high", format(new Date(), 'yyyy-MM-dd'), "A Project that is set for today", ["Buy ingredients", "Prepare Vegetables", "Put chips in airfryer"], ["Start cooking"])
    let projectWeekly = new Project("Finish Project", "medium", "2024-01-11", "A Project that is set to test the week", ["Finish Code", "Delete lots of code"], ["Upload to GitHub"])
    localStorage.setItem(0,JSON.stringify(project))
    localStorage.setItem(1,JSON.stringify(projectDaily))
    localStorage.setItem(2,JSON.stringify(projectWeekly))
}

export function newProject(){

    let completedTasksList = []
    let incompleteTasksList = []

    for(let i = 0; i <= formCompletedTaskList.length -1 ; i++){
        completedTasksList.push(formCompletedTaskList[i].childNodes[0].nodeValue)
    }
    for(let i = 0; i <= formIncompleteTaskList.length -1 ; i++){
        incompleteTasksList.push(formIncompleteTaskList[i].childNodes[0].nodeValue)
    }

    let project = new Project(formInputName.value, formInputPriority.value, formInputDate.value, formInputDescription.value, completedTasksList, incompleteTasksList)
    let keys = Object.keys(localStorage)

    localStorage.setItem(keys.length, JSON.stringify(project))
    displayProjects(retrieveProjects())
}


export function retrieveProjects(){
    const newArray = []
    let keys = Object.keys(localStorage)
    keys.reverse()
    console.log(keys)
    for(let i of keys){
        newArray.push(JSON.parse(localStorage.getItem(i)))
    }
    console.log(newArray)
    return newArray
}

export function displayProjects(array){
    contentContainer.innerHTML = ""
    for(let i in array){
        let project = document.createElement("div")
        project.classList.add("project")
        switch (array[i]["priority"]){
            case "high":
                project.classList.add("high")
                break;
            case "medium":
                project.classList.add("medium")
                break;
            case "low":
                project.classList.add("low")
                break;
        }

        let ptitle = document.createElement("div")
        ptitle.textContent = array[i]["name"]
        ptitle.className = "ptitle"
        project.appendChild(ptitle)

        let pdescription = document.createElement("div")
        pdescription.textContent = `"${array[i]["description"]}"`
        pdescription.className = "pdescription"
        project.appendChild(pdescription)

        let pdate = document.createElement("div")
        pdate.innerHTML = `<br>Due Date: ${array[i]["date"]}<br>`
        pdate.className = "pdate"
        project.appendChild(pdate)

        let text = document.createElement("div")
        text.innerText = "Completed Tasks:"
        text.className = "text-title"
        project.appendChild(text)

        let checkedContainer = document.createElement("div")
        checkedContainer.id = "checked-container"
        for(let x in array[i]["checkedTasks"]){
            let task = document.createElement("div")
            let taskText = array[i]["checkedTasks"][x]
            task.addEventListener("click", function(){
                if(task.parentNode.id == "unchecked-container"){
                    checkedContainer.append(task)
                    array[i]["checkedTasks"].push(taskText)
                    array[i]["tasks"] = array[i]["tasks"].filter(item => item !== taskText)
                }else{
                    uncheckedContainer.append(task)
                    array[i]["tasks"].push(taskText)
                    array[i]["checkedTasks"] = array[i]["checkedTasks"].filter(item => item !== taskText)
                
                }
                console.log(array[i])

            })
            task.classList.add("task")
            task.innerText = array[i]["checkedTasks"][x]
            checkedContainer.appendChild(task)
        }
        project.appendChild(checkedContainer)

        text = document.createElement("div")
        text.innerText = "Uncompleted Tasks:"
        text.className = "text-title"
        project.appendChild(text)
        let uncheckedContainer = document.createElement("div")
        uncheckedContainer.id = "unchecked-container"
        for(let x in array[i]["tasks"]){
            let task = document.createElement("div")
            let taskText = array[i]["tasks"][x]
            task.addEventListener("click", function(){
                if(task.parentNode.id == "checked-container"){
                    uncheckedContainer.append(task)
                    array[i]["tasks"].push(taskText)
                    array[i]["checkedTasks"] = array[i]["checkedTasks"].filter(item => item !== taskText)
                }else{
                    checkedContainer.append(task)
                    array[i]["checkedTasks"].push(taskText)
                    array[i]["tasks"] = array[i]["tasks"].filter(item => item !== taskText)
                
                }
                console.log(array[i])
            })
            task.classList.add("task")
            task.innerText = array[i]["tasks"][x]
            uncheckedContainer.appendChild(task)
        }
        project.appendChild(uncheckedContainer)

        contentContainer.appendChild(project)
    }
    
}

function displaySingleProject(projectObject){
        let project = document.createElement("div")
        project.classList.add("project")
        switch (projectObject["priority"]){
            case "high":
                project.classList.add("high")
                break;
            case "medium":
                project.classList.add("medium")
                break;
            case "low":
                project.classList.add("low")
                break;
}
        let ptitle = document.createElement("div")
        ptitle.textContent = projectObject["name"]
        ptitle.className = "ptitle"
        project.appendChild(ptitle)

        let pdescription = document.createElement("div")
        pdescription.textContent = `"${projectObject["description"]}"`
        pdescription.className = "pdescription"
        project.appendChild(pdescription)

        let pdate = document.createElement("div")
        pdate.innerHTML = `<br>Due Date: ${projectObject["date"]}<br>`
        pdate.className = "pdate"
        project.appendChild(pdate)

        let text = document.createElement("div")
        text.innerText = "Completed Tasks:"
        text.className = "text-title"
        project.appendChild(text)

        let checkedContainer = document.createElement("div")
        checkedContainer.id = "checked-container"
        for(let x in projectObject["checkedTasks"]){
            let task = document.createElement("div")
            let taskText = projectObject["checkedTasks"][x]
            task.addEventListener("click", function(){
                if(task.parentNode.id == "unchecked-container"){
                    checkedContainer.append(task)
                    projectObject["checkedTasks"].push(taskText)
                    projectObject["tasks"] = projectObject["tasks"].filter(item => item !== taskText)
                }else{
                    uncheckedContainer.append(task)
                    projectObject["tasks"].push(taskText)
                    projectObject["checkedTasks"] = projectObject["checkedTasks"].filter(item => item !== taskText)
                
                }
            })
            task.classList.add("task")
            task.innerText = projectObject["checkedTasks"][x]
            checkedContainer.appendChild(task)
        }
        project.appendChild(checkedContainer)

        text = document.createElement("div")
        text.innerText = "Uncompleted Tasks:"
        text.className = "text-title"
        project.appendChild(text)
        let uncheckedContainer = document.createElement("div")
        uncheckedContainer.id = "unchecked-container"
        for(let x in projectObject["tasks"]){
            let task = document.createElement("div")
            let taskText = projectObject["tasks"][x]
            task.addEventListener("click", function(){
                if(task.parentNode.id == "checked-container"){
                    uncheckedContainer.append(task)
                    projectObject["tasks"].push(taskText)
                    projectObject["checkedTasks"] = projectObject["checkedTasks"].filter(item => item !== taskText)
                }else{
                    checkedContainer.append(task)
                    projectObject["checkedTasks"].push(taskText)
                    projectObject["tasks"] = projectObject["tasks"].filter(item => item !== taskText)
                
                }
            })
            task.classList.add("task")
            task.innerText = projectObject["tasks"][x]
            uncheckedContainer.appendChild(task)
        }
        project.appendChild(uncheckedContainer)

        contentContainer.appendChild(project)
}

export function displayToday(){
    contentContainer.innerHTML = ""
    for(let x in projectsArray){
        if(projectsArray[x]["date"] == format(new Date(), 'yyyy-MM-dd')){
            displaySingleProject(projectsArray[x])
        }
    }

}

export function displayWeekly(){
    contentContainer.innerHTML = ""
    for(let x in projectsArray){
        if(isSameWeek(projectsArray[x]["date"], format(new Date(), 'yyyy-MM-dd'))){
            displaySingleProject(projectsArray[x])
        }
    }
}

export function displayAllTasks(){
    contentContainer.innerHTML = ""
    let taskContainer = document.createElement("div")
    taskContainer.id = "task-container"
    contentContainer.appendChild(taskContainer)
    for(let x in projectsArray){
        for(let task in projectsArray[x]["checkedTasks"]){
            let newTask = document.createElement("div")
            newTask.classList.add("displayed-task", "checked-task")
            newTask.innerText = projectsArray[x]["checkedTasks"][task]
            console.log(projectsArray[x]["priority"])
            switch (projectsArray[x]["priority"]){
                case "high":
                    newTask.classList.add("high")
                    break;
                case "medium":
                    newTask.classList.add("medium")
                    break;
                case "low":
                    newTask.classList.add("low")
                    break;
    }

            taskContainer.appendChild(newTask)
        }
        for(let task in projectsArray[x]["tasks"]){
            let newTask = document.createElement("div")
            newTask.classList.add("displayed-task")
            newTask.innerText = projectsArray[x]["tasks"][task]
            switch (projectsArray[x]["priority"]){
                case "high":
                    newTask.classList.add("high")
                    break;
                case "medium":
                    newTask.classList.add("medium")
                    break;
                case "low":
                    newTask.classList.add("low")
                    break;
    }

            taskContainer.appendChild(newTask)
        }
    }
}