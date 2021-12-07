//เข้าถึง id ใน HTML
const balance = document.getElementById('balance') // id balance
const money_plus = document.getElementById('money-plus') // id money-plus 
const money_minus = document.getElementById('money-minus') // id money-minus
const list = document.getElementById('list') // id list
const form = document.getElementById('form') // id form
const text = document.getElementById('text') // id text
const amount = document.getElementById('amount') // id amount

// arry สำหรับเก็บรายการ
let transactions = [];

//function loop ข้อมูลใน transactions 
function init(){
    transactions.forEach(adddata);
    calculateMoney()
}

//function เช็คเครื่องหมาย และ  เอาข้อมูลใน transactions ไปใส่ใน HTML
function adddata(transactions){
    const symbol = transactions.amount < 0 ? '-' : '+'; //ถ้าได้ค่ามากกว่า 0 จะได้ เครื่องหมาย + ถ้าน้อยกว่า 0 จะได้เครื่องหมาย -
    const status = transactions.amount < 0 ? 'minus' : 'plus' ;  // เช็คค่า เพื่อกำหนด list
    const item = document.createElement('li'); // สร้าง element li ไว้สำหรับแสดงข้อมูล
    result = formatNumber(Math.abs(transactions.amount))
    item.classList.add(status); //กำนหด class ให้ item
    item.innerHTML = `${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>` ; //ส่งข้อมูลไปแสดงใน HTMl (ชื่อรายการ : เครื่องหมาย : จำนวนเงิน ปุ่ม)
    list.appendChild(item) // เอา item ไปใส่ใน list
}

// function format ตัวเลขหลักพัน
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// function สุ่ม ID สำหรับ ใส่ใน Transactions
function autoID(){
    return Math.floor(Math.random()*1000000);
}

//function คำนวณยอดคงเหลือ ใช้ .map ในการเก็บค่าไว้ในตัวแปร
function calculateMoney(){
    const amounts = transactions.map(transactions=>transactions.amount);
    const total = amounts.reduce((result, item)=>(result+=item), 0 ).toFixed(2);
    const income_total = amounts.filter(item=>item>0).reduce((result, item)=>(result+=item), 0 ).toFixed(2);
    const expense_total = (amounts.filter(item=>item<0).reduce((result, item)=>(result+=item), 0)* -1).toFixed(2);
    balance.innerText = `฿`+ formatNumber(total);
    money_plus.innerText = `฿`+ formatNumber(income_total);
    money_minus.innerText = `฿`+ formatNumber(expense_total);
}

// function สำหรับลบ รายการ
function removeData(id){
    list.innerHTML = '';
    transactions = transactions.filter(transactions=>transactions.id !== id)
    init();
}

// function สำหรับกรองข้อมูล input
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("กรุณาป้อนข้อมูลให้ครบ")
    // กำหนด ID ชื่อ รายการ และจำนวนเงิน สำหรับ เก็บใน data transactions
    }else { 
        const data = {
            id:autoID(),
            text:text.value,
            amount:+amount.value
        }
        //เพิ่มรายการที่ input ลงไปใน data transactions และเคืนค่าช่องกรอกข้อมูล เป็นค่าว่าง
        transactions.push(data);
        adddata(data);
        calculateMoney();
        text.value='';
        amount.value='';
    }
}

// รับ Event ของการกด submit ที่ปุ่มแล้วเรียกใช้ function addTransaction
form.addEventListener('submit', addTransaction);
init();
