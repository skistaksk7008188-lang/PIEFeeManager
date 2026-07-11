let ADMIN_PASSWORD =
localStorage.getItem("adminPassword") || "1234";
const passwordModal = document.getElementById("passwordModal");
const adminPassword = document.getElementById("adminPassword");
const loginBtn = document.getElementById("loginBtn");
const cancelBtn = document.getElementById("cancelBtn");

let actionAfterLogin = null;
const form = document.getElementById("feeForm");
const receipt = document.getElementById("receipt");

const dateInput = document.getElementById("date");

// আজকের তারিখ
dateInput.value = new Date().toISOString().split("T")[0];

// Receipt Number
let receipts = JSON.parse(localStorage.getItem("receipts")) || [];

let receiptNo = receipts.length + 1;

form.addEventListener("submit", function(e){

e.preventDefault();

const studentName = document.getElementById("studentName").value;
const roll = document.getElementById("roll").value;
const mobile = document.getElementById("mobile").value;
const className = document.getElementById("class").value;
const month = document.getElementById("month").value;
const amount = document.getElementById("amount").value;
const teacher = document.getElementById("teacher").value;
const date = document.getElementById("date").value;

const day = new Date(date).toLocaleDateString("en-US",{
weekday:"long"
});

receipt.style.display = "block";

receipt.innerHTML = `
<h2>PIE Institute</h2>
<hr><br>

<p><b>Receipt No:</b> PIE-${String(receiptNo).padStart(4,"0")}</p>

<p><b>Student:</b> ${studentName}</p>

<p><b>Roll:</b> ${roll}</p>

<p><b>Parent Mobile:</b> ${mobile}</p>

<p><b>Class:</b> ${className}</p>

<p><b>Month:</b> ${month}</p>

<p><b>Amount:</b> ₹${amount}</p>

<p><b>Date:</b> ${date}</p>

<p><b>Day:</b> ${day}</p>
<p><b>Received By:</b> ${teacher}</p>

<hr>

<h3 style="text-align:center;color:green;">
Fee Received Successfully
</h3>
`;

receiptNo++;
setTimeout(function(){


alert("Receipt Saved Successfully");

},800);
});
// Save Data

form.addEventListener("submit", function(){

const data = {
receiptNo: receiptNo - 1,
student: document.getElementById("studentName").value,
roll: document.getElementById("roll").value,
mobile: document.getElementById("mobile").value,
className: document.getElementById("class").value,
month: document.getElementById("month").value,
amount: document.getElementById("amount").value,
teacher: document.getElementById("teacher").value,
date: document.getElementById("date").value
};

receipts.push(data);

localStorage.setItem("receipts", JSON.stringify(receipts));
receiptNo = receipts.length + 1;
updateDashboard();
});
// ===========================
// Receipt History
// ===========================

const historyBox = document.getElementById("history");

function loadHistory(){

historyBox.innerHTML = "";

let list = JSON.parse(localStorage.getItem("receipts")) || [];

list.reverse().forEach(item=>{

historyBox.innerHTML += `
<div class="history-card">

<b>Receipt:</b> PIE-${String(item.receiptNo).padStart(4,"0")}<br>

<b>Name:</b> ${item.student}<br>

<b>Roll:</b> ${item.roll}<br>

<b>Month:</b> ${item.month}<br>

<b>Amount:</b> ₹${item.amount}<br><br>
<button onclick="editReceipt(${item.receiptNo})">
✏️ Edit
</button>

<br><br>
<button onclick="deleteReceipt(${item.receiptNo})">
🗑 Delete
</button>

</div>
`;

});

}

// App খুললেই History দেখাবে
loadHistory();

// Receipt Save হলে History Update হবে
form.addEventListener("submit",function(){

setTimeout(loadHistory,100);

});
// ===========================
// Search Receipt
// ===========================

const search = document.getElementById("search");

search.addEventListener("keyup", function(){

const value = this.value.toLowerCase();

const cards = document.querySelectorAll(".history-card");

cards.forEach(card=>{

if(card.innerText.toLowerCase().includes(value)){

card.style.display = "block";

}else{

card.style.display = "none";

}

});

});
// ===========================
// Dashboard Update
// ===========================

function updateDashboard(){

const list = JSON.parse(localStorage.getItem("receipts")) || [];

document.getElementById("totalReceipts").innerText = list.length;

let totalAmount = 0;
let studentRolls = [];

list.forEach(item=>{

totalAmount += Number(item.amount);

if(!studentRolls.includes(item.roll)){
studentRolls.push(item.roll);
}

});

document.getElementById("totalStudents").innerText = studentRolls.length;

document.getElementById("totalAmount").innerText = "₹" + totalAmount;

}

// App খুললেই Dashboard Update হবে
updateDashboard();

// Receipt Save হওয়ার পর Dashboard Update হবে
form.addEventListener("submit", function(){

setTimeout(updateDashboard,100);

});
// ===========================
// Print Receipt
// ===========================

const printBtn = document.getElementById("printBtn");

// Receipt Save হলে Print Button দেখাবে
form.addEventListener("submit", function(){

setTimeout(function(){

printBtn.style.display = "block";

},100);

});

// Print Button
printBtn.addEventListener("click", function(){

const printWindow = window.open("", "_blank");

printWindow.document.write(`
<html>
<head>
<title>PIE Institute Receipt</title>

<style>
body{
font-family:Arial,sans-serif;
padding:30px;
}
</style>

</head>

<body>

${receipt.innerHTML}

</body>
</html>
`);

printWindow.document.close();
printWindow.focus();
printWindow.print();

});
// Delete Receipt

function deleteReceipt(no){
passwordModal.style.display = "flex";

actionAfterLogin = function(){

receipts = receipts.filter(r => r.receiptNo != no);

localStorage.setItem("receipts", JSON.stringify(receipts));

loadHistory();
updateDashboard();

alert("Receipt Deleted Successfully");

};
let ok = confirm("Delete this receipt?");

if(!ok) return;

receipts = receipts.filter(r => r.receiptNo != no);

localStorage.setItem("receipts", JSON.stringify(receipts));

loadHistory();

updateDashboard();

alert("Receipt Deleted Successfully");

}
// ===========================
// Edit Receipt
// ===========================

function editReceipt(no){
passwordModal.style.display = "flex";

actionAfterLogin = function(){

const item = receipts.find(r => r.receiptNo == no);

if(!item) return;

document.getElementById("studentName").value = item.student;
document.getElementById("roll").value = item.roll;
document.getElementById("mobile").value = item.mobile;
document.getElementById("class").value = item.className;
document.getElementById("month").value = item.month;
document.getElementById("amount").value = item.amount;
document.getElementById("teacher").value = item.teacher;
document.getElementById("date").value = item.date;

receipts = receipts.filter(r => r.receiptNo != no);
localStorage.setItem("receipts", JSON.stringify(receipts));

loadHistory();
updateDashboard();

window.scrollTo({
top:0,
behavior:"smooth"
});

};
const item = receipts.find(r => r.receiptNo == no);

if(!item) return;

document.getElementById("studentName").value = item.student;
document.getElementById("roll").value = item.roll;
document.getElementById("mobile").value = item.mobile;
document.getElementById("class").value = item.className;
document.getElementById("month").value = item.month;
document.getElementById("amount").value = item.amount;
document.getElementById("teacher").value = item.teacher;
document.getElementById("date").value = item.date;

deleteReceipt(no);

window.scrollTo({
top:0,
behavior:"smooth"
});

}
// ===========================
// Monthly Report
// ===========================

const reportBtn = document.getElementById("reportBtn");

reportBtn.addEventListener("click", function(){

const month = document.getElementById("reportMonth").value;

if(month==""){
alert("Please Select Month");
return;
}

const list = JSON.parse(localStorage.getItem("receipts")) || [];

let totalAmount = 0;
let totalReceipts = 0;
let students = [];

list.forEach(item=>{

if(item.month===month){

totalReceipts++;

totalAmount += Number(item.amount);

if(!students.includes(item.roll)){
students.push(item.roll);
}

}

});

alert(
"📊 MONTHLY REPORT\n\n"+
"Month : "+month+
"\n\nStudents : "+students.length+
"\nReceipts : "+totalReceipts+
"\nCollection : ₹"+totalAmount
);

});
loginBtn.addEventListener("click", function(){

if(adminPassword.value === ADMIN_PASSWORD){

passwordModal.style.display = "none";
adminPassword.value = "";

if(actionAfterLogin){
actionAfterLogin();
actionAfterLogin = null;
}

}else{

alert("Wrong Password");
adminPassword.value = "";

}

});

cancelBtn.addEventListener("click", function(){

passwordModal.style.display = "none";
adminPassword.value = "";
actionAfterLogin = null;

});
// ===========================
// Backup Data
// ===========================

const backupBtn = document.getElementById("backupBtn");

backupBtn.addEventListener("click", function(){

const data = localStorage.getItem("receipts") || "[]";

const blob = new Blob([data], {type:"application/json"});

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = "PIE_Institute_Backup.json";

link.click();

URL.revokeObjectURL(link.href);

alert("Backup Downloaded Successfully");

});
// ===========================
// Restore Data
// ===========================

const restoreBtn = document.getElementById("restoreBtn");
const restoreFile = document.getElementById("restoreFile");

restoreBtn.addEventListener("click", function(){
    restoreFile.click();
});

restoreFile.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(){

        try{

            const data = JSON.parse(reader.result);

            localStorage.setItem("receipts", JSON.stringify(data));

            receipts = data;

            loadHistory();
            updateDashboard();

            alert("Data Restored Successfully");

        }catch{

            alert("Invalid Backup File");

        }

    };

    reader.readAsText(file);

});
// Change Admin Password

let adminPasswordValue =
localStorage.getItem("adminPassword") || "1234";

const changePasswordBtn =
document.getElementById("changePasswordBtn");

changePasswordBtn.addEventListener("click", function(){

const oldPass =
document.getElementById("oldPassword").value;

const newPass =
document.getElementById("newPassword").value;

const confirmPass =
document.getElementById("confirmPassword").value;

if(oldPass !== adminPasswordValue){

alert("Current Password is Wrong");

return;

}

if(newPass !== confirmPass){

alert("New Password Does Not Match");

return;

}

localStorage.setItem("adminPassword", newPass);

adminPasswordValue = newPass;
ADMIN_PASSWORD = newPass;
alert("Password Changed Successfully");

document.getElementById("oldPassword").value = "";
document.getElementById("newPassword").value = "";
document.getElementById("confirmPassword").value = "";

});
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");

settingsBtn.addEventListener("click", function(){
    settingsModal.style.display = "flex";
});

closeSettings.addEventListener("click", function(){
    settingsModal.style.display = "none";
});