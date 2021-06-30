
$(".regb").click(function(){
    $(".reg").show(500);
})

if($(".regb").hasClass("alerti")){
    alert("User already registered");
}

$(".regl").click(function(){
    $(".login").show(500);
})

if($(".rego").hasClass("logout")){
    $(".regl").hide(500);
    $(".logout").show(500);
}

$(".logout").click(function(){
    location.reload();
});

if($(".regb").hasClass("wrong-password")){
    alert("please enter correct username or password");
}