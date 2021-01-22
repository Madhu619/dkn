let data = {};

const createCard = (data, filter) => {
    let day = new Date(data.dateTime).getUTCDate() === new Date().getUTCDate() ? 'Today' : data.dateTime.split(' ')[0];
    let template = '';
    let newTemplate = data.new ? `<span class='new'> New </span>`  : ``;
    let date = new Date(data.dateTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    let noOfItem = data.noOfItem > 1 ? + data.noOfItem +' Items' : data.noOfItem +' Item'

    template += `<div class='card'> 
                    <div class='data-row-1'><span> Order #`+ data.id + newTemplate +`</span> <span class='date-time label-color'>`+day + `, `+ strTime +`</span></div>
                    <div class='data-row-2'> <img src='`+ data.imageUrl +`' /> <div> <p class='label-color'>` +noOfItem+`</p>  <p class='price'>&#x20B9;` + ( data.price * data.noOfItem) +`</p> </div>
                    <a class='btn details-btn' href='#`+data.id+`'> Details > </a>
                    </div>
                </div>`;
    return template;
}

var printData = (data, filter) => {
    let templateNode = '';
    document.getElementById('cards-wrapper').innerHTML =  '';
    let template = '';
    filterData = data.filter(ele => ele.status === filter);
    if (filterData.length === 0 ){
        templateNode += `<h1 class='no-data'> No Data Available </h1>`;
    } else {
        templateNode = filterData.map(card => createCard(card)).join('').toString();
    }
    document.getElementById('cards-wrapper').innerHTML =  templateNode;
}

let button = document.getElementsByClassName('btn-default');
for ( let i =0 ; i< button.length ; i++ ) {
    button[i].addEventListener('click', function(e) {
        document.getElementsByClassName('btn-default active')[0].classList.remove('active');
        e.currentTarget.classList.add('active');
        printData(data, e.currentTarget.dataset.event);
    });
}

var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", './js/sampleData.json', false ); // false for synchronous request
    xmlHttp.send( null );
    data = JSON.parse(xmlHttp.responseText).data;
    printData(data , 'pending');