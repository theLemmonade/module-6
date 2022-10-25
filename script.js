var history = document.getElementsByClassName('history'.)
var title = document.getElementById('title');
var setting = String

function setLocation() {
    setting = this.getAtribute('id');
    console.log('Setting location to ' + setting + '.')
    title.textContent = setting;

}

history.addEventListener('click', setLocation)