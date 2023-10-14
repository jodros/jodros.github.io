window.onload = function() {
	var body = document.body;
	var switcher = document.getElementsByClassName('light')[0];

	//Click on dark mode icon. Add dark mode classes and wrappers. Store user preference through sessions
	switcher.addEventListener("click", function() {
	    this.classList.toggle('light');
		//If dark mode is selected
		if (this.classList.contains('light')) {
			body.classList.remove('dark-mode');
			body.classList.add('light-mode');

			localStorage.removeItem('darkMode');
			localStorage.setItem('lightMode', 'true');			
		}
		else {

			if (body.classList.contains('light-mode')) {
				body.classList.remove('light-mode');
			}
			body.classList.add('dark-mode');
			//Save user preference in storage
			localStorage.removeItem("lightMode")
			localStorage.setItem('darkMode', 'true');
		}
	});

	//Check Storage. Keep user preference on page reload
	if (localStorage.getItem('darkMode')) {
		body.classList.add('dark-mode');
	}
	else if (localStorage.getItem('lightMode')) {
		body.classList.add('light-mode');
	}
}
