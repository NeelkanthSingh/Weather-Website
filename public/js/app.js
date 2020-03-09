const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para1 = document.querySelector('#message-one')
const para2 = document.querySelector('#message-two')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    para1.textContent = 'Loading...'
    para2.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    fetch(url).then((response)=>{

    response.json().then((data)=>{
        if(data.error){
            para1.textContent = data.error
        }
        else{
        para1.textContent = data.location
        para2.textContent = data.forecast
        }
    })
    
})
    
})