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
app.set('view engine','ejs');

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
  } , function ( username, password, done){
  
         console.log(username);
            //var name1 = "john";
            con.query("select * from tbl_users where username = ?", [username], (err, result)=>{
            console.log(err); console.log(rows);
  
             return done(null, rows[0]);
  
        });
  
      }
  
  ));

passport.serializeUser((user, done)=>{

    done(null, user.id);

});

passport.deserializeUser((id, done)=>{

    con.query("select * from tbl_users where id = "+ id, (err, rows)=>{

        done(err, rows[0]);

    });

});

app.get('/signin', function(req, res){

    //res.render('login/index',{'message' :req.flash('message')});
    res.render('login');
  });

  app.post("/signin", passport.authenticate('local', {
    
    successRedirect: '/profile',

    failureRedirect: '/signin',

    failureFlash: true

}), function(req, res, info){

    //res.render('login/index',{'message' :req.flash('message')});
    res.send('this sign in hoye gese ]]]]]')

});

app.get('/profile',  function(req, res) {
    res.send('this is profile page ');
 })


 app.post('/create',(req,res)=>{
     console.log(req.body);
     const attendance = req.body.attendance;
     const course_name = req.body.course_name;
     const sql = "INSERT INTO `attend`(`attendance`,`course-name`) VALUES (?,?)";

     con.query(sql,[attendance,course_name],(error)=>{
      if(error){
          console.log(error)
      }
      else{
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

 app.get('/getList',(req,res)=>{
    console.log("aise toh");
    con.query("select * from attend",(err,result)=>{
        if(err){
            console.log(err)
        }else{
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

const port = process.env.port || 4000;
app.listen(port, console.log(`Server is running on port ${port}`));
