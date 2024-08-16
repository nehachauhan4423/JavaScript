let data = []
const viewRecord = () => {
       document.getElementById('edit').style.display = "none"
       document.getElementById('add').style.display = "block"


       let tbl = "";
       let all = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
       all.map((val, i) => {
              tbl += `
                            <tr>
                                   <td>${++i}</td>
                                   <td>${val.name}</td>
                                   <td>${val.phone}</td>
                                   <td>
                                   <button onclick="deleteRecord(${val.id})">Delete</button>
                                   <button onclick="editRecord(${val.id})">Edit</button>
                                   </td>
                            </tr>
                     `
       })
       document.getElementById('view').innerHTML = tbl
}
viewRecord();


const saveData = () => {
       let username = document.getElementById('name').value;
       let userphone = document.getElementById('phone').value;
       if (!username || !userphone) {
              alert("NAME AND PHONE IS REQUIRED");
              return false;
       }
       let obj = {
              id: Math.floor(Math.random() * 10000),
              name: username,
              phone: userphone
       }
       if (localStorage.getItem('users') === null || localStorage.getItem('users') === undefined) {
              data.push(obj);
              localStorage.setItem('users', JSON.stringify(data))
              alert("RECORD ADD")
              viewRecord();
       }
       else {
              let all = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
              all.push(obj);
              localStorage.getItem('users',JSON.stringify(all))
              alert("RECORD ADD");
              viewRecord();
       }

       document.getElementById('name').value = "";
       document.getElementById('phone').value = "";
}

const deleteRecord = (id) => {
       let all = JSON.parse(localStorage.getItem('users'));
       let ans = all.filter((val) => {
              return val.id != id;
       })
       localStorage.setItem('users', JSON.stringify(ans));
       alert("RECORD DELETE");            
       viewRecord();
}

const editRecord = (id) => {
       document.getElementById('add').style.display = "none"
       document.getElementById('edit').style.direction = "block"


       let all = JSON.parse(localStorage.getItem('users'));
       let single = all.find(val => val.id == id);
       document.getElementById('name').value = single.name;
       document.getElementById('phone').value = single.phone;
       document.getElementById('editid').value = single.id;
}

const updatedata = () => {
       let editid = document.getElementById('editid').value;
       let name = document.getElementById('name').value;
       let phone = document.getElementById('phone').value;
       let all = JSON.parse(localStorage.getItem('users'));
       let up = all.map((val => {
              if (val.id === editid) {
                     val.name = name;
                     val.phone = phone;
              }                                                                            
              return val;
       }))

       localStorage.setItem('users', JSON.stringify(up));
       alert("EDIT SUCCESSFULLY");
       document.getElementById('name').value = "";
       document.getElementById('phone').value = "";
       document.getElementById("editid").value = "";
       viewRecord();
}