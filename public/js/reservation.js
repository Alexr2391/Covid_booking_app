const SUBMIT_BTN = document.getElementById('submit')

formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')
    const lname = document.getElementById('lname')
    const email = document.getElementById('email')
    const tel = document.getElementById('tel')
    const date = document.getElementById('booked')
    const store = document.getElementById('store_id')


    bookingTransfer(name.value, lname.value, email.value, tel.value, date.value, store.value)

})


const bookingTransfer = async($name, $lname, $email, $tel, $date, $store) => {
    const msgField = document.querySelector('.messages')
    SUBMIT_BTN.innerHTML = `<img height="30px" src="loader.gif" alt="loader" />`
    const emailRegEx =  new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

    if(emailRegEx.test($email) === false) {
        setTimeout(() => {
            msgField.style.color = "red"
            msgField.textContent = `* Καταχωρήστε μία έγκυρη διεύθυνση email`
            SUBMIT_BTN.innerHTML = `Έπιβεβαίωση`
        },1000)

        return
    }


    try {
        await axios({
            method: 'POST', 
            url: '/bookingTransfer', 
            data: {
                name: $name.toString('utf-8'), 
                lname: $lname.toString('utf-8'), 
                email: $email, 
                tel: $tel, 
                store: $store,
                date: $date, 
                submitDate: getFormattedDate()
            }
        })
        .then((response) => {
            if(response.status !== 200) {
                setTimeout(() => {
                    msgField.style.color = "red"
                    msgField.textContent = `* Παρακαλούμε επιλέξτε ένα ωράριο επίσκεψης`
                    SUBMIT_BTN.innerHTML = `Έπιβεβαίωση`
                },1000)
            }
            else {
                if(response.data.error === 1) {
                    console.log(reponse.data.message)
                } else {
                    msgField.textContent = ``
                    setTimeout(() => {
                        window.location.href = '/?success=true'
                        SUBMIT_BTN.innerHTML = `Έπιβεβαίωση`
                    },3000)
                }

            }
        })
        .catch(() =>{
            setTimeout(() => {
                msgField.style.color = "red"
                msgField.textContent =`* Έχετε ήδη κάνει μία κράτηση για επισκεψη στο κατάστημα αυτήν την εβδομάδα`
                SUBMIT_BTN.innerHTML = `Έπιβεβαίωση`
            },1000)
        })
    }
    catch (err) {
        
    }

}

function getFormattedDate() {
    let date = new Date()
    let year = date.getFullYear();
  
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }