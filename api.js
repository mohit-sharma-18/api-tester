

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';


// click event function for json
let json = document.getElementById('json');
json.addEventListener('click', () => {

    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
});

// click event function for parameters
let parameter = document.getElementById('parameter');
parameter.addEventListener('click', () => {

    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

let newParaCount = 0;  // i define initial count of parameters from 0.

// get element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


// function for adding new parameter 
let addPara = document.getElementById('addPara');
addPara.addEventListener('click', () => {
    let newParams = document.getElementById('newParams');
    let string = `<div class="form-row d-flex my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${newParaCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control p-2" id="parameterKey${newParaCount + 2}"
                            placeholder="Enter Parameter ${newParaCount + 2} Key">
                    </div>
                    <div class="col-md-4 mx-2">
                        <input type="text" class="form-control p-2" id="parameterValue${newParaCount + 2}"
                            placeholder="Enter Parameter ${newParaCount + 2} Value">
                    </div>
                    <button type="button"  class="btn btn-danger deletePara">Remove</button>
                    </div>`;

    let paramElement = getElementFromString(string);
    newParams.appendChild(paramElement);



    // delete button event for added parameter
    let deletePara = document.getElementsByClassName('deletePara');
    for (param of deletePara) {
        param.addEventListener('click', (d) => {
            d.target.parentElement.remove();
        })
    };

    newParaCount++;  //Counting of added parameters
});

// Test button click event conditional function
let test = document.getElementById('test');
test.addEventListener('click', () => {


    document.getElementById('responseBox').innerHTML = 'Fetching api response...';

    // Fetch all user data
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user add data in params instead of json then collect all parameters
    if (contentType === 'newParams') {
        data = {};
        for (i = 0; i < newParaCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {  // = used if condition because we do not want any value empty
                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJson').value;
    }




    // fetch api GET and POST method

    if (requestType === 'GET') {
        fetch(url, {
            method: 'GET',
        })

            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseBox').value = text;
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json; chartset=UTF-8'
            },
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseBox').value = text;
            })
    }






    // There console logs are using to see if any error occur , will reconize easily
    console.log('url is', url);
    console.log('requesttype is', requestType);
    console.log('contenttype is', contentType);
    console.log('data is', data);


});



