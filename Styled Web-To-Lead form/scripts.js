$(document).ready(function(){
  $(".mul-select").select2({
      placeholder: "Please select",
      tags: true,
  });
});

// format phone numbers
function formatPhone(obj) {
  var numbers = obj.value.replace(/\D/g, ''),
  char = {0:'(',3:') ',6:' '};
  obj.value = '';
  for (var i = 0; i < numbers.length; i++) {
      obj.value += (char[i]||'') + numbers[i];
  }
}

// shows the first guardian section 
$("#relationshipChoice").change(function() {
  if ($(this).val() == "mother") {
    $('#mother1').show();
    $('#father1').hide();
    $('#guardian1-1').hide();
  } else if ($(this).val() == "father") {
    $('#mother1').hide();
    $('#father1').show();
    $('#guardian1-1').hide();
  } else if ($(this).val() == "guardian1") {
    $('#mother1').hide();
    $('#father1').hide();
    $('#guardian1-1').show();
    $('#guardian2-1').hide();
  } else {
    $('#mother1').hide();
    $('#father1').hide();
    $('#guardian1-1').hide();
  }
});
$("#relationshipChoice").trigger("change");

// allows addition of an additional parent/guardian
$("#addParentOrGuardian").change(function() {
  if ($(this).val() == "mother") {
    $('#mother2').show();
    $('#father2').hide();
    $('#guardian1-2').hide();
  } else if ($(this).val() == "father") {
    $('#mother2').hide();
    $('#father2').show();
    $('#guardian1-2').hide();
  } else if ($(this).val() == "guardian1") {
    $('#mother2').hide();
    $('#father2').hide();
    $('#guardian1-2').show();
  } else {
    $('#mother2').hide();
    $('#father2').hide();
    $('#guardian1-2').hide();
  }
});
$("#addParentOrGuardian").trigger("change");

// changes first dropdown depending on dropdown choice
$("#relationshipChoice").change(function() {
  if ($(this).val() == "mother") {
    $("#addParentOrGuardian option:nth-child(2)").hide();
    $("#addParentOrGuardian option:nth-child(3)").show();
    $("#addParentOrGuardian option:nth-child(4)").show();
  } else if ($(this).val() == "father") {
    $("#addParentOrGuardian option:nth-child(3)").hide();
    $("#addParentOrGuardian option:nth-child(2)").show();
    $("#addParentOrGuardian option:nth-child(4)").show();
  } else if ($(this).val() == "guardian1") {
    $("#addParentOrGuardian option:nth-child(4)").hide();
    $("#addParentOrGuardian option:nth-child(2)").show();
    $("#addParentOrGuardian option:nth-child(3)").show();
  } else {
    $("#addParentOrGuardian option:nth-child(2)").show();
    $("#addParentOrGuardian option:nth-child(3)").show();
    $("#addParentOrGuardian option:nth-child(4)").show();
  }
});
$("#relationshipChoice").trigger("change");

// changes second dropdown depending on dropdown choice
$("#addParentOrGuardian").change(function() {
  if ($(this).val() == "mother") {
    $("#relationshipChoice option:nth-child(2)").hide();
    $("#relationshipChoice option:nth-child(3)").show();
    $("#relationshipChoice option:nth-child(4)").show();
  } else if ($(this).val() == "father") {
    $("#relationshipChoice option:nth-child(3)").hide();
    $("#relationshipChoice option:nth-child(2)").show();
    $("#relationshipChoice option:nth-child(4)").show();
  } else if ($(this).val() == "guardian1") {
    $("#relationshipChoice option:nth-child(4)").hide();
    $("#relationshipChoice option:nth-child(2)").show();
    $("#relationshipChoice option:nth-child(3)").show();
  } else {
    $("#relationshipChoice option:nth-child(2)").show();
    $("#relationshipChoice option:nth-child(3)").show();
    $("#relationshipChoice option:nth-child(4)").show();
  }
});
$("#addParentOrGuardian").trigger("change");

// adds second child
$("#addChild").click(function() {
  $(".child2").toggleClass("child2-display");
  $("#addChild2").toggle();
});

// adds third child
$("#addChild2").click(function() {
  $(".child3").toggleClass("child3-display");
  $("#addChild3").toggle();
});

// adds fourth child
$("#addChild3").click(function() {
  $(".child4").toggleClass("child4-display");
  $("#addChild4").toggle();
});

// make certain inputs required when visible
$("form").change(function() {
  $(".required-when-visible").each(function(){
    if($(this).is(":visible")){
      $(this).prop('required', true);
    }
  });
});
$("form").trigger("change");

// datepicker calendar
$("#00N0r000000U5v1, #00N0r000000U5v7, #00N0r000000U5vD, #00N0r000000U5vJ").datepicker({
  changeMonth: true,
  changeYear: true,
  yearRange: "-100:+0",
  dateFormat: "mm/dd/yy",
  maxDate: "0"
});

// at least one guardian is required
$("#submitForm").click(function(e) {
  var checkDropdown = $("#relationshipChoice");
  if (checkDropdown.val() === "selectOption") {
    var err = document.getElementById("selectResult");
    err.innerHTML="Please select at least one parent/guardian";
    err.style.color="red";
    err.scrollIntoView();
    e.preventDefault();
  } else {
    document.getElementById('selectResult').innerHTML="";
    $('#form').submit();
  }
});

// checks that date of birth fields are in the past
function isFutureDate(idate){
  var today = new Date(),
      idate = idate.split("/");
  
  idate = new Date(idate[2], idate[0] - 1, idate[1]);
  return (today - idate) < 0 ? true : false;
}

$("#submitForm").click(function(e) {
  var child1date = document.getElementById("00N0r000000U5v1"),
      child2date = document.getElementById("00N0r000000U5v7"),
      child3date = document.getElementById("00N0r000000U5vD"),
      child4date = document.getElementById("00N0r000000U5vJ"),
      resultDiv = document.getElementById("dateWarn"),
      resultDiv2 = document.getElementById("dateWarn2"),
      resultDiv3 = document.getElementById("dateWarn3"),
      resultDiv4 = document.getElementById("dateWarn4");
  if(isFutureDate(child1date.value)){
      resultDiv.innerHTML = "Please select a date in the past";
      resultDiv.scrollIntoView();
      resultDiv.style.color = "red";
      resultDiv2.innerHTML = "";
      resultDiv3.innerHTML = "";
      resultDiv4.innerHTML = "";
      e.preventDefault();
  } else if(isFutureDate(child2date.value)) {
      resultDiv2.innerHTML = "Please select a date in the past";
      resultDiv2.scrollIntoView();
      resultDiv2.style.color = "red";
      resultDiv.innerHTML = "";
      resultDiv3.innerHTML = "";
      resultDiv4.innerHTML = "";
      e.preventDefault();
  } else if(isFutureDate(child3date.value)) {
      resultDiv3.innerHTML = "Please select a date in the past";
      resultDiv3.scrollIntoView();
      resultDiv3.style.color = "red";
      resultDiv.innerHTML = "";
      resultDiv2.innerHTML = "";
      resultDiv4.innerHTML = "";
      e.preventDefault();
  } else if(isFutureDate(child4date.value)) {
      resultDiv4.innerHTML = "Please select a date in the past";
      resultDiv4.scrollIntoView();
      resultDiv4.style.color = "red";
      resultDiv.innerHTML = "";
      resultDiv2.innerHTML = "";
      resultDiv3.innerHTML = "";
      e.preventDefault();
  } else {
      resultDiv.innerHTML = "";
      resultDiv2.innerHTML = "";
      resultDiv3.innerHTML = "";
      resultDiv4.innerHTML = "";
      $('#form').submit();
  }
});