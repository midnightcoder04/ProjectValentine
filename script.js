// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const flickButton = document.getElementById('flick-button');
    const pen = document.getElementById('pen');
    const penGlow = document.getElementById('pen-glow');
    const penShadow = document.getElementById('pen-shadow');
    const verificationStatus = document.getElementById('verification-status');
    const flickCounter = document.getElementById('flick-counter');
    const buttonGroup = document.getElementById('button-group');
    const verdictLock = document.getElementById('verdict-lock');
    const grantedButton = document.getElementById('granted-button');
    const adjournButton = document.getElementById('adjourn-button');
    const deniedButton = document.getElementById('denied-button');
    const responseContainer = document.getElementById('response-container');
    const confettiCanvas = document.getElementById('confetti-canvas');

    let isUnlocked = false;
    let flickCount = 0;

    // Hide loading screen after page loads
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in sections
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Pen Flick Animation
    flickButton.addEventListener('click', function() {
        if (!isUnlocked) {
            flickCount++;
            
            // Add spinning animation
            pen.classList.add('spinning');
            penGlow.classList.add('active');
            penShadow.classList.add('shrink');
            flickButton.classList.add('clicked');
            
            // Update counter
            if (flickCount < 3) {
                flickCounter.textContent = 'Flicks: ' + flickCount + '/3';
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                pen.classList.remove('spinning');
                penGlow.classList.remove('active');
                penShadow.classList.remove('shrink');
                
                if (flickCount >= 3) {
                    // Show verification message
                    verificationStatus.textContent = 'VERIFICATION COMPLETE. AUTHORITY CONFIRMED.';
                    verificationStatus.classList.add('visible');
                    flickCounter.textContent = 'Mastery level: Expert';
                    
                    // Unlock buttons
                    isUnlocked = true;
                    verdictLock.classList.add('hidden');
                    buttonGroup.classList.remove('locked');
                    buttonGroup.classList.add('unlocked');
                    grantedButton.disabled = false;
                    adjournButton.disabled = false;
                    deniedButton.disabled = false;
                    
                    // Scroll to CTA section smoothly
                    setTimeout(() => {
                        document.getElementById('call-to-action').scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 500);
                }
            }, 800);
        }
    });

    // Motion Granted Button
    grantedButton.addEventListener('click', function() {
        if (isUnlocked) {
            // Play gavel sound
            playGavelSound();
            
            // Show confetti
            launchConfetti();
            
            // Show scheduling form
            showSchedulingForm();
        }
    });
    
    // Function to show scheduling form
    function showSchedulingForm() {
        responseContainer.innerHTML = '';
        
        var iconSpan = document.createElement('span');
        iconSpan.className = 'response-icon';
        iconSpan.textContent = '\u2713';
        iconSpan.style.color = '#2d5a27';
        iconSpan.style.fontSize = '2rem';
        iconSpan.style.display = 'block';
        iconSpan.style.marginBottom = '10px';
        responseContainer.appendChild(iconSpan);
        
        var titleElement = document.createElement('h3');
        titleElement.textContent = 'MOTION GRANTED';
        responseContainer.appendChild(titleElement);
        
        var messageElement = document.createElement('p');
        messageElement.textContent = 'The Court hereby GRANTS the motion. Please specify the terms of execution at your convenience.';
        responseContainer.appendChild(messageElement);
        
        // Create scheduling form
        var formContainer = document.createElement('div');
        formContainer.className = 'scheduling-form';
        
        // Date input
        var dateGroup = document.createElement('div');
        dateGroup.className = 'form-group';
        var dateLabel = document.createElement('label');
        dateLabel.textContent = 'Preferred Date';
        dateLabel.setAttribute('for', 'date-input');
        var dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'date-input';
        dateInput.className = 'form-input';
        // Set minimum date to today
        var today = new Date();
        dateInput.min = today.toISOString().split('T')[0];
        // Default to next Saturday
        var nextSat = new Date();
        var daysUntilSat = (6 - nextSat.getDay() + 7) % 7 || 7;
        nextSat.setDate(nextSat.getDate() + daysUntilSat);
        dateInput.value = nextSat.toISOString().split('T')[0];
        dateGroup.appendChild(dateLabel);
        dateGroup.appendChild(dateInput);
        formContainer.appendChild(dateGroup);
        
        // Time input
        var timeGroup = document.createElement('div');
        timeGroup.className = 'form-group';
        var timeLabel = document.createElement('label');
        timeLabel.textContent = 'Preferred Time';
        timeLabel.setAttribute('for', 'time-input');
        var timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.id = 'time-input';
        timeInput.className = 'form-input';
        timeInput.value = '19:00';
        timeGroup.appendChild(timeLabel);
        timeGroup.appendChild(timeInput);
        formContainer.appendChild(timeGroup);
        
        // Location input
        var locationGroup = document.createElement('div');
        locationGroup.className = 'form-group';
        var locationLabel = document.createElement('label');
        locationLabel.textContent = 'Pickup Location';
        locationLabel.setAttribute('for', 'location-input');
        var locationInput = document.createElement('input');
        locationInput.type = 'text';
        locationInput.id = 'location-input';
        locationInput.className = 'form-input';
        locationInput.placeholder = 'Enter your preferred pickup address...';
        locationGroup.appendChild(locationLabel);
        locationGroup.appendChild(locationInput);
        formContainer.appendChild(locationGroup);
        
        // Phone number input
        var phoneGroup = document.createElement('div');
        phoneGroup.className = 'form-group';
        var phoneLabel = document.createElement('label');
        phoneLabel.textContent = 'Contact Number';
        phoneLabel.setAttribute('for', 'phone-input');
        var phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.id = 'phone-input';
        phoneInput.className = 'form-input';
        phoneInput.placeholder = 'Enter your phone number...';
        phoneGroup.appendChild(phoneLabel);
        phoneGroup.appendChild(phoneInput);
        formContainer.appendChild(phoneGroup);
        
        // Food choice section
        var foodGroup = document.createElement('div');
        foodGroup.className = 'form-group';
        var foodLabel = document.createElement('label');
        foodLabel.textContent = 'Choice of Food';
        foodLabel.setAttribute('for', 'food-choice');
        
        var foodOptions = [
            { value: '', label: 'Select your preference...' },
            { value: 'Rajma Rice', label: 'Rajma Rice' },
            { value: 'Chole Rice', label: 'Chole Rice' },
            { value: 'White sauce pasta', label: 'White sauce pasta' },
            { value: 'Handmade pizza', label: 'Handmade pizza' },
            { value: 'Anything', label: 'Anything' },
            { value: 'custom', label: 'Other (type below)' }
        ];
        
        var foodSelect = document.createElement('select');
        foodSelect.id = 'food-choice';
        foodSelect.className = 'form-input';
        foodOptions.forEach(function(opt) {
            var option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            foodSelect.appendChild(option);
        });
        
        var customFoodGroup = document.createElement('div');
        customFoodGroup.className = 'form-group custom-food-group';
        customFoodGroup.style.display = 'none';
        var customFoodLabel = document.createElement('label');
        customFoodLabel.textContent = 'Your Food Preference';
        customFoodLabel.setAttribute('for', 'custom-food-input');
        var customFoodInput = document.createElement('input');
        customFoodInput.type = 'text';
        customFoodInput.id = 'custom-food-input';
        customFoodInput.className = 'form-input';
        customFoodInput.placeholder = 'Type your food preference...';
        customFoodGroup.appendChild(customFoodLabel);
        customFoodGroup.appendChild(customFoodInput);
        
        foodSelect.addEventListener('change', function() {
            if (foodSelect.value === 'custom') {
                customFoodGroup.style.display = 'block';
            } else {
                customFoodGroup.style.display = 'none';
                customFoodInput.value = '';
            }
        });
        
        foodGroup.appendChild(foodLabel);
        foodGroup.appendChild(foodSelect);
        formContainer.appendChild(foodGroup);
        formContainer.appendChild(customFoodGroup);
        
        // Special requests textarea
        var notesGroup = document.createElement('div');
        notesGroup.className = 'form-group';
        var notesLabel = document.createElement('label');
        notesLabel.textContent = 'Special Instructions (Optional)';
        notesLabel.setAttribute('for', 'notes-input');
        var notesInput = document.createElement('textarea');
        notesInput.id = 'notes-input';
        notesInput.className = 'form-input';
        notesInput.placeholder = 'Any dietary restrictions, preferences, or special requests...';
        notesInput.rows = 3;
        notesGroup.appendChild(notesLabel);
        notesGroup.appendChild(notesInput);
        formContainer.appendChild(notesGroup);
        
        responseContainer.appendChild(formContainer);
        
        // Submit button
        var submitButton = document.createElement('button');
        submitButton.textContent = 'CONFIRM AND GENERATE CALENDAR INVITE';
        submitButton.className = 'submit-scheduling';
        submitButton.addEventListener('click', async function() {
            var selectedDate = dateInput.value;
            var selectedTime = timeInput.value;
            var selectedLocation = locationInput.value.trim();
            var selectedPhone = phoneInput.value.trim();
            var selectedFood = foodSelect.value === 'custom' ? customFoodInput.value.trim() : foodSelect.value;
            
            if (!selectedDate) {
                dateInput.style.borderColor = '#8b0000';
                return;
            }
            if (!selectedTime) {
                timeInput.style.borderColor = '#8b0000';
                return;
            }
            if (!selectedLocation) {
                locationInput.style.borderColor = '#8b0000';
                locationInput.placeholder = 'Please enter a pickup location';
                return;
            }
            if (!selectedPhone) {
                phoneInput.style.borderColor = '#8b0000';
                phoneInput.placeholder = 'Please enter your phone number';
                return;
            }
            if (!selectedFood) {
                foodSelect.style.borderColor = '#8b0000';
                if (foodSelect.value === 'custom') {
                    customFoodInput.style.borderColor = '#8b0000';
                    customFoodInput.placeholder = 'Please enter your food preference';
                }
                return;
            }
            
            // Disable button while submitting
            var originalText = submitButton.textContent;
            submitButton.textContent = 'SUBMITTING...';
            submitButton.disabled = true;
            
            // Submit to Web3Forms
            try {
                var formData = new FormData();
                formData.append('access_key', '79002d36-34cf-4917-b026-b0ddf471e2ec');
                formData.append('subject', 'MOTION GRANTED - Date Acceptance');
                formData.append('form_type', 'Motion Granted');
                formData.append('date', formatDisplayDate(selectedDate));
                formData.append('time', formatDisplayTime(selectedTime));
                formData.append('pickup_location', selectedLocation);
                formData.append('contact_number', selectedPhone);
                formData.append('food_choice', selectedFood);
                formData.append('special_instructions', notesInput.value.trim() || 'None');
                
                var response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                var data = await response.json();
                
                if (response.ok) {
                    // Generate calendar with custom details
                    generateCustomCalendarInvite(selectedDate, selectedTime, selectedLocation, notesInput.value.trim(), selectedFood);
                    
                    // Show confirmation
                    formContainer.innerHTML = '<div class="confirmation-message">' +
                        '<p><strong>Date:</strong> ' + formatDisplayDate(selectedDate) + '</p>' +
                        '<p><strong>Time:</strong> ' + formatDisplayTime(selectedTime) + '</p>' +
                        '<p><strong>Pickup:</strong> ' + selectedLocation + '</p>' +
                        '<p><strong>Contact:</strong> ' + selectedPhone + '</p>' +
                        '<p><strong>Food Choice:</strong> ' + selectedFood + '</p>' +
                        (notesInput.value.trim() ? '<p><strong>Notes:</strong> ' + notesInput.value.trim() + '</p>' : '') +
                        '</div>';
                    
                    submitButton.textContent = 'TERMS CONFIRMED - CALENDAR DOWNLOADED';
                    submitButton.style.background = '#2d5a27';
                    submitButton.style.borderColor = '#2d5a27';
                } else {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    alert('Error submitting: ' + data.message);
                }
            } catch (error) {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                alert('Something went wrong. Please try again.');
            }
        });
        
        responseContainer.appendChild(submitButton);
        responseContainer.classList.add('visible');
        
        setTimeout(function() {
            responseContainer.scrollIntoView({ 
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }
    
    // Format date for display
    function formatDisplayDate(dateStr) {
        var date = new Date(dateStr + 'T12:00:00');
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Format time for display
    function formatDisplayTime(timeStr) {
        var parts = timeStr.split(':');
        var hours = parseInt(parts[0]);
        var minutes = parts[1];
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return hours + ':' + minutes + ' ' + ampm;
    }
    
    // Generate calendar with custom details
    function generateCustomCalendarInvite(dateStr, timeStr, location, notes, foodChoice) {
        var now = new Date();
        var dateStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        var startDate = new Date(dateStr + 'T' + timeStr + ':00');
        var endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 3);
        
        function formatICSDate(date) {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        }
        
        var description = 'CASE NO. 2024-DATE: MOTION GRANTED\\n\\nPickup Location: ' + location;
        if (foodChoice) {
            description += '\\n\\nFood Choice: ' + foodChoice;
        }
        if (notes) {
            description += '\\n\\nSpecial Instructions: ' + notes;
        }
        
        var icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Date Night//Motion Granted//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:REQUEST',
            'BEGIN:VEVENT',
            'DTSTART:' + formatICSDate(startDate),
            'DTEND:' + formatICSDate(endDate),
            'DTSTAMP:' + dateStamp,
            'UID:' + dateStamp + '@datenight.motion',
            'SUMMARY:CASE NO. 2024-DATE: Date Night - Motion Granted',
            'DESCRIPTION:' + description,
            'LOCATION:' + location,
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'TRANSP:OPAQUE',
            'CLASS:CONFIDENTIAL',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
        
        var blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'date-night-motion-granted.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Adjourn Button
    adjournButton.addEventListener('click', function() {
        if (isUnlocked) {
            showResponse(
                'MOTION ADJOURNED',
                'The Court has decided to adjourn for consideration. Please submit any questions or concerns below.',
                false,
                true
            );
        }
    });

    // Denied Button
    deniedButton.addEventListener('click', function() {
        if (isUnlocked) {
            showResponse(
                'MOTION DENIED',
                'The Petitioner respects the ruling of the Court. Case dismissed without prejudice. The Petitioner reserves the right to file an amended motion at a future date.',
                false
            );
        }
    });

    // Function to show response
    function showResponse(title, message, showCalendar, showTextArea) {
        showCalendar = showCalendar || false;
        showTextArea = showTextArea || false;
        
        responseContainer.innerHTML = '';
        
        var iconSpan = document.createElement('span');
        iconSpan.className = 'response-icon';
        if (title.indexOf('GRANTED') !== -1) {
            iconSpan.textContent = '\u2713';
            iconSpan.style.color = '#2d5a27';
        } else if (title.indexOf('ADJOURNED') !== -1) {
            iconSpan.textContent = '\u23f8';
            iconSpan.style.color = '#C5B358';
        } else {
            iconSpan.textContent = '\u2717';
            iconSpan.style.color = '#8b0000';
        }
        iconSpan.style.fontSize = '2rem';
        iconSpan.style.display = 'block';
        iconSpan.style.marginBottom = '10px';
        responseContainer.appendChild(iconSpan);
        
        var titleElement = document.createElement('h3');
        titleElement.textContent = title;
        responseContainer.appendChild(titleElement);
        
        var messageElement = document.createElement('p');
        messageElement.textContent = message;
        responseContainer.appendChild(messageElement);
        
        if (showCalendar) {
            var calendarButton = document.createElement('button');
            calendarButton.textContent = 'DOWNLOAD CALENDAR INVITE';
            calendarButton.addEventListener('click', generateCalendarInvite);
            responseContainer.appendChild(calendarButton);
        }
        
        if (showTextArea) {
            // Optional phone number input
            var phoneGroup = document.createElement('div');
            phoneGroup.style.marginBottom = '15px';
            var phoneLabel = document.createElement('label');
            phoneLabel.textContent = 'Contact Number (Optional)';
            phoneLabel.style.display = 'block';
            phoneLabel.style.marginBottom = '8px';
            phoneLabel.style.fontFamily = "'Lato', sans-serif";
            phoneLabel.style.fontWeight = '600';
            phoneLabel.style.color = '#1a1a2e';
            var adjournPhoneInput = document.createElement('input');
            adjournPhoneInput.type = 'tel';
            adjournPhoneInput.placeholder = 'Enter phone number to be reached back...';
            adjournPhoneInput.style.width = '100%';
            adjournPhoneInput.style.padding = '14px 16px';
            adjournPhoneInput.style.fontFamily = "'Lato', sans-serif";
            adjournPhoneInput.style.fontSize = '1rem';
            adjournPhoneInput.style.border = '2px solid #000080';
            adjournPhoneInput.style.background = '#faf9f6';
            adjournPhoneInput.style.boxSizing = 'border-box';
            phoneGroup.appendChild(phoneLabel);
            phoneGroup.appendChild(adjournPhoneInput);
            responseContainer.appendChild(phoneGroup);
            
            var textArea = document.createElement('textarea');
            textArea.placeholder = 'Your questions or deliberations...';
            responseContainer.appendChild(textArea);
            
            var submitButton = document.createElement('button');
            submitButton.textContent = 'SUBMIT DELIBERATION';
            submitButton.addEventListener('click', async function() {
                var deliberation = textArea.value.trim();
                var contactPhone = adjournPhoneInput.value.trim();
                if (deliberation) {
                    var originalText = submitButton.textContent;
                    submitButton.textContent = 'SUBMITTING...';
                    submitButton.disabled = true;
                    
                    // Submit to Web3Forms
                    try {
                        var formData = new FormData();
                        formData.append('access_key', '79002d36-34cf-4917-b026-b0ddf471e2ec');
                        formData.append('subject', 'MOTION ADJOURNED - Questions/Considerations');
                        formData.append('form_type', 'Adjourned for Consideration');
                        formData.append('deliberation', deliberation);
                        if (contactPhone) {
                            formData.append('contact_number', contactPhone);
                        }
                        
                        var response = await fetch('https://api.web3forms.com/submit', {
                            method: 'POST',
                            body: formData
                        });
                        
                        var data = await response.json();
                        
                        if (response.ok) {
                            textArea.value = '';
                            textArea.placeholder = 'Deliberation noted. The Petitioner will respond in due course.';
                            textArea.disabled = true;
                            adjournPhoneInput.disabled = true;
                            submitButton.textContent = 'DELIBERATION SUBMITTED';
                        } else {
                            submitButton.textContent = originalText;
                            submitButton.disabled = false;
                            alert('Error submitting: ' + data.message);
                        }
                    } catch (error) {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        alert('Something went wrong. Please try again.');
                    }
                } else {
                    textArea.placeholder = 'Please enter your deliberation before submitting.';
                }
            });
            responseContainer.appendChild(submitButton);
        }
        
        responseContainer.classList.add('visible');
        
        // Scroll to response
        setTimeout(function() {
            responseContainer.scrollIntoView({ 
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }

    // Function to play gavel sound effect
    function playGavelSound() {
        try {
            var audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create three quick knocks with reverb
            for (var i = 0; i < 3; i++) {
                (function(index) {
                    setTimeout(function() {
                        var oscillator = audioContext.createOscillator();
                        var gainNode = audioContext.createGain();
                        var oscillator2 = audioContext.createOscillator();
                        var gainNode2 = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        oscillator2.connect(gainNode2);
                        gainNode2.connect(audioContext.destination);
                        
                        oscillator.frequency.value = 100;
                        oscillator.type = 'sine';
                        oscillator2.frequency.value = 200;
                        oscillator2.type = 'sine';
                        
                        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                        gainNode2.gain.setValueAtTime(0.15, audioContext.currentTime);
                        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                        
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 0.15);
                        oscillator2.start(audioContext.currentTime);
                        oscillator2.stop(audioContext.currentTime + 0.1);
                    }, index * 200);
                })(i);
            }
        } catch (error) {
            console.log('Audio not supported or blocked');
        }
    }

    // Confetti animation
    function launchConfetti() {
        var ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        var confettiPieces = [];
        var colors = ['#000080', '#C5B358', '#D4C36A', '#FBFBF8', '#0000a0'];
        
        // Create confetti pieces
        for (var i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * Math.PI * 2,
                spin: Math.random() * 0.2 - 0.1,
                opacity: 1
            });
        }
        
        var animationFrame;
        
        function animate() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            var activeConfetti = false;
            
            confettiPieces.forEach(function(piece) {
                if (piece.opacity <= 0) return;
                
                activeConfetti = true;
                piece.y += piece.speed;
                piece.x += Math.sin(piece.angle) * 2;
                piece.angle += piece.spin;
                
                if (piece.y > confettiCanvas.height - 100) {
                    piece.opacity -= 0.02;
                }
                
                ctx.save();
                ctx.globalAlpha = piece.opacity;
                ctx.fillStyle = piece.color;
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.angle);
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size / 2);
                ctx.restore();
            });
            
            if (activeConfetti) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(animationFrame);
                ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            }
        }
        
        animate();
    }

    // Function to generate calendar invite
    function generateCalendarInvite() {
        var now = new Date();
        var dateStr = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        var nextSaturday = new Date();
        var daysUntilSaturday = (6 - nextSaturday.getDay() + 7) % 7 || 7;
        nextSaturday.setDate(nextSaturday.getDate() + daysUntilSaturday);
        nextSaturday.setHours(19, 0, 0, 0);
        
        var endTime = new Date(nextSaturday);
        endTime.setHours(22, 0, 0, 0);
        
        function formatDate(date) {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        }
        
        var icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Date Night//Motion Granted//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:REQUEST',
            'BEGIN:VEVENT',
            'DTSTART:' + formatDate(nextSaturday),
            'DTEND:' + formatDate(endTime),
            'DTSTAMP:' + dateStr,
            'UID:' + dateStr + '@datenight.motion',
            'SUMMARY:CASE NO. 2024-DATE: MOTION GRANTED - Saturday Night',
            'DESCRIPTION:Pursuant to the Courts ruling the date shall proceed as proposed.',
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'TRANSP:OPAQUE',
            'CLASS:CONFIDENTIAL',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
        
        var blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'date-night-motion-granted.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle window resize for confetti canvas
    window.addEventListener('resize', function() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
});
