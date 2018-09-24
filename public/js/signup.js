$(document).ready(function () {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var userNameInput = $("input#user-input");
    var passwordInput = $("input#password-input");
    var userBioInput = $("textarea#bio-input");

    //When the signup button is clicked, we validate the email and passwordInput are not blank
    signUpForm.on("submit", function (event) {

        var userData = {
            userName: userNameInput.val().trim(),
            password: passwordInput.val().trim(),
            userBio: userBioInput.val().trim()
        };
        //console.log(userData);
        if (!userData.userName || !userData.password || !userData.userBio) {
            return;
        }
        // If we have an email and passwordInput, run the signUpUser function
        signUpUser(userData.userName, userData.password, userData.userBio);
        userNameInput.val("");
        passwordInput.val("");
        userBioInput.val("");
    });

    // Does a post to the signup route. If succesful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(userName, password, userBio) {
        $.post("/api/signup", {
            userName,
            password,
            userBio
        }).then(function (data) {
            //window.location.replace(data);

            $.get("/board").then(function () {

            })
            // If there's an error, handle it by throwing up a boostrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});