window.addEventListener('submit', async(e) => {
    e.preventDefault()
    

    const datas = {
        username: e.target[0].value,
        password: e.target[1].value
    }

    const {data} =  await axios({
        method: 'POST',
        url: '/login',
        data : datas,
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    const markErr = Array.from(document.querySelectorAll('.login_icon_container'))
    const message = document.querySelector('.message')

    if(data.isValid){

        markErr.map(err => err.classList.add('success'))
        message.className = "message success"
        message.textContent = data.success

        setTimeout(() => {
            window.location = '/web/reservation-summary'
        },1000)
    }

    if(!data.isValid) {

        markErr.map(err => err.classList.add('error'))
        message.className = "message fail"
        message.textContent = data.error
    }
})