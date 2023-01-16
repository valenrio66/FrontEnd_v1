const API_ENDPOINT = 'https://sbc-sebatcabut.herokuapp.com';

const getData = () => {
    fetch(API_ENDPOINT + '/invertebratas')
        .then(response => response.json())
        .then(data => {
            displayData(data.data.data);
        })
        .catch(error => console.log(error));
}
// Menampilkan data
getData();

const getDataById = (id) => {
    fetch(API_ENDPOINT + '/invertebrata/' + id)
        .then(response => response.json())
        .then(data => {
            displayDataById(data.data);
        })
        .catch(error => console.log(error));
}

const displayDataById = (data) => {
    document.getElementById("id").value = data.id;
    document.getElementById("nama").value = data.nama;
    document.getElementById("lokasi_ditemukan").value = data.lokasi_ditemukan;
    document.getElementById("waktu_ditemukan").value = data.waktu_ditemukan;
}

const deleteData = (id) => {
    fetch(API_ENDPOINT + '/invertebrata/' + id, {
        method: 'DELETE'
    })
}

const displayData = (dataArray) => {
    let output = "";
    dataArray.forEach(function(object, index) {
        output += `
        <tr>
        <td>${index+1}</td>
        <td>${object.nama}</td>
        <td>${object.lokasi_ditemukan}</td>
        <td>${object.waktu_ditemukan}</td>
        <td>
        <button class="btn btn-warning" data-id="${object.id}">Update</button>
        <button class="btn btn-danger" data-id="${object.id}">Delete</button>
        </td>
        </tr>
        `;
    });
    document.getElementById("result").innerHTML = output;

    // Event listener untuk button update
    let updateButtons = document.querySelectorAll('btn btn-warning');
    updateButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let id = this.getAttribute('data-id');
            getDataById(id);
            window.location.href = 'update.html?id=' + id;
            let dataObject = dataArray.find(function (object) {
                return object.id === id;
            });
            document.getElementById("update-id").value = dataObject.id;
            document.getElementById("update-nama").value = dataObject.nama;
            document.getElementById("update-lokasi_ditemukan").value = dataObject.lokasi_ditemukan;
            document.getElementById("update-waktu_ditemukan").value = dataObject.waktu_ditemukan;
        });
    });
    
    let deleteButtons = document.querySelectorAll('btn btn-danger');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let id = this.getAttribute('data-id');
            deleteData(id);
            let row = this.parentNode.parentNode;
            row.parentNode.removeChild(row);
        });
    });

}