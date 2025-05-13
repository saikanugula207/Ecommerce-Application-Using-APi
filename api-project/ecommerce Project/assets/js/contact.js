document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate Name
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        isValid = false;
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate Message
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required.';
        isValid = false;
    }

    // Submit if all validations pass
    if (isValid) {
        alert('Form submitted successfully!');
        document.getElementById('contactForm').reset(); // Clear the form
    }
});
