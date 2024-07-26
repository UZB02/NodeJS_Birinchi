const fs=require('fs');
const path=require('path');

// fs.mkdir(path.join(__dirname,'tekshiruv'),err=>{
//     if(err) throw new Error();
//     console.log('Fayl yaratildi');
// }) //async

// fs.writeFile(path.join(__dirname,'tekshiruv','hello.txt'),'Hello World',(err)=>{
//     if(err) throw new Error();
//     console.log('Fayl yaratildi');
// })
// fs.writeFile(path.join(__dirname,"tekshiruv","index.html"),'<h1>Hello World</h1>',(err)=>{
//     if(err) throw new Error();
//     console.log('Fayl yaratildi');
// })

// fs.appendFile(path.join(__dirname,'tekshiruv','index.html'),'<div>Hello World</div>',(err)=>{
//     if(err) throw new Error();
//     console.log('Fayl yaratildi');
// })

// fs.mkdir(path.join(__dirname,'tekshiruv1'),(err)=>{
//     if(err) throw new Error();
//     console.log('Fayl yaratildi');
// })

// fs.writeFile(path.join(__dirname,"tekshiruv1","info.json"),'{"name":"Muhsinbek Mirzamatov","age":22}',(err)=>{
//     if(err) throw new Error();
//     console.log('Fayl yaratildi');

//     fs.appendFile(path.join(__dirname,"tekshiruv1","info.json"),',{"name":"Muhsinbek Mirzamatov","age":22,"city":"Namangan"}',(err)=>{
//         if(err) throw new Error();
//         console.log('Fayl yaratildi');
//     })
// })

fs.readFile(path.join(__dirname,"tekshiruv1","info.json"),(err,data)=>{
    if(err) throw new Error();
    console.log(Buffer.from(data).toString('utf-8'));
})
