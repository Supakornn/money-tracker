//เข้าถึง id ใน HTML
const balance = document.getElementById('balance') // id balance
const money_plus = document.getElementById('money-plus') // id money-plus 
const money_minus = document.getElementById('money-minus') // id money-minus
const list = document.getElementById('list') // id list
const form = document.getElementById('form') // id form
const text = document.getElementById('text') // id text
const amount = document.getElementById('amount') // id amount

// arry ของ list ที่จะนำไปแสดง
const dataTransaction = [
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่ารถ",amount:-500},
    {id:3,text:"เงินเดือน",amount:+1800}
]

//var ของ arry dataTransaction 
const transactions = dataTransaction;

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
    item.innerHTML = `${transactions.text}<span>${symbol}${result}</span><button class="delete-btn">x</button>` ; //ส่งข้อมูลไปแสดงใน HTMl (ชื่อรายการ : เครื่องหมาย : จำนวนเงิน ปุ่ม)
    list.appendChild(item) // เอา item ไปใส่ใน list
}

// function format ตัวเลขหลักพัน
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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

init();

