//เข้าถึง id ใน HTML
const balance = document.getElementById('balance') // id balance
const money_plus = document.getElementById('money-plus') // id money-plus 
const money_minus = document.getElementById('money-mius') // id money-miuns
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
}

//function เช็คเครื่องหมาย และ  เอาข้อมูลใน transactions ไปใส่ใน HTML
function adddata(transactions){
    const symbol = transactions.amount < 0 ? '-' : '+'; //ถ้าได้ค่ามากกว่า 0 จะได้ เครื่องหมาย + ถ้าน้อยกว่า 0 จะได้เครื่องหมาย -
    const status = transactions.amount < 0 ? 'minus' : 'plus' ;  // เช็คค่า เพื่อกำหนด list
    const item = document.createElement('li'); // สร้าง element li ไว้สำหรับแสดงข้อมูล
    item.classList.add(status); //กำนหด class ให้ item
    item.innerHTML = `${transactions.text}<span>${symbol}${Math.abs(transactions.amount)}</span><button class="delete-btn">x</button>` ; //ส่งข้อมูลไปแสดงใน HTMl (ชื่อรายการ : เครื่องหมาย : จำนวนเงิน ปุ่ม)
    list.appendChild(item) // เอา item ไปใส่ใน list
    console.log(item);
}


init();

