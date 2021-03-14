var guests = JSON.parse(localStorage.getItem('guests')) || [];

var elList = document.getElementById('guest_list');
var elField = document.getElementById('guest_name');
var elButton = document.getElementById('guest_register');

var addGuests = function () {
  var guestName = elField.value;
  console.log("Tamanho: " + guestName.length);
  if (guestName.length > 0) {
    var find = -1;
    for (var i = 0; i < guests.length; i++) {
      var guest = guests[i];
      if (guest.name === guestName) {
        find = i;
        break;
      }
    }
    if (find == -1) {
      guests.push({ name: guestName });
      elField.value = "";
      saveGuests();
      listGuests();
    } else {
      alert("Repeated guests!");
    }
  } else {
    alert("Guest's name can't be empty!");
  }
}

var saveGuests = function() {
  localStorage.setItem('guests', JSON.stringify(guests));
}

var listGuests = function() {
  elList.innerHTML = "";
  for (const guest of guests) {
    var elGuest = document.createElement('li');
    var elClass = document.createAttribute('class');
    elClass.value = 'guest';
    elGuest.setAttributeNode(elClass);

    var divLi = document.createElement('div');

    var elDelete = document.createElement('a');
    var elDeleteName = document.createTextNode('Delete');

    elDelete.setAttribute("href", "#");
    elDelete.appendChild(elDeleteName);
    elDelete.onclick = () => {
      guests = guests.filter((item) => {
        return item.name != guest.name;
      });
      saveGuests();
      listGuests();
    }

    var elGuestName = document.createTextNode(guest.name);

    divLi.appendChild(elGuestName);
    divLi.appendChild(elDelete);

    elGuest.appendChild(divLi);

    elList.appendChild(elGuest);
  }
}

elButton.onclick = addGuests;

elField.onkeypress = (event) => {
  if (event.keyCode == 0xd) {
    addGuests;
  }
}

listGuests();