document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const btnIcon = document.querySelector('.btn-icon');
    const loader = document.querySelector('.loader');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic client-side validation
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!fullname || !email || !subject || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Prepare data to send
        const formData = {
            fullname,
            email,
            subject,
            message
        };

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnIcon.style.display = 'none';
        loader.style.display = 'block';

        try {
            const response = await fetch('http://localhost:5000/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Show success message
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to connect to the server. Is the backend running?');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnIcon.style.display = 'inline-block';
            loader.style.display = 'none';
        }
    });
});
