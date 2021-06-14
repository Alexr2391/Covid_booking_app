window.addEventListener('load', () => {

    const timeId = document.getElementById('timeframe')
    const storeId = document.getElementById('store')
    const submitBtn = document.querySelector('.validation_btn')
    const dplist = document.querySelector('.drop-list')
    const strdplist = document.querySelector('.store_drop-list')

    function timeZone(e) {
        const element = e.target
        if(element.className.includes('time_drp-down')) {
            element.classList.toggle('active')
           return dplist.classList.toggle('open')
        }
        if(element.className.includes('store_drp-down')) {
            element.classList.toggle('active')
            return strdplist.classList.toggle('open')
        }
        if(element.className.includes("time_drop-item")) {
            dplist.classList.toggle('open')
           return timeId.innerHTML = element.textContent
        }
        if(element.className.includes('store_drop-item')) {
            strdplist.classList.toggle('open')
            return storeId.innerHTML = element.textContent
        }
        return
    }

    function filterSelection() {
        const time = timeId.textContent
        const store = storeId.textContent
        window.location.href=`/web/reservation-summary?time=${time}&store=${store}`
    }

    window.addEventListener('click', timeZone)
    submitBtn.addEventListener('click', filterSelection)
    // window.addEventListener('touchstart', timeZone)
    // submitBtn.addEventListener('touchstart', filterSelection)
})