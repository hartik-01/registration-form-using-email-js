(function() {
    // Initialize EmailJS with your user ID
    emailjs.init("OIY3YtvAQuNTH7CzX");
})();

let generatedCode = null;

function validateForm() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value;
    let errorMessages = '';

    if (name.trim() === '') {
        errorMessages += 'Name is required.<br>';
    }

    if (!validateEmail(email)) {
        errorMessages += 'Invalid email format.<br>';
    }

    if (!validatePhone(phone)) {
        errorMessages += 'Phone number must be 10 digits.<br>';
    }

    if (dob === '') {
        errorMessages += 'Date of birth is required.<br>';
    }

    if (address.trim() === '') {
        errorMessages += 'Address is required.<br>';
    }

    if (errorMessages) {
        document.getElementById('errorMessages').innerHTML = errorMessages;
        return false;
    }

    // Generate a random verification code
    generatedCode = Math.floor(100000 + Math.random() * 900000);

    // Send the verification email
    sendVerificationEmail(name, email, generatedCode);

    // Show the verification code section
    document.getElementById('verificationSection').style.display = 'block';

    return false; // Prevent form submission
}

function sendVerificationEmail(name, email, verificationCode) {
    let templateParams = {
        name: name,
        email: email,
        verification_code: verificationCode
    };

    emailjs.send('service_2', 'template_5ojxc7b', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Verification email sent!');
    }, function(error) {
        console.error('FAILED...', error);
        alert('Failed to send verification email. Check console for details.');
    });
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    return phone.length === 10 && !isNaN(phone);
}

function verifyCode() {
    let enteredCode = document.getElementById('verificationCode').value;
    if (parseInt(enteredCode) === generatedCode) {
        document.getElementById('verificationResult').innerText = 'Verification successful!';
        document.getElementById('verificationResult').style.color = 'green';
    } else {
        document.getElementById('verificationResult').innerText = 'Verification failed. Please check the code and try again.';
        document.getElementById('verificationResult').style.color = 'red';
    }
}
