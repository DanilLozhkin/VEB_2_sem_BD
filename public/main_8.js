
fetch('/models')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const num = data.length;
        if (num > 0) {
            Models(data);
        } else {
            console.log(`Моделей не найдено`);
        }
    })
    .catch(error => {
        console.error('ошибка', error);
    });


function Models(count) {
    let num = 0;

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let id_ = 0.0;

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('body').appendChild(table);

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "name";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "просмотр";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "удалить";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "обновить";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    thead.appendChild(row_1);

    while (count.length > num) {
        id_ += 1;

        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = "name:  " + count[num].name_Model + " / _id: " + count[num]._id;

        id_ += 0.1;
        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = "просмотр";
        row_2_data_2.id = id_; row_2_data_2.classList.add("TD_BUTT");

        // let row_2_a_2 = document.createElement('a');
        // row_2_a_2.setAttribute('href', `/models/${count[num]._id}`);

        id_ += 0.1;
        let row_2_data_3 = document.createElement('td');
        row_2_data_3.innerHTML = "удалить";
        row_2_data_3.id = id_; row_2_data_3.classList.add("TD_BUTT");

        id_ += 0.1;
        let row_2_data_4 = document.createElement('td');
        row_2_data_4.innerHTML = "обновить";
        row_2_data_4.id = id_; row_2_data_4.classList.add("TD_BUTT");
        id_ -= 0.3;


        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        tbody.appendChild(row_2);

        num += 1;
    }

    document.body.addEventListener('click', function (e) {
        if (Number(e.target.id)) {
            if ((e.target.id).toString().split('.')[1].charAt(0) == 1) {
                
                let dad = parseInt((e.target.id))-1;
                window.location.href = `/models/${count[dad]._id}`;

            } else if ((e.target.id).toString().split('.')[1].charAt(0) == 2) {
                console.log(e.target);

            } else if ((e.target.id).toString().split('.')[1].charAt(0) == 3) {
                console.log(e.target);

            }
        }
    });

}