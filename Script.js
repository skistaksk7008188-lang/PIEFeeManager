// ===== PIE Institute Fee Receipt System =====

let receipts = JSON.parse(localStorage.getItem("pieReceipts")) || [];

const receipt = document.getElementById("receipt");
const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const classInput = document.getElementById("class");
const monthInput = document.getElementById("month");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const dayInput = document.getElementById("day");
const teacherInput = document.getElementById("teacher");
const preview = document.getElementById("preview");
const historyTable = document.getElementById("historyTable");
const search = document.getElementById("search");

function generateReceiptNo() {
    receipt.value = "PIE-" + (receipts.length + 1).toString().padStart(4, "0");
}

generateReceiptNo();

dateInput.addEventListener("change", function () {

    const d = new Date(this.value);

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    dayInput.value = days[d.getDay()];

});

function saveData() {

    if (
        nameInput.value == "" ||
        rollInput.value == "" ||
        amountInput.value == "" ||
        dateInput.value == "" ||
        teacherInput.value == ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    let obj = {

        receipt: receipt.value,
        name: nameInput.value,
        roll: rollInput.value,
        className: classInput.value,
        month: monthInput.value,
        amount: amountInput.value,
        date: dateInput.value,
        day: dayInput.value,
        teacher: teacherInput.value

    };

    receipts.push(obj);

    localStorage.setItem(
        "pieReceipts",
        JSON.stringify(receipts)
    );

    showReceipt(obj);

    loadHistory();

    generateReceiptNo();

    nameInput.value = "";
    rollInput.value = "";
    amountInput.value = "";
    teacherInput.value = "";
    dateInput.value = "";
    dayInput.value = "";

}

document
.getElementById("save")
.addEventListener("click", saveData);
function showReceipt(data){

preview.innerHTML=`

<h3 style="text-align:center;color:#0d6efd;">PIE Institute</h3>

<hr>

<p><b>Receipt No:</b> ${data.receipt}</p>

<p><b>Student Name:</b> ${data.name}</p>

<p><b>Roll Number:</b> ${data.roll}</p>

<p><b>Class:</b> ${data.className}</p>

<p><b>Month:</b> ${data.month}</p>

<p><b>Amount:</b> ₹${data.amount}</p>

<p><b>Date:</b> ${data.date}</p>

<p><b>Day:</b> ${data.day}</p>

<p><b>Received By:</b> ${data.teacher}</p>

<hr>

<h4 style="text-align:center;color:green;">
Fee Received Successfully
</h4>

`;

}

function loadHistory(){

historyTable.innerHTML="";

receipts.forEach(function(item,index){

historyTable.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${item.name}</td>

<td>${item.month}</td>

<td>₹${item.amount}</td>

<td>${item.date}</td>

</tr>

`;

});

}

loadHistory();

search.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let rows=historyTable.getElementsByTagName("tr");

for(let i=0;i<rows.length;i++){

let txt=rows[i].innerText.toLowerCase();

if(txt.indexOf(value)>-1){

rows[i].style.display="";

}else{

rows[i].style.display="none";

}

}

});
// ===== Print Receipt =====

document.getElementById("print").addEventListener("click", function () {

    if (preview.innerHTML.trim() === "") {
        alert("Please save a receipt first.");
        return;
    }

    let printWindow = window.open("", "", "width=800,height=700");

    printWindow.document.write(`
    <html>
    <head>
    <title>PIE Institute Fee Receipt</title>
    <style>
    body{
        font-family:Arial,sans-serif;
        padding:30px;
    }
    h2{
        text-align:center;
        color:#0d6efd;
    }
    hr{
        margin:15px 0;
    }
    p{
        font-size:18px;
        margin:8px 0;
    }
    </style>
    </head>
    <body>

    <h2>PIE Institute</h2>

    ${preview.innerHTML}

    </body>
    </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

});

generateReceiptNo();
loadHistory();