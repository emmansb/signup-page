// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const emailInput = document.querySelector('.email input');
    const password1Input = document.querySelector('.password1 input');
    const password2Input = document.querySelector('.password2 input');
    const createAccountBtn = document.querySelector('.btn');
    
    // Add event listeners for real-time validation
    emailInput.addEventListener('input', validateEmail);
    password1Input.addEventListener('input', validatePassword);
    password2Input.addEventListener('input', checkPasswordsMatch);
    
    // Submit button event listener
    createAccountBtn.addEventListener('click', handleSubmit);
    
    // Email validation function
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailInput.value);
        
        if (isValid) {
            emailInput.style.borderColor = '#84c7a8';
            emailInput.style.backgroundColor = 'rgba(158, 224, 192, 0.1)';
            return true;
        } else {
            emailInput.style.borderColor = '#FF6B6B';
            emailInput.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
            return false;
        }
    }
    
    // Password validation function
    function validatePassword() {
        // Password must be at least 8 characters with at least one number, one uppercase and one special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const isValid = passwordRegex.test(password1Input.value);
        
        if (isValid) {
            password1Input.style.borderColor = '#84c7a8';
            password1Input.style.backgroundColor = 'rgba(158, 224, 192, 0.1)';
            return true;
        } else {
            password1Input.style.borderColor = '#FF6B6B';
            password1Input.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
            return false;
        }
        
        // If second password is already filled, check match
        if (password2Input.value !== '') {
            checkPasswordsMatch();
        }
    }
    
    // Check if passwords match
    function checkPasswordsMatch() {
        if (password1Input.value === password2Input.value && password1Input.value !== '') {
            password2Input.style.borderColor = '#84c7a8';
            password2Input.style.backgroundColor = 'rgba(158, 224, 192, 0.1)';
            return true;
        } else {
            password2Input.style.borderColor = '#FF6B6B';
            password2Input.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
            return false;
        }
    }
    
    // Create a tooltip element for showing validation messages
    function createTooltip(message, targetElement) {
        // Remove any existing tooltips
        removeTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = message;
        tooltip.style.backgroundColor = '#FF6B6B';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.width = '100%';
        tooltip.style.textAlign = 'center';
        tooltip.style.marginTop = '5px';
        tooltip.style.position = 'static'; // Changed from absolute to static
        tooltip.style.zIndex = '100';
        
        // Insert the tooltip after the input group instead of inside it
        targetElement.parentNode.insertBefore(tooltip, targetElement.nextSibling);
        
        // Auto-dismiss tooltip after 3 seconds
        setTimeout(function() {
            removeTooltip();
        }, 3000);
    }
    
    function removeTooltip() {
        const existingTooltip = document.querySelector('.tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }
    
    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();
        
        // Remove any existing tooltips
        removeTooltip();
        
        // Validate all fields
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const doPasswordsMatch = checkPasswordsMatch();
        
        // Check if all validations pass
        if (!isEmailValid) {
            createTooltip('Please enter a valid email address', document.querySelector('.email'));
            return;
        }
        
        if (!isPasswordValid) {
            createTooltip('Password must be at least 8 characters with at least one uppercase letter, one number, and one special character', document.querySelector('.password1'));
            return;
        }
        
        if (!doPasswordsMatch) {
            createTooltip('Passwords do not match', document.querySelector('.password2'));
            return;
        }
        
        // If all validations pass, show success message and "submit" the form
        createAccountBtn.textContent = 'Creating account...';
        createAccountBtn.disabled = true;
        
        // Simulate account creation (you would replace this with actual API call)
        setTimeout(function() {
            // Create success message
            const container = document.querySelector('.container');
            container.innerHTML = `
                <i class="fa-solid fa-check-circle" style="color: #84c7a8; font-size: 48px; margin: 20px 0;"></i>
                <h2 style="color: #fff;">Account Created Successfully!</h2>
                <p style="color: #ffe; margin: 15px 0;">Welcome aboard! Your account has been created.</p>
                <button class="btn" onclick="window.location.href='#'">Go to Login</button>
            `;
        }, 1500);
    }
    
    // Add password toggle visibility
    function addPasswordToggle() {
        const passwordFields = [
            document.querySelector('.password1'),
            document.querySelector('.password2')
        ];
        
        passwordFields.forEach(field => {
            const toggleIcon = document.createElement('i');
            toggleIcon.className = 'fa-solid fa-eye-slash';
            toggleIcon.style.position = 'absolute';
            toggleIcon.style.right = '-80%';
            toggleIcon.style.top = '50%';
            toggleIcon.style.transform = 'translateY(-50%)';
            toggleIcon.style.color = '#666';
            toggleIcon.style.cursor = 'pointer';
            
            field.appendChild(toggleIcon);
            
            const passwordInput = field.querySelector('input');
            
            toggleIcon.addEventListener('click', function() {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    toggleIcon.className = 'fa-solid fa-eye';
                } else {
                    passwordInput.type = 'password';
                    toggleIcon.className = 'fa-solid fa-eye-slash';
                }
            });
        });
    }
    
    // Add password strength indicator
    function addPasswordStrengthIndicator() {
        const strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'strength-indicator';
        strengthIndicator.style.display = 'flex';
        strengthIndicator.style.justifyContent = 'space-between';
        strengthIndicator.style.margin = '5px 0';
        
        for (let i = 0; i < 4; i++) {
            const bar = document.createElement('div');
            bar.style.height = '4px';
            bar.style.width = '23%';
            bar.style.backgroundColor = '#ccc';
            bar.style.borderRadius = '2px';
            strengthIndicator.appendChild(bar);
        }
        
        // Insert after first password field
        const password1Group = document.querySelector('.password1');
        password1Group.parentNode.insertBefore(strengthIndicator, password1Group.nextSibling);
        
        // Update strength indicator based on password
        password1Input.addEventListener('input', function() {
            const password = password1Input.value;
            const bars = strengthIndicator.querySelectorAll('div');
            
            // Reset bars
            bars.forEach(bar => {
                bar.style.backgroundColor = '#ccc';
            });
            
            // Calculate strength
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[!@#$%^&*]/.test(password)) strength++;
            
            // Update bar colors
            for (let i = 0; i < strength; i++) {
                if (strength === 1) bars[i].style.backgroundColor = '#FF6B6B';
                if (strength === 2) bars[i].style.backgroundColor = '#FFD700';
                if (strength === 3) bars[i].style.backgroundColor = '#9DE0C0';
                if (strength === 4) bars[i].style.backgroundColor = '#84c7a8';
            }
        });
    }
    
    // Initialize password toggle and strength indicator
    addPasswordToggle();
    addPasswordStrengthIndicator();
});