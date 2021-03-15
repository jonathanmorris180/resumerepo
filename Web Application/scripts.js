$("#form-switch").click(function() {
    $(".vendor-form").toggle();
    $(".user-form").toggle();
});

$("#form-switch-back").click(function() {
    $(".vendor-form").toggle();
    $(".user-form").toggle();
});

// Tooltip script
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip(
  {container:'body', trigger: 'hover', placement:"bottom"}
  );   
});

// Validate state input as two-letter code
$("#resourceSubmit").on('click', function(e){
    e.preventDefault();
    var uForm = document.getElementById('userForm');
    var a = document.getElementById('state1').value.toLowerCase();
    if(uForm.checkValidity()){
        if(a === "alabama" || a === "alaska" || a === "arizona" || a === "arkansas" || a === "california" || a === "colorado" || a === "connecticut" || a === "delaware" || a === "florida" || a === "georgia" || a === "hawaii" || a === "idaho" || a === "illinois" || a === "indiana" || a === "iowa" || a === "kansas" || a === "kentucky" || a === "louisiana" || a === "maine" || a === "maryland" || a === "massachusetts" || a === "michigan" || a === "minnesota" || a === "mississippi" || a === "missouri" || a === "montana" || a === "nebraska" || a === "nevada" || a === "new hampshire" || a === "new jersey" || a === "new mexico" || a === "new york" || a === "north carolina" || a === "north dakota" || a === "ohio" || a === "oklahoma" || a === "oregon" || a === "pennsylvania" || a === "rhode island" || a === "south carolina" || a === "south dakota" || a === "tennessee" || a === "texas" || a === "utah" || a === "vermont" || a === "virginia" || a === "washington" || a === "west virginia" || a === "wisconsin" || a === "wyoming"){
            $("#resourceErrorMsg").html("Please enter a valid two-letter state code");
        } else {
            uForm.submit();
        }
    } else {
        uForm.reportValidity();
    }
});

// Validate form and geocode the inputted address before form submit
$('#vendorSubmit').on('click', async function(e){
    e.preventDefault();
    var vendorForm = document.getElementById('vendorForm');
    if(vendorForm.checkValidity()){
        var a = $('#street').val() + ' ' + $('#city').val() + ' ' + $('#state').val() + ' ' + $('#zip').val() + ' ' + $('#country').val();
        await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: a,
                key: 'fakekey'
            }
        })
        .then(function(value) {
            // Input formatted address
            $('#00N4S000000HUi1').val(value.data.results[0].formatted_address);
            console.log(value.data.results[0].formatted_address);
            $('#vendorForm').submit();
        });
    } else {
        vendorForm.reportValidity();
    }
});