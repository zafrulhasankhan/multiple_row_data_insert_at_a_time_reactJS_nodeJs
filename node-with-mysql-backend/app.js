const express = require('express');
const app = express();
var flash = require('connect-flash');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('./lib/dbconn');
var sess = require('express-session');
var Store = require('express-session').Store;
var mysql = require('mysql');
const expressLayouts = require('express-ejs-layouts');
var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(expressLayouts);
app.set('view engine', 'ejs');

var DbConnectConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: 'attendance_system_node_react'
}

var con = mysql.createConnection(DbConnectConfig);
con.connect(function (error) {
    if (error) {
        console.log("connection failed")
    }
    else {
        console.log("connection successfully")

    }
});

app.use(sess({

    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    resave: true,
    saveUninitialized: true

}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({

    usernameField: 'username',

    passwordField: 'password',

    passReqToCallback: true //passback entire req to call back
}, function (username, password, done) {

    console.log(username);
    //var name1 = "john";
    con.query("select * from tbl_users where username = ?", [username], (err, result) => {
        console.log(err); console.log(rows);

        return done(null, rows[0]);

    });

}

));

passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser((id, done) => {

    con.query("select * from tbl_users where id = " + id, (err, rows) => {

        done(err, rows[0]);

    });

});

app.get('/signin', function (req, res) {

    //res.render('login/index',{'message' :req.flash('message')});
    res.render('login');
});

app.post("/signin", passport.authenticate('local', {

    successRedirect: '/profile',

    failureRedirect: '/signin',

    failureFlash: true

}), function (req, res, info) {

    //res.render('login/index',{'message' :req.flash('message')});
    res.send('this sign in hoye gese ]]]]]')

});

app.get('/profile', function (req, res) {
    res.send('this is profile page ');
})


app.post('/create', (req, res) => {
    console.log(req.body);
    const attendance = req.body.attendance;
    const course_name = req.body.course_name;
    const sql = "INSERT INTO `attend`(`attendance`,`course-name`) VALUES (?,?)";

    con.query(sql, [attendance, course_name], (error) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log("Data inserted successfully")

        }

        //data retrieve


        // //con.query("select * from tbl_users",(err,result)=>{
        //     if(err){
        //         //res.send(err)
        //         console.log(err);
        //     }else{
        //        //res.send(result);
        //        console.log(result)
        //     }
    })
})

app.get('/getList', (req, res) => {
    console.log("aise toh");
    con.query("select * from attend", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            //console.log(result)
            res.send(result);
            //console.log(result)
        }
    })
})

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/signin');

}


// var arr = [
//     {id:'10',"":""},
//     {id:'1',"":""},
//     {id:'1',"":""},
//     {id:'1',"":""},
// ];

// let count = arr.reduce((val,itm)=>{
//     if(val?.id === "10" || itm.id ==="11"){
//         val+1;
//     }

// },0);
// console.log(count);


// const data = [
//     { id: 9, email: 'user1@example.com', product: {name:"cream",price:"10"}, date: 2019 - 03 - 11 },
//     { id: 10, email: 'user2@example.com', product: {name:"cream",price:"10"}, date: 2019 - 03 - 11 },
//     { id: 11, email: 'user3@example.com', product: {name:"cream",price:"10"}, date: 2019 - 03 - 11 }, 
//     { id: 12, email: 'user4@example.com', product: {name:"cream",price:"10"}, date: 2019 - 03 - 11 }, 
//     { id: 13, email: 'user5@example.com', product: {name:"cream",price:"10"}, date: 2019 - 03 - 11 }
// ];
// const result = data.reduce((acc, { product }) => (acc[product] = (acc[product] || 0) + 1, acc),
//     { email: data[0].email });

// console.log(result);

// const phrase = `${result.email} you have in your account ${Object.entries(result).map(([k, v]) => k !== "email" && `${v} ${k}${v > 1 ? "s" : ""}`)
//         .filter(Boolean).join(" and ")
//     }`;
// console.log(phrase);
// //console.log(json.pa);


const array = [
    {id: 12, name: 'toto'},
    {id: [{id:12 , name:"hello"},{age:20}], name: 'toto'},
    {id: [{id:12 , name:"hello"},{age:20}], name: 'tutu'},
    {id: [{id:12 , name:"hello"},{age:20}], name: 'toto'},
  ];
  //console.log(array[0].id[1].name);
  const id = 12;
  const count = array.reduce((acc, cur) => cur.id === id ? ++acc : acc, 0);
  
  console.log("This is the count of id " + count);

//   const storage = [
//     { data: '1', status: '0' },
//     { data: '2', status: '0' },
//     { data: '3', status: '0' },
//     { data: '4', status: '0' },
//     { data: '5', status: '0' },
//     { data: '6', status: '0' },
//     { data: '7', status: '1' },
//   ];
  
//   const count1 = storage.filter(item => item.status === '0').length;
//   console.log(count1 + "etai ");


//   const items = [ 

//     { id: 9,
//       email: 'user@example.com',
//       product: 'handbag',
//       date: 2019-03-11 },
//     { id: 10,
//       email: 'user@example.com',
//       product: 'handbag',
//       date: 2019-03-11 },
//     { id: 11,
//       email: 'user@example.com',
//       product: 'handbag',
//       date: 2019-03-11 },
//     { id: 12,
//       email: 'user@example.com',
//       product: 'handbag',
//       date: 2019-03-11 },
//     { id: 13,
//       email: 'user@example.com',
//       product: 'joystick',
//       date: 2019-03-11 }
//   ]
  
//   let res1 = items.reduce((obj, itm) => {
//     obj.email = itm.email
//     obj[itm.product] = obj[itm.product] + 1 || 1
//     return obj
//   }, {})
//   //console.log(res1);
//   let str = []
  
//   Object.entries(res1).forEach(entry => {
//       console.log(entry[0]);
//     if(entry[0] == 'email') return
//     str.push(`${entry[1]} products of ${entry[0]}`)
//     console.log(entry);
//   })
  
//   console.log(str);
const port = process.env.port || 4000;
app.listen(port, console.log(`Server is running on port ${port}`));
