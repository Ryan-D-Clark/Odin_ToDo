import { projectsArray } from ".";

let contentContainer = document.getElementById("content-container")
let refresh = document.getElementById("refresh")

refresh.addEventListener("click", function(){
    for(let i in projectsArray){
        localStorage.setItem(i,JSON.stringify(projectsArray[i]))
        displayProjects(projectsArray)
    }
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

// Need to create new object after create button has been pressed and then add it to the array and local storage with it keeping track of key IDs

export function retrieveProjects(){
    const newArray = []
    let keys = Object.keys(localStorage)
    for(let i of keys){
        newArray.push(JSON.parse(localStorage.getItem(i)))
    }
    return newArray
}

export function displayProjects(array){
    contentContainer.innerHTML = ""
    for(let i in array){
        console.log(array[i]["name"])
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
            task.addEventListener("click", function(){
                task.classList.add("checked-task")
                array[i]["checkedTasks"].push(array[i]["tasks"][x])
                array[i]["tasks"] = array[i]["tasks"].filter(item => item !== array[i]["tasks"][x])

                
            })
            task.classList.add("task")
            task.innerText = array[i]["tasks"][x]
            uncheckedContainer.appendChild(task)
        }
        project.appendChild(uncheckedContainer)

        contentContainer.appendChild(project)
    }
    
}
