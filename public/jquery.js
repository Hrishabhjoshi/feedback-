
// $( document ).ready(function(){

//   if (localStorage.getItem("user") === null) {
//     $('#myModal').modal({
//       backdrop: 'static',
//       keyboard: false
//     });
//   }

$('.loginBtn').click(function(){
    $('.login').show();
    $('.signUp').hide();
    /* border bottom on button click */
    $('.loginBtn').css({'border-bottom' : '2px solid #ff4141'});
    /* remove border after click */
    $('.signUpBtn').css({'border-style' : 'none'});
  });
 
  var Useremail ;
  var socket = io();
  //developerAll.console("loginbutton",())
  $("#loginbtn").click(function(){
    var email = $('#logmail').val();
    var passwordD = $('#password').val();
    //Useremail = email ;
    console.log(email);
    console.log(passwordD);
    socket.emit("login user", email, passwordD, (response) => {
      console.log(response.status); // ok
      if (response.status == "ok")
      {
      window.open("./feedback.html" , "_self");
      // $('#feedbackname').text(email) ;
       
      }
    });
  //   socket.on("list" , (data)=>{
  //     //   data.forEach((d) => {
  //     //           console.log(d);
            
  //     //  })
  //     console.log(data);
  //  });
   })


   $("#signUpbtn").click(function(){
    var nameD = $('#userName').val();
    var email = $('#userEmail').val();
    var password1 = $('#userpswrd').val();
    var password2 =$('#confirmpswrd').val();
    console.log(nameD);
    console.log(password1);
    socket.emit("register user", nameD,email, password1,password2, (response) => {
      console.log(response.status); // ok

    });
   })

  /* Show sign Up form on button click */
   

  $('.signUpBtn').click(function(){
    $('.login').hide();
    $('.signUp').show();
    
    $('.signUpBtn').css({'border-bottom' : '2px solid #ff4141'});
     /* remove border after click */
     $('.loginBtn').css({'border-style' : 'none'});
  });


  $('#submitfeedback').click(function(){
    var name= $('#feedbackname').val();
    var feedback= $('#comment').val() ;
    console.log(name);
    console.log(feedback);
    socket.emit("feedback data",name,feedback, (response) => {
      console.log(response.status); 

    });
})
