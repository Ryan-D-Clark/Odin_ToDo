(()=>{"use strict";var e={d:(t,n)=>{for(var s in n)e.o(n,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:n[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{A:()=>s});let t=document.getElementById("content-container");function n(e){t.innerHTML="";for(let n in e){console.log(e[n].name);let s=document.createElement("div");switch(s.classList.add("project"),e[n].priority){case"high":s.classList.add("high");break;case"medium":s.classList.add("medium");break;case"low":s.classList.add("low")}let a=document.createElement("div");a.textContent=e[n].name,a.className="ptitle",s.appendChild(a);let c=document.createElement("div");c.textContent=`"${e[n].description}"`,c.className="pdescription",s.appendChild(c);let d=document.createElement("div");d.innerHTML=`<br>Due Date: ${e[n].date}<br>`,d.className="pdate",s.appendChild(d);let l=document.createElement("div");l.innerText="Completed Tasks:",l.className="text-title",s.appendChild(l);let i=document.createElement("div");i.id="checked-container";for(let t in e[n].checkedTasks){let s=document.createElement("div");s.classList.add("task"),s.innerText=e[n].checkedTasks[t],i.appendChild(s)}s.appendChild(i),l=document.createElement("div"),l.innerText="Uncompleted Tasks:",l.className="text-title",s.appendChild(l);let o=document.createElement("div");o.id="unchecked-container";for(let t in e[n].tasks){let s=document.createElement("div");s.addEventListener("click",(function(){s.classList.add("checked-task"),e[n].checkedTasks.push(e[n].tasks[t]),e[n].tasks=e[n].tasks.filter((s=>s!==e[n].tasks[t]))})),s.classList.add("task"),s.innerText=e[n].tasks[t],o.appendChild(s)}s.appendChild(o),t.appendChild(s)}}document.getElementById("refresh").addEventListener("click",(function(){for(let e in s)localStorage.setItem(e,JSON.stringify(s[e])),n(s)}));let s=function(){const e=[];let t=Object.keys(localStorage);for(let n of t)e.push(JSON.parse(localStorage.getItem(n)));return e}();n(s);let a=document.getElementById("burger-icon"),c=document.getElementById("side-nav"),d=!1,l=document.getElementById("plus"),i=document.getElementById("project-form"),o=document.getElementById("task-name"),r=document.getElementById("task-add"),m=document.getElementById("task-list"),p=document.getElementById("form-close");l.addEventListener("click",(function(){console.log("Testing again and again"),i.showModal()})),r.addEventListener("click",(function(){if(console.log(`${o.value}`),""==o.value)alert("Task cannot be empty");else{let e=document.createElement("li"),t=document.createElement("span");t.innerHTML="x",t.className="remove",e.textContent=o.value,e.addEventListener("click",(function(){"checked"==e.className?e.className="":e.className="checked"})),t.addEventListener("click",(function(){this.parentElement.remove()})),e.appendChild(t),m.appendChild(e),o.value=""}})),p.addEventListener("click",(function(){console.log("Test close"),i.close()})),a.addEventListener("click",(function(){0==d?(c.style.borderRight="1px solid #000000",document.body.style.marginLeft="300px",c.style.width="300px",d=!0):(c.style.borderRight="",document.body.style.marginLeft="0px",c.style.width="0px",d=!1)}));let u=new class{constructor(e,t,n,s,a,c){this.name=e,this.priority=t,this.date=n,this.description=s,this.checkedTasks=a,this.tasks=c}}("test","high","99999","gdksgndk",["One","Two","Three"],["Five"]);console.log(Object.keys(localStorage).length),localStorage.setItem(Object.keys(localStorage).length,JSON.stringify(u)),s.push(u),n(s)})();