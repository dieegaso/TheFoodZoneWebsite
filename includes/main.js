import { businessesNC } from "./vendorsNC.js";
import { businessesP} from "./vendorsPorter.js";
import { eventsNC } from "./eventsNC.js";
import { eventsP } from "./eventsP.js";




const vendorContainer = document.getElementById("vendors-container");


// Get vendors depending on page 
let businesses, venTotal, events, mapRefMod;
const currentPage = document.title;
let vendorStatus = true;


switch(currentPage){
    case "The Foodzone NC":
        businesses = businessesNC;
        events = eventsNC;
        venTotal = 18;
        mapRefMod = "nc";
        break
        case "The Foodzone Porter":
            businesses = businessesP;
            events = eventsP;
            venTotal = 24;
            mapRefMod = "porter";
        break
    case "The FoodZone Park":
        events = [...eventsP, ...eventsNC]; 
        venTotal = 24;
        break
    default:
        businesses = "";
}

console.log(mapRefMod);

const vendorStyleElement = document.createElement("style");
vendorStyleElement.id = "vendorEventStyle";
document.head.appendChild(vendorStyleElement);



//Create Components --->

//Create side panel tab
const animationTime = 300; //animation time for panel slide
const createSidePanel = function() {
    const bodyContainer = document.getElementById("body");

    // Prevent multiple panels
    if (document.querySelector(".side-panel")) return;

    const sidepanel = document.createElement("div");
    sidepanel.className = "side-panel";

    sidepanel.innerHTML = `
        <div class="tab-container">
            <a class="tab-action" id="tabs-top">
                <span id="tabs-title">${currentPage}</span>
                <img src="assets/tabs-X.png"  id="tabs-x">
            </a>
            <a class="tab-action" href="index.html">Home</a>
            <a class="tab-action" href= "GrandTexasNC.html">Grand Texas New Caney</a>
            <a class="tab-action" href="Porter.html">FM-1314 Porter</a>
            <a class="tab-action">Become a vendor</a>
            <a class="tab-action">Contact Us</a>
            <div id="tabs-extra">
                <a id="side-img-container" href="index.html">
                    <img src="assets/logo.png" id="side-img">
                </a>
                <div>Contact Us</div>
                <div>Privacy</div>
                <div>Credits</div>
                <div>®DBV Studios</div>
            </div>    
        </div>
    `;

    // Inner tab-container initial and animated style
    const style = document.createElement("style");
    style.textContent = `
        .side-panel{
            position: fixed;
            display: flex;
            justify-content: end ;
            top: 0;
            right: 0;
            background-color: rgba(0,0,0,0);
            transition: background-color ${animationTime/1000}s ease;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
        }
        .side-panel.show{
            background-color: rgba(0, 0, 0, 0.25);
        }

        .tab-container {
            background-color: var(--sec-color);
            box-shadow: inset 7.5px 0px 10px -10px var(--third-pale-color);
            width: 65vw;
            max-width: 500px;
            max-height: 100vh;
            transform: translateX(100%);
            transition: transform ${animationTime/1000}s ease;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 2rem 1rem;
        }
        
        .tab-container.show {
            transform: translateX(0);
        }
        
        .tab-action{
            cursor: pointer;
            text-decoration: none;
            padding: 1rem;
            margin: 0 1rem;
            color: inherit;
            max-width: 100%;
            border-radius: 10px;
            border-bottom: 1px solid rgb(255, 255, 255);
            box-shadow: inset -5px 5px 5px -5px var(--third-pale-color);
        }
        
        .tab-action:hover{
            background-color: rgba(0,0,0,0.1);
        }

        #tabs-top{
            margin: 0;
            display:flex;
            cursor: default;
            align-items: center;
            justify-content: space-between;
            box-shadow: none;
            border-bottom: none;
        }

        #tabs-top:hover{
            background-color: rgba(0,0,0,0);
        }
        
        #tabs-title{
            color: var(--third-color);
            font-size: 1rem;
            font-weight: 900;

        }

        #tabs-x{
            width: 15px;
            cursor:pointer;
            filter: opacity(0.25);
            
        }

        #tabs-extra{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content:center;
            align-items:center;
            font-size: 0.65rem;
        }

        #side-img-container{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1rem;
        }

        #side-img{
            max-width: 75%;
        }
    
    `;
    document.head.appendChild(style);

    bodyContainer.appendChild(sidepanel);


    // Trigger the animation on next tick
    requestAnimationFrame(() => {
        sidepanel.querySelector('.tab-container').classList.add('show');
        sidepanel.classList.add('show');
    });


    // Close Side panel, by X or click outisde
    sidepanel.addEventListener("click", (e) => {
        const tabContainer = sidepanel.querySelector('.tab-container');
        const closeBtn = sidepanel.querySelector('#tabs-x');

        // If you clicked either the close button or outside the tab container
        if (e.target === closeBtn || !tabContainer.contains(e.target)) {
            tabContainer.classList.remove('show');
            sidepanel.classList.remove('show');
            setTimeout(() => {
                sidepanel.remove();
            }, animationTime - 100);
        }
    });

}

// Create event cards 
function createEventContainer() {
    const eventContainerhtml = document.getElementById("events-container");
    if(events.length === 0){
        eventContainerhtml.innerHTML = `
            <div class="no-events"> No events </div>
        `;
        return;
    };
    events
        .sort((a, b) => {
            const aDate = new Date(a.date[0]);
            const bDate = new Date(b.date[0]);
            return aDate - bDate;
        })
        .forEach((event,index) => {
            let lastIndex = event.date.length - 1;
            const lastDate = new Date(`${event.date[lastIndex]} 23:59`);
            if(lastDate - Date.now() < 0){
                return
            }
        const eventcard = document.createElement("div");
        eventcard.className = "event-card-container";

        let containerStyle = `
            position: relative;
            display: grid;
            grid-template-areas:
                'img img title title title'
                'img img descr descr descr'
                'img img descr descr descr'
                'info info dat  dat  dat';
            grid-template-columns: repeat(2,0.75fr) repeat(3,1fr);
            grid-template-rows: repeat(4,auto);
            padding:2rem 1rem;
            box-shadow: inset 0 -10px 5px -10px rgba(0,0,0,0.25);
        `;

        let eventImgStyle = `
            width:100%; 
            border-radius:10px;
            box-shadow: -3px 3px 5px rgba(0,0,0,0.25);
        `;

        let eventTitleStyle = `
            grid-area: title;
            margin: 0; 
            padding-left: 15px;
            color: var(--third-pale-color);
        `;

        let eventDescripStyle = `
            grid-area: descr;
            padding-left: 15px;
            margin:0;
            font-size: clamp(0.75rem,3vw,1rem)
        `;

        let eventDateStyle = `
            grid-area: dat;
            justify-self:right;
            align-self: end;
            font-size: 0.75rem;
            padding-top:15px;
        `;

        let eventUrlStyle = `
            grid-area: img;
            width: 100%;
            height: 100%;
        `;

        let eventLocationStyle = `
            grid-area: info;
            font-size: 0.75rem;
            align-self: end;
        `;

        let eventCalendarLink=`
            position:absolute;
            top:15%;
            right:5%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            font-weight: 800;
            color: var(--third-pale-color);
            width:20px;
            height:20px;
            border-radius: 50%;
            box-shadow: inset -1px 2px 2px -2px var(--sec-color);
        `;

        const eventImgHtml = event.url
            ? `<a style="${eventUrlStyle}" href="${event.url}" target="_blank" rel="noopener noreferrer">
                <img src="${event.image}" style="${eventImgStyle}">
            </a>`
            : `<div style="${eventUrlStyle}">
                <img src="${event.image}" style="${eventImgStyle}">
            </div>`;

        const eventDateHtml = event.date.length == 2
            ? `<div class="event-date" style="${eventDateStyle}">
                ${event.date[0].split(",")[0] + "-" +event.date[1] + ", " + event.start}
            </div>`
            : `<div class="event-date" style="${eventDateStyle}">
                ${event.date[0] + ", " + event.start}
            </div>`;

        eventcard.innerHTML = `
            <div class="events" style="${containerStyle}">
                ${eventImgHtml}
                <h2 class="event-title" style="${eventTitleStyle}">${event.name}</h2>
                <p class="event-description" style="${eventDescripStyle}">${event.description}</p>
                ${eventDateHtml}
                <div class="event-location" style="${eventLocationStyle}">${event.location}</div>
                ${event.date.length < 2? `
                    <a id="add-calendar-${index}"  href="#" download="event.ics" style="${eventCalendarLink}"> + </a>`
                    : ""}
            </div>
        `;

        eventContainerhtml.style.cssText = vendorStatus ? `display: none;` : `display:block;`;
        eventContainerhtml.appendChild(eventcard);

        const calendarLink = document.getElementById(`add-calendar-${index}`);
    
        if(event.date.length < 2){
            const icsContent = createICS(event);
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            calendarLink.href = url;

            calendarLink.addEventListener("click", () => {
                setTimeout(() => URL.revokeObjectURL(url), 1500);
            });
        }
    });

    //If all events passed, return emptyy container
    if(!document.querySelectorAll(".event-card-container").length){
        eventContainerhtml.innerHTML = `
            <div class="no-events"> No events </div>
        `;
    };
}

//Create Business Cards
function createBusinessCards(){
    businesses.sort((a,b) => a.num - b.num).forEach(biz => {
        const card = document.createElement("div");
        card.className = "cards-container";
        card.id = `vendor-${biz.num}`;

        let color,state;
        if(isOpenNow(biz)){
            color = "#80EF80";
            state = "Open";
        }else{
            color = "#FA5053";
            state = "Closed";
        }

        // Remove "Monday:", "Tuesday:", etc. from the hours
        const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const hours = Object.values(biz.hours).map(([open,close]) =>{
            if(!open){
                return "Closed";
            }
            return `${open} - ${close}`;
        } );
        
        const socialLinks = Object.entries(biz.social)
        .filter(([_, url]) => url) // Only include non-empty links
        .map(([platform, url]) => `
            <a href="${url}" target="_blank">
                <img src="./assets/social/${platform}.png" alt="${platform}">
            </a>
        `)
        .join("");


        card.innerHTML = `
            <div class= "cards">
                <img class="business-logo" src="${biz.logo}" alt="${biz.name} logo">
                <h3 class="b-name">${biz.name}</h3>
                <a class="vn" href="#grid-map-${mapRefMod}" style="box-shadow: inset -5px 5px 10px -5px ${color};">${biz.num}</a>
                <p class="description">${biz.description}</p>
                ${biz.menu ? `
                    <div class="menus">
                        <a href="${biz.menu}" target="_blank" rel="noopener noreferrer" class="menu-s"> Menu </a>
                    </div>`: "" } 
                    <div class= "schedule">
                        <div class="days">
                            ${weekDays.map(day => `<div class="day">${day + ":"}</div>`).join("")}
                        </div>
                        <div class="hours">
                            ${hours.map(hour => `<div class="hour">${hour}</div>`).join("")}
                        </div>
                    </div> 
                    <div class="socialVendor">
                        ${socialLinks}
                    </div>
            </div>
            `;
    
        vendorContainer.appendChild(card);

        //card styles
        const h2 = card.querySelector(".b-name");
        h2.style.color = biz.mainColor;
        
        const menu = card.querySelector(".menu-s");
        menu.style.cssText = `
            background-color: ${biz.mainColor+"50"};
            padding: 5px 20px;`;
        

        //highlight grid cell on map
        const link = card.querySelector(".vn");
        link.addEventListener("click", () => highlightNum(biz.num));


    });
}

//Create Map Buttons
const gridMapGuide = document.querySelector(`.grid-space-${mapRefMod}`);
function createGridMapBtn(){
    gridMapGuide.innerHTML = businesses.map(biz => 
        `<div class="mb-container" style="grid-area: a${biz.num};">
            <a class="mb" id="b-${biz.num}"  style=" cursor:pointer;">${biz.num}</a> 
        </div>
        `).join(""); 
}

// <---


//Functions --->

//Check which tab is active (Vendor or events)
function activeTab(status, tab) {
    if (status && tab === "vendor") {
        return "box-shadow: inset 0px 10px 5px -5px var(--third-pale-color);";
    } else if (!status && tab === "vendor") {
        return "background-color: var(--sec-color); border-bottom-right-radius: 20px;";
    } else if (status && tab === "event") {
        return "background-color: var(--sec-color); border-bottom-left-radius: 20px;";
    } else {
        return "box-shadow: inset 0px 10px 5px -5px var(--third-pale-color);";
    }
}


//Navigation Vendor Style
function createNavigationVendorStyle() {
    vendorStyleElement.textContent = `
        #navigation {
            display: flex;
        }
        .navigation-select {
            padding: 2rem 1rem;
            color: var(--third-pale-color);
            font-size: 1rem;
            font-weight: 900;
            width: 50%;
            text-align: center;
            cursor: pointer;
        }
        #vendor-tab {
            ${activeTab(vendorStatus, "vendor")}
        }
        #event-tab {
            ${activeTab(vendorStatus, "event")}
        }
    `;
}

//swipe left gesture
function panelSwipe() {
    let touchStartX, touchEndX, touchStartY,touchEndY;
    const edgeLimit = window.innerWidth - 100;
    function handleSwipe() {
        const sidepanel = document.querySelector(".side-panel");
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        if (diffX < -100 && touchStartX > edgeLimit) createSidePanel(); //create sidepanel if left swipe
        if (sidepanel && diffX > 100 ){ //remove sidepanel if right swipe
            sidepanel.querySelector('.tab-container').classList.remove('show');
            sidepanel.classList.remove('show');
            setTimeout(() => {
                sidepanel.remove()
            },animationTime - 100);
        } 
    }
    document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
    });
    
    document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
    });
}

//Is Vendor Open?
function isOpenNow(business) {
    const now = new Date();
    const dayNames = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currentDayName = dayNames[now.getDay()];
    
    // Find the current day's hours
    const todayHours = business.hours[currentDayName];

    if (todayHours.length == 0) {
        return false; // Closed today
    } else {       
        // Extract time range (e.g. "3:30pm - 10:00pm")      
        const openHour = todayHours[0];
        const closeHour = todayHours[1];
        
        // Convert time strings to minutes since midnight
        function toMinutes(timeStr) {
            const [time, modifier] = timeStr.split(/(am|pm)/i);
            let [hours, minutes] = time.split(":").map(Number);
            
            if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12; //convert to 24hr format
            if (modifier.toLowerCase() === "am" && hours === 12) hours = 0; // if 12am, convert to 0hr
            
            return hours * 60 + minutes;
        }
        
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const openMinutes = toMinutes(openHour);
        const closeMinutes = toMinutes(closeHour);
        
        return nowMinutes >= openMinutes && nowMinutes <= closeMinutes;
    }
}

//Map Highlight Function
async function highlightNum(num) {
    function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
    const gridNum = document.getElementById(`b-${num}`);
    const highlight = "rgba(0,0,0,0.25)";
    const clear = "rgba(0,0,0,0)";
    for(let i = 0; i<3; i++){
        await delay(500);
        gridNum.style.backgroundColor = highlight;
        await delay(500);
        gridNum.style.backgroundColor = clear;
    }
}

// Create an Empy grid cell if not occupied
function createEmpyVendor(){
    for(let i = 0; i < venTotal; i++){ 
        let checktag = document.getElementById(`b-${i}`) 
        let newtag = document.createElement("div");
        newtag.className = "mb-container"
        if(i===0){
            newtag.innerHTML = `
                <a id="heart">test</a> 
            `;
            console.log("test");
            newtag.style.cssText =`
                grid-area: h; 
                cursor:pointer;
                `;
            gridMapGuide.appendChild(newtag);
        }else if(!checktag && i !== 0){
            newtag.innerHTML = `
                <a class="mb" id="b-${i}">${i}</a> 
            `;
            newtag.style.cssText =`
                grid-area: a${i}; 
                cursor:pointer;
            `;
            gridMapGuide.appendChild(newtag);
        }
    }
}

// Functions for calendar add
function createICS(evt) {
    const startDateObj = parseDate(evt.date[0], evt.start);
    const endDateObj = new Date(startDateObj.getTime() + 60 * 60 * 1000); // +1 hour

    const startDate = formatDate(startDateObj);
    const endDate = formatDate(endDateObj);

    return `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${evt.name}
DESCRIPTION:${evt.description}
LOCATION:${evt.location || ""}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR
`.trim();
}

function parseDate(dateStr, timeStr) {
    const time24 = to24Hour(timeStr || "00:00");
    const full = `${dateStr} ${time24}`;
    const date = new Date(full);
    if (isNaN(date.getTime())) {
        console.warn("Invalid date:", full);
    }
    return date;
}

function to24Hour(timeStr) {
    const match = timeStr.match(/(\d+):(\d+)(am|pm)/i);
    if (!match) return timeStr;
    let [_, hours, minutes, ampm] = match;
    hours = parseInt(hours);
    if (ampm.toLowerCase() === 'pm' && hours !== 12) hours += 12;
    if (ampm.toLowerCase() === 'am' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

function formatDate(dateObj) {
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
        throw new Error("Invalid date object passed to formatDate");
    }
    return dateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
// <---


// DO this if not on main page
if(currentPage !== "The FoodZone Park"){
    panelSwipe()
    createNavigationVendorStyle();
    createBusinessCards();
    createGridMapBtn();
    createEmpyVendor()

    // Event Listeners
        const mapIcon = document.querySelectorAll(".mb");
        const vendorTab = document.getElementById("vendor-tab");
        const eventTab = document.getElementById("event-tab");
        const tabs = document.getElementById("three-line-tab");

        // Show Vendor
        vendorTab.addEventListener("click", () => {
            vendorStatus = true;
            vendorContainer.style.display = "";
            let eventContainer = document.getElementById("events-container");
            eventContainer.innerHTML= "";
            createNavigationVendorStyle();
        });

        //Show Events
        eventTab.addEventListener("click", () => {
            vendorStatus = false;
            vendorContainer.style.display = "none";
            createEventContainer();
            createNavigationVendorStyle();
        });

        //Create Side panel
        tabs.addEventListener("click", createSidePanel);

        //Show Vendor Preview on Map
        mapIcon.forEach(tag => {
            tag.addEventListener("click", (e)=>{
                const vendorMapPreview = document.createElement("div");
                vendorMapPreview.className = "temp-info"
                const id = e.target.id.split("-")[1];
                const index = businesses.findIndex(biz => biz.num == id);

                let mColor, color, state, forRent;

                
                if(index === -1){ // Create " For Rent Sign "
                    mColor = "black";
                    forRent = "assets/rent.png"
                }else{
                    mColor = businesses[index].mainColor;
                    //Check Status, Open or Closed
                    if(isOpenNow(businesses[index])){
                        color = "#32CD32";
                        state = "Open";
                    }else{
                        color = "red";
                        state = "Closed";
                    }
                }
                
                
                const logoContainer =`
                    width:150px;
                    height:150px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                    background-color:white;
                    justify-content: center;
                    align-content: center;
                    padding: 1rem;
                    border-radius: 40px;
                    box-shadow: -5px 5px 10px rgba(0,0,0,0.5), 5px -5px 10px rgba(0,0,0,0.5);
                `;
                const imageStyle = `
                    max-height: 100%;
                    max-width: 75%;
                    object-fit: contain;
                    `;
                const nameStyle = `
                    justify-self:center; 
                    text-align: center;
                    margin:0 10px;
                    color:${mColor};
                `;

                const astyle = `
                    font-size: 0.5rem;
                    max-height: 75%;
                    max-width: 100%;
                    text-align: center;
                `;

                const dotStyle =`
                    width:15px;
                    height:15px;
                    border-radius: 50%;
                    background-color:${color};
                    align-self: center;
                `;

                if(index !== -1){
                    vendorMapPreview.innerHTML= `
                        <div style="${logoContainer}">
                            ${businesses[index].logo ? 
                                `
                                <a href="#vendor-${businesses[index].num}" style="${astyle}" id="vendor-search">
                                    <img src="${businesses[index].logo}" style="${imageStyle} ">
                                </a>`:`
                                <a href="#vendor-${businesses[index].num}" style="width: 100%; text-decoration: none; align-content:center;">
                                    <h4 class="business-name" style="${nameStyle}">${businesses[index].name}</h4>
                                </a>
                                `}
                            <div class="dot" style="${dotStyle}"></div>
                            <span style="align-self: center;">${state}</span>
                        </div>
                    `;
                }else{ //ADD HREF TO A TAG!!!
                    vendorMapPreview.innerHTML= `
                        <div style="${logoContainer}">
                            <a style="${astyle}"> 
                                <img src="${forRent}" style="${imageStyle} ">
                            </a>
                            <span style="text-align: center;">832-444-3232 ADD HREF</span>
                        </div>
                    `
                }
                vendorMapPreview.style.cssText = `
                    position: absolute;
                    top: 2%;
                    left: 0;
                    display:flex;
                    background-color: rgba(0,0,0,0); 
                    width: 100%;
                    height:100%;
                    align-items: center;
                    justify-content: center;
                `;

                const mapContainer = document.querySelector(".map-container");
                mapContainer.appendChild(vendorMapPreview);

                setInterval(() => {
                    vendorMapPreview.remove()
                }, 4000);

                vendorMapPreview.addEventListener("click",()=>{
                    vendorMapPreview.remove();
                })

                let venSearch = document.getElementById("vendor-search");
                venSearch.addEventListener("click", () => {
                    if (!vendorStatus) {
                        let eventContainer = document.getElementById("events-container");
                        eventContainer.innerHTML= "";
                        document.querySelector('head style').textContent = "";
                        vendorStatus = true;
                        vendorContainer.style.display = "";
                        createNavigationVendorStyle();
                    }
                });

            })
        })
}    

// Do this if Main Page
if(currentPage == "The FoodZone Park"){
    vendorStatus = false;
    createEventContainer();
    panelSwipe();

    //Event listeners Main Page
    //Create Side panel
    const tabs = document.getElementById("three-line-tab");
    tabs.addEventListener("click", createSidePanel);

}



