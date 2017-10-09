function buttonStatic(id)
{
    document.getElementById(id).style.backgroundColor = "#b9efff";
    document.getElementById(id).style.color = "#49abc4";
}
function saveb(id)
{
    document.getElementById(id).style.backgroundColor = "#49abc4";
    document.getElementById(id).style.color = "#ffffff";
}
function book(id)
{
    document.getElementById(id).style.backgroundColor = "#49abc4";
}
function setp(id)
{
    document.getElementById(id).style.backgroundColor = "#49abc4";
    document.location.href="SetPricing.html"
}
function topup(id)
{  
    document.getElementById(id).style.fontWeight = "bold";
    document.getElementById(id).style.backgroundColor = "#49abc4";
    document.getElementById(id).style.textDecoration = "none";
    document.getElementById(id).style.color="#ffffff";
}
function logout(id)
{  
    document.getElementById(id).style.fontWeight = "bold";
    document.getElementById(id).style.backgroundColor = "#49abc4";
    document.getElementById(id).style.textDecoration = "none";
    document.getElementById(id).style.color="#ffffff";
}
 var previous="home-nav";
  function func(id) 
  {
      document.getElementById(previous).style.fontWeight = "normal";
      document.getElementById(id).style.color = "#49abc4";
      document.getElementById(id).style.fontWeight = "bold"
      document.getElementById(id).style.textDecoration= "none";
      previous=id;                    
  }

  $( document ).ready(function(){$(".button-collapse").sideNav();})

  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  $(function() {
  $('input.autocomplete').autocomplete({
    data: {
      "Apple": null,
      "Microsoft": null,
      "Google": 'http://placehold.it/250x250',
    }
  });
});
  $('.collapsible').collapsible();
   window.onload = function() 
  {
        var width=$(window).width();
        if(width > 1000)
        {
           
           $('#navigation').addClass("navbar-fixed")
        }
  };
  $(window).resize(function() 
  {
        var width=$(window).width();
        if(width > 1000)
        {
           $('#navigation').addClass("navbar-fixed");
        }
        if(width < 1000)
        {
            $('#navigation').removeClass("navbar-fixed");
        }
   });
   $(document).ready(function() {$('select').material_select();});
function mouseoverPass(obj) {
  var obj = document.getElementById('old-pass');
  obj.type = "text";
}
function mouseoutPass(obj) {
  var obj = document.getElementById('old-pass');
  obj.type = "password";
}