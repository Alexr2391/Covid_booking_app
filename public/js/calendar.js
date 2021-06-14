/*
 * Created on Tue Sunday 31/1/2021
 *
 * Copyright (c) 2020 - Decathlon Greece
 * 
 * Author: A.R.
 */

const weekDays = [
    "Κυριακή", 
    "Δευτέρα", 
    "Τρίτη", 
    "Τετάρτη", 
    "Πέμπτη", 
    "Παρασκευή", 
    "Σάββατο"
]

const months = [
    "Ιανουαρίου", 
    "Φεβρουαρίου", 
    "Μαρτίου", 
    "Απριλίου", 
    "Μαΐου", 
    "Ιουνίου", 
    "Ιουλίου", 
    "Αυγούστου", 
    "Σεπτεμβρίου", 
    "Οκτωβρίου", 
    "Νοεμβρίου", 
    "Δεκεμβρίου"
]





const STORE = document.getElementById('store_id')
const BOOK_DATE = document.getElementById('booked')




function Calendar() {

    this.date = new Date();

    const {date} = this
    this.month = date.getMonth()
    this.today = date.getDate()
    this.day = date.getDay()
    this.year = date.getFullYear()

    const {day} = this

    this.fullDate = () => {
        return `Επιλέξτε ωράριο`
    }

    this.getWeekDays = () => {
        let week = []

        for(let i = 0; i < 7; i++) {

            let nextDay = day + i;

            if((nextDay) >= 7) {
                week.push(nextDay - 7)
            }
            else {
                week.push(nextDay)
            }
        }
        return week
    }

    this.renderWeekDays = () => {
        let week = this.getWeekDays()
        let actualDateNum = this.getCurrentDate()

        week.map((days) => {
            this._createElem('DIV', weekDays[days],'.calendar-days','weekday');
        })
        actualDateNum.map((num) => {
            this._createElem('DIV', `${num.day} ${num.actualMonth.substring(0,3)}`,'.calendar-days','date-num', 'day', num.day);
        })
    }


    this.getCurrentDate = () => {
        let weekdays = []
        let increment;
        let actualdate = new Date(date)
        for(let i = 0; i < 7; i ++) {

            i === 0 ? increment = 0 : increment = 1;

            let tomorrow = actualdate.setDate(actualdate.getDate() + increment);

            weekdays.push({
                day : new Date(tomorrow).getDate(), 
                actualMonth : months[new Date(tomorrow).getMonth()]
            });
        }

        return weekdays;
    }
}


Calendar.prototype._createElem = (
    elem, 
    content, 
    parent, 
    classname = null, 
    datas = null, 
    datavalue= null
    
    ) => {
        let par;
        if(typeof parent === 'string') {
            par = document.querySelector(parent)
        } 
        else {
            par = parent;
        }

        const create = document.createElement(elem)
        if(classname !== null) {
            create.classList.add(classname)
        }
        create.textContent = content

        if(datas !== null && datavalue !== null) {
            create.dataset[datas] = datavalue
        }
        par.insertAdjacentElement('beforeend', create)
}

Calendar.prototype._totalReset = () => {
    const header = document.querySelector('.calendar-header')
    const days = document.querySelector('.calendar-days')
    const timelines = Array.from(document.querySelectorAll('.timeline'))
    

    header.innerHTML = '';
    days.innerHTML = '';
    BOOK_DATE.value = '';
    timelines.map(e => e.innerHTML = '')
}



Calendar.prototype._filltimelines = (storeid) => {


    Calendar.prototype._totalReset();

    if(!storeid) {
        return
    }
    const {store} = storeid

    const {days_params, OPERATING_HOURS} = store
    const getTimetable = document.querySelectorAll('.timeline')
    const arrTimetable = Array.from(getTimetable)
    let actualdate = new Date(new Date())
    let increment;

    arrTimetable.map((filltime, index) => {

        index === 0 ? increment = 0 : increment = 1;
         
        setTimeTables(filltime, days_params, actualdate, increment, OPERATING_HOURS)

    })
}

function setTimeTables(slots, weekdays, refday, index, limit) {

    let tomorrow = refday.setDate(refday.getDate() + index)

    const {saturdays, sundays,mondays, thursdays,wednesdays, tuesdays, fridays} = weekdays

    if(sundays[0] && new Date(tomorrow).getDay() === 0 ||
    mondays[0] && new Date(tomorrow).getDay() === 1 || 
    tuesdays[0] && new Date(tomorrow).getDay() === 2 ||
    wednesdays[0] && new Date(tomorrow).getDay() === 3 ||
    thursdays[0] && new Date(tomorrow).getDay() === 4 || 
    fridays[0] && new Date(tomorrow).getDay() === 5 ||
    saturdays[0] && new Date(tomorrow).getDay() === 6
    ) {


     Calendar.prototype._createElem(
         'div',`Κλειστά`,
          slots, 
          'no_time_frame', 
          null, 
          null
        )
     }

     else {
         
        let days;
        switch(refday.getDay()) {
            case 0 : days = sundays[1] 
            break;
            case 1 : days = mondays[1] 
            break;
            case 2 : days = tuesdays[1] 
            break;
            case 3 : days = wednesdays[1] 
            break;
            case 4 : days = thursdays[1] 
            break;
            case 5 : days = fridays[1] 
            break;
            case 6 : days = saturdays[1] 
            break;
        }

        for(let i = limit.start; i <= limit.end; i ++) {
            if(days.start <= i && days.end >= i) {
                Calendar.prototype._createElem(
                    'div',`${i}:00`,
                    slots, 
                    'time_frame', 
                    'time', 
                    ` ${new Date(tomorrow).getDate()} ${months[new Date(tomorrow).getMonth()]} στις ${i}:00`
                )
            } else {
                Calendar.prototype._createElem(
                    'div',``,
                    slots, 
                    'blank_frame', 
                    'time', 
                    ``
                )
            }

        }
    }
}


function init(store) {

    const calendar = new Calendar()

    const {_filltimelines,renderWeekDays, fullDate, _createElem} = calendar

    _filltimelines(store)

    _createElem('H2', fullDate(), '.calendar-header')

    renderWeekDays()

}


function resetSelection() {
    const frames = document.querySelectorAll('.time_frame')
    frames.forEach((frame) => frame.classList.remove('selected'))
}

    listener('click')
    listener('touchstart')

const formElem = document.querySelector('form')





function listener(event) {
    window.addEventListener(event, (e) => {

        const targetElem = e.target;
        const verify5 = document.querySelector('.verify-input-5')
    
        if(targetElem.className === "time_frame") {
    
            resetSelection()
            targetElem.classList.add('selected')
            BOOK_DATE.value = targetElem.dataset.time
            verify5.textContent = targetElem.dataset.time
        }
    })
}


async function getStoreId(){

    const config = await axios({
        method: 'GET',
        url: '/getstoreconfig'
    }) 

    const [...stores] = await config.data

    const storeval = STORE.value

    const storename = stores.filter(e => e.store.name === storeval)
    
    const [store] = storename

    const verify5 = document.querySelector('.verify-input-5')
    verify5.textContent = 'Δεν έχει ενημερωθεί'

    init(store)
}

STORE.addEventListener('change', getStoreId);
window.addEventListener('load', getStoreId)




