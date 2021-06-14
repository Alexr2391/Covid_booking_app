window.addEventListener('load', () => {
const STORE_ID =  document.getElementById('store_id')
STORE_ID.addEventListener('change', bookedDates)


function bookedDates() {

    const storeval = STORE_ID.value;
    const MAX_COUNT = storeval === 'Spata' ? 30 : 30;


    setTimeout(async() => {

        const getTimetable = document.querySelectorAll('.time_frame')

        const getBookingValues = Array.from(getTimetable)

        const checkBookedDates = []

        getBookingValues.map(reservationTime => checkBookedDates.push(reservationTime.dataset.time))

    
    
    try {
        const checkValue = await axios({
            method: 'POST', 
            url: '/', 
            data: {
                checkAvailability: checkBookedDates,
                store_id : storeval
            }
        })
        let mapSpots = []
        
        await checkValue.data.map(elem => {
            const {value} = elem
            mapSpots.push(value)
        })

            checkAvailableSpots(mapSpots, getBookingValues, MAX_COUNT)
    }
    catch (err) {
        return
    }
    },400)
}

function checkAvailableSpots(allspots, frames, max) {
    allspots.map(spot => {
            const {dataset, count} = spot
            if(count >= max) {
                const unavailability = frames.filter(e => e.dataset.time === dataset)
                let [spot] = unavailability
                spot.classList.add('notAvailable')
                spot.innerHTML+= `<span class="alert_msg"> Μη διαθέσιμο! </span>`
            }
        })

    }
    
})
