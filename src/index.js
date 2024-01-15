let burgerIcon = document.getElementById("burger-icon")
let sideNav = document.getElementById("side-nav")
let sideNavDisplayed = false
let createProject = document.getElementById("plus")

let formContainer = document.getElementById("form-container")

createProject.addEventListener("click", function(){
    if(formContainer.style.display == ""){
        formContainer.style.display = "block"
    }
    else{
        formContainer.style.display = ""
    }
})

burgerIcon.addEventListener("click", function(){
    if(sideNavDisplayed == false){
        document.body.style.marginLeft = "300px"
        sideNav.style.width = "300px"
        sideNavDisplayed = true
        sideNav.style.display = "block"
    }
    else{
        document.body.style.marginLeft = "0px"
        sideNav.style.width = "0px"
        sideNavDisplayed = false
        sideNav.style.display = "None"
    }
})