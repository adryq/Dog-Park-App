document.addEventListener('DOMContentLoaded', ()=> {
    const stateBtn = document.querySelector
    ('#state-btn')
    const dropdownState = document.querySelector
    ('#dropdown-state')

    stateBtn.addEventListener('click', () => {
        if(dropdownState.classList.contains ('hidden')){
            dropdownState.classList.remove ('hidden');
            dropdownState.classList.add('flex');
           
        }
        else{
            dropdownState.classList.remove('flex')
            dropdownState.classList.add('hidden')
            
        }    
    }
    )

})