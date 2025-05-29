// import { businessesNC} from "./vendorsNC.js";
// import { businessesP} from "./vendorsPorter.js";

// busList = [businessesNC,businessesP];

// const container = document.getElementById("vendors-container");


// //Create Business Cards
// businessesNC.forEach(biz => {
//     const card = document.createElement("div");
//     card.className = "cards-container";
//     card.id = `vendor-${biz.num}`;

//     let color,state;
//     if(isOpenNow(biz)){
//         color = "#80EF80";
//         state = "Open";
//     }else{
//         color = "#FA5053";
//         state = "Closed";
//     }

//     // Remove "Monday:", "Tuesday:", etc. from the hours
//     const cleanedHours = biz.hours.map(hour => hour.replace(/^[A-Za-z]+:\s*/, ''));
//     const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
//     const socialLinks = Object.entries(biz.social)
//     .filter(([_, url]) => url) // Only include non-empty links
//     .map(([platform, url]) => `
//         <a href="${url}" target="_blank">
//             <img src="./assets/social/${platform}.png" alt="${platform}">
//         </a>
//     `)
//     .join("");


//     card.innerHTML = `
//         <div class= "cards">
//             <img class="business-logo" src="${biz.logo}" alt="${biz.name} logo">
//             <h3 class="b-name">${biz.name}</h3>
//             <a class="vn" href="#grid-map" style="box-shadow: inset -5px 5px 10px -5px ${color};">${biz.num}</a>
//             <p class="description">${biz.description}</p>
//             ${biz.menu ? `
//                 <div class="menus">
//                     <a href="${biz.menu}" target="_blank" rel="noopener noreferrer" class="menu-s"> Menu </a>
//                 </div>`: "" } 
//                 <div class= "schedule">
//                     <div class="days">
//                         ${weekDays.map(day => `<div class="day">${day + ":"}</div>`).join("")}
//                     </div>
//                     <div class="hours">
//                         ${cleanedHours.map(hour => `<div class="hour">${hour}</div>`).join("")}
//                     </div>
//                 </div> 
//                 <div class="socialVendor">
//                     ${socialLinks}
//                 </div>
//         </div>
//         `;
   
//     container.appendChild(card);

//     //styles
//     // card.style.cssText = `border: 2px solid ${biz.mainColor+"50"};`;

//     const h2 = card.querySelector(".b-name");
//     h2.style.color = biz.mainColor;
    
//     const menu = card.querySelector(".menu-s");
//     menu.style.cssText = `
//         background-color: ${biz.mainColor+"50"};
//         padding: 5px 20px;`;
    

//     //highlight grid cell
//     const link = card.querySelector(".vn");
//     link.addEventListener("click", () => highlightNum(biz.num));


// });
    
    
// //create "buttons" of the grid map to preview vendor
// const gridMapGuide = document.querySelector(".grid-space");
// gridMapGuide.innerHTML = businessesNC.map(biz => 
//     `<div class="mb-container" style="grid-area: a${biz.num};">
//         <a class="mb" id="b-${biz.num}"  style=" cursor:pointer;">${biz.num}</a> 
//     </div>
//     `).join(""); 


// // Create an Empy grid cell if not occupied
// for(let i = 0; i < 18; i++){ 
//     let checktag = document.getElementById(`b-${i}`) 
//     let newtag = document.createElement("div");
//     newtag.className = "mb-container"
//     if(i===0){
//         newtag.innerHTML = `
//             <a id="heart">test</a> 
//         `;
//         newtag.style.cssText =`
//             grid-area: h; 
//             cursor:pointer;
//         `;
//     }else if(!checktag && i !== 0){
//         newtag.innerHTML = `
//             <a class="mb" id="b-${i}">${i}</a> 
//         `;
//         newtag.style.cssText =`
//             grid-area: a${i}; 
//             cursor:pointer;
//         `;
//     }
//     gridMapGuide.appendChild(newtag);
// }


// //Create icon preview image
// const mapIcon = document.querySelectorAll(".mb");
// mapIcon.forEach(tag => {
//     tag.addEventListener("click", (e)=>{
//         const vendor = document.createElement("div");
//         vendor.className = "temp-info"
//         const id = e.target.id.split("-")[1];
//         const index = businessesNC.findIndex(biz => biz.num == id);

//         let mColor, color, state, forRent;

//         if(index === -1){
//             mColor = "black";
//             forRent = "../assets/rent.png"
//         }else{
//             mColor = businessesNC[index].mainColor;
//             //Check Status, Open or Closed
//             if(isOpenNow(businessesNC[index])){
//                 color = "#32CD32";
//                 state = "Open";
//             }else{
//                 color = "red";
//                 state = "Closed";
//             }
//         }
        
        
//         const imageStyle = `
//             max-height: 100%;
//             max-width: 75%;
//             object-fit: contain;
//             `;
//         const infocontainer =`
//             width:150px;
//             height:150px;
//             display: flex;
//             flex-wrap: wrap;
//             gap: 5px;
//             background-color:white;
//             justify-content: center;
//             align-content: center;
//             padding: 1rem;
//             border-radius: 40px;
//             box-shadow: -5px 5px 10px rgba(0,0,0,0.5), 5px -5px 10px rgba(0,0,0,0.5);
//         `;
//         const nameStyle = `
//             justify-self:center; 
//             text-align: center;
//             margin:0 10px;
//             color:${mColor};
//         `;

//         const astyle = `
//             font-size: 0.5rem;
//             max-height: 75%;
//             max-width: 100%;
//             text-align: center;
//         `;

//         const dotStyle =`
//             width:15px;
//             height:15px;
//             border-radius: 50%;
//             background-color:${color};
//             align-self: center;
//         `;

//         if(index !== -1){
//             vendor.innerHTML= `
//                 <div style="${infocontainer}">
//                     ${businessesNC[index].logo ? 
//                         `
//                         <a href="#vendor-${businessesNC[index].num}" style="${astyle}">
//                             <img src="${businessesNC[index].logo}" style="${imageStyle} ">
//                         </a>`:`
//                         <a href="#vendor-${businessesNC[index].num}" style="width: 100%; text-decoration: none; align-content:center;">
//                             <h4 class="business-name" style="${nameStyle}">${businessesNC[index].name}</h4>
//                         </a>
//                         `}
//                     <div class="dot" style="${dotStyle}"></div>
//                     <span style="align-self: center;">${state}</span>
//                 </div>
//             `;
//         }else{ //ADD HREF TO A TAG!!!
//             vendor.innerHTML= `
//                 <div style="${infocontainer}">
//                     <a style="${astyle}"> 
//                         <img src="${forRent}" style="${imageStyle} ">
//                     </a>
//                     <span style="text-align: center;">832-444-3232 ADD HREF</span>
//                 </div>
//             `
//         }
//         vendor.style.cssText = `
//             position: absolute;
//             top: 2%;
//             left: 0;
//             display:flex;
//             background-color: rgba(0,0,0,0); 
//             width: 100%;
//             height:100%;
//             align-items: center;
//             justify-content: center;
//         `;

//         const container = document.querySelector(".map-container");
//         container.appendChild(vendor);

//         setInterval(() => {
//             vendor.remove()
//         }, 4000);

//         vendor.addEventListener("click",()=>{
//             vendor.remove();
//         })
//     })
// })
        
        
// //Map Highlight Function
// async function highlightNum(num) {
//     function delay(ms) {
//       return new Promise(resolve => setTimeout(resolve, ms));
//     }
//     const gridNum = document.getElementById(`b-${num}`);
//     const highlight = "rgba(0,0,0,0.25)";
//     const clear = "rgba(0,0,0,0)";
//     for(let i = 0; i<3; i++){
//         await delay(500);
//         gridNum.style.backgroundColor = highlight;
//         await delay(500);
//         gridNum.style.backgroundColor = clear;
//     }
// }


// //Create side panel tabs
// const tabs = document.getElementById("three-line-tab");
// tabs.addEventListener("click", () => {
//     const container = document.getElementById("body");

//     // Prevent multiple panels
//     if (document.querySelector(".side-panel")) return;

//     const sidepanel = document.createElement("div");
//     sidepanel.className = "side-panel";

//     sidepanel.innerHTML = `
//         <div class="tab-container">
//             <span id="close-btn" style="cursor:pointer; font-size:1.5rem;">✕</span>
//             <a href="index.html">Home</a>
//             <a href= "grandtexasnc.html">Grand Texas NC</a>
//             <a href="porter.html">Porter</a>
//             <a>Become a vendor</a>
//             <a>Contact Us</a>    
//         </div>
//     `;

//     // Outer panel style
//     sidepanel.style.cssText = `
//         position: fixed;
//         display: flex;
//         justify-content: flex-end;
//         top: 0;
//         right: 0;
//         background-color: rgba(0,0,0,0.25);
//         width: 100vw;
//         height: 100vh;
//         z-index: 9999;
//     `;

//     // Inner tab-container initial and animated style
//     const style = document.createElement("style");
//     style.textContent = `
//         .tab-container {
//             background-color: white;
//             width: 40vw;
//             height: 100%;
//             transform: translateX(100%);
//             transition: transform 0.3s ease;
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//         }
//         .tab-container.show {
//             transform: translateX(0);
//         }
//     `;
//     document.head.appendChild(style);

//     container.appendChild(sidepanel);

//     // Trigger the animation on next tick
//     requestAnimationFrame(() => {
//         sidepanel.querySelector('.tab-container').classList.add('show');
//     });

//     // Remove panel if background is clicked
//     sidepanel.addEventListener("click", (e) => {
//         if (e.target === sidepanel) {
//             sidepanel.remove();
//         }
//     });

//     // Close button inside panel
//     sidepanel.querySelector("#close-btn").addEventListener("click", () => {
//         sidepanel.remove();
//     });
// });


// //Green or Red Number (Open or Close)
// function isOpenNow(business) {
//     const now = new Date();
//     const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const currentDayName = dayNames[now.getDay()];

//     // Find the current day's hours
//     const todayHours = business.hours.find(h => h.startsWith(currentDayName)).toLowerCase();

//     if (!todayHours || todayHours.includes("closed")) {
//         return false; // Closed today
//     }
//     if(!todayHours.includes("/")){       
//         // Extract time range (e.g. "3:30pm - 10:00pm")
        
//         const timeRange = todayHours.split(": ")[1].split(" - ");
//         const [openStr, closeStr] = timeRange;
        
//         // Convert time strings to minutes since midnight
//         function toMinutes(timeStr) {
//             const [time, modifier] = timeStr.trim().split(/(am|pm)/i);
//             let [hours, minutes] = time.split(":").map(Number);
            
//             if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12;
//             if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;
            
//             return hours * 60 + minutes;
//         }
        
//         const nowMinutes = now.getHours() * 60 + now.getMinutes();
//         const openMinutes = toMinutes(openStr);
//         const closeMinutes = toMinutes(closeStr);
        
//         return nowMinutes >= openMinutes && nowMinutes <= closeMinutes;
//     } else {
//         return true
//     }

// }


