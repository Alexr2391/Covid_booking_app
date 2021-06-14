

async function cancelReservations(e) {
    const target = e.target;

    if(target.dataset.ref) {
        let confirmation = confirm('Do you want to cancel this reservation?')

        if(confirmation) {
            await axios({
                method: "DELETE", 
                url: '/web/reservation-summary', 
                data : {
                    id : target.dataset.ref
                }
            })
            .then(() => 
                window.location.href = '/web/reservation-summary'
            )
        } else {
            return
        }
    }
}

async function sendEmail(e) {
    const target = e.target;

    if(target.dataset.mailer) {
            await axios({
                method: "POST", 
                url: '/emailer', 
                data : {
                    id : target.dataset.mailer
                }
            })
            .then((response) =>  {
               const message = document.querySelector('.data-alerts')
                responseMessage(message, response.data, 'showmessage', 3000)
            }
        )
        } else {
            return
        }
    }


    async function alertEmail(e) {
        const target = e.target;
    
        if(target.dataset.alert) {
                await axios({
                    method: "POST", 
                    url: '/emailer', 
                    data : {
                        id : target.dataset.alert, 
                        alert: true
                    }
                })
                .then((response) =>  {
                   const message = document.querySelector('.data-alerts')
                    responseMessage(message, response.data, 'showmessage', 3000)
                }
            )
            } else {
                return
            }
        }


window.addEventListener('click', cancelReservations)
window.addEventListener('click', sendEmail)
window.addEventListener('click', alertEmail)


function responseMessage(container, msg, classes, timer) {
    container.classList.add(classes)
    container.textContent = msg

    setTimeout(() => {
        container.classList.remove(classes)
        container.textContent = ''
    }, timer)
    
}