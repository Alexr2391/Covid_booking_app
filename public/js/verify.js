
window.addEventListener('load', () => {



    const store = document.getElementById('store_id')
    const name = document.getElementById('name')
    const lname = document.getElementById('lname')
    const email = document.getElementById('email')
    const tel = document.getElementById('tel')
    const date = document.getElementById('booked')



const VERIFY_FUNC = (e) => {
    const changeInput = e.target


    const verify1 = document.querySelector('.verify-input-1')
    const verify2 = document.querySelector('.verify-input-2')
    const verify3 = document.querySelector('.verify-input-3')
    const verify4 = document.querySelector('.verify-input-4')
    const verify5 = document.querySelector('.verify-input-5')
    const verify6 = document.querySelector('.verify-input-6')

    switch(changeInput) {
        case name: 
            verify1.textContent = name.value
            break
        case lname: 
            verify2.textContent = lname.value
            break
        case email: 
            verify3.textContent = email.value
            break
        case tel: 
            verify4.textContent = tel.value
            break
        case date: 
            verify5.textContent = date.textContent
            break
        case store: 
            verify6.textContent = `Decathlon ${store.value}`
            break
        default:
            return
    }
}
window.addEventListener('input', VERIFY_FUNC)
window.addEventListener('change', VERIFY_FUNC)
})


