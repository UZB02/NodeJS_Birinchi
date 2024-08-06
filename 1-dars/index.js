const http=require('http');
const fs=require('fs');
const path=require('path');
const server=http.createServer((req,res)=>{
    if(req.method==='GET'){
        res.writeHead(200,{'Content-Type':'text/html'});
        if(req.url==="/"){
            fs.readFile(path.join(__dirname,"Vives","index.html"),'utf8',(err,content)=>{
                if(err) throw err;
                res.end(content);
            })
        }else if(req.url==="/about"){
            fs.readFile(path.join(__dirname,"Vives","about.html"),'utf8',(err,content)=>{
                if(err) throw err;
                res.end(content);
            });
        }else if(req.url==="/contact"){
            fs.readFile(path.join(__dirname,"Vives","contact.html"),"utf8",(err,content)=>{
                if(err) throw err;
                res.end(content);
            })
        }else if(req.url==="/api/admin"){
            // res.writeHead(200,{'Content-Type':'text/html'});
          const admin={name:"Muhsinbek",secondname:"Mirzamatov",age:22}
          res.end(`
          <h1>Admin panel</h1><br>
          Name: ${admin.name} <br>
          Second Name: ${admin.secondname}<br>
          Age: ${admin.age}
          `);
        }
    }else if(req.method==='POST'){
        const email=[]
        req.on("data", data=>{
            email.push(Buffer.from(data))
        })
        req.on("end",()=>{
            const message=email.toString().split("=")[1];
            res.end(`
            <h1>Email successfuly add: ${decodeURIComponent(
              message
            )}</h1><br>
            <button><a href="/">Back</a></button
            `);
        })
    }
})

server.listen(3000,()=>{
    console.log("Server has been started on port: 3000");
})