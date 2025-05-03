document.addEventListener('DOMContentLoaded', function() {
    // Get references to form and job listings
    const searchForm = document.getElementById('search-form');
    const jobListings = document.querySelectorAll('.job-card');
    const noResultsMessage = document.getElementById('no-results');
    const jobCountBadge = document.getElementById('job-count');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    // Initialize job count
    updateJobCount();
    
    // Add event listener to form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting
        filterJobs();
    });
    
    // Add event listener to clear filters button
    clearFiltersBtn.addEventListener('click', function() {
        document.getElementById('role-input').value = '';
        document.getElementById('location-input').value = '';
        document.getElementById('job-type-select').value = '';
        
        // Show all job listings
        jobListings.forEach(job => {
            job.style.display = 'block';
        });
        
        // Update count and hide no results message
        updateJobCount();
        noResultsMessage.style.display = 'none';
    });
    
    // Add event listeners to job buttons
    document.querySelectorAll('.job-card button').forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.closest('.job-card').querySelector('h3').textContent.trim().split(' ')[0];
            alert(`Application for ${jobTitle} position submitted successfully!`);
        });
    });
    
    // Add hover animations to job cards
    jobListings.forEach(job => {
        job.addEventListener('mouseenter', function() {
            this.querySelector('button').classList.add('pulse');
        });
        
        job.addEventListener('mouseleave', function() {
            this.querySelector('button').classList.remove('pulse');
        });
    });
    
    // Function to filter jobs
    function filterJobs() {
        const roleInput = document.getElementById('role-input').value.toLowerCase();
        const locationInput = document.getElementById('location-input').value.toLowerCase();
        const jobTypeSelect = document.getElementById('job-type-select').value;
        
        let visibleCount = 0;
        
        // Filter job listings
        jobListings.forEach(job => {
            const jobTitle = job.querySelector('h3').textContent.toLowerCase();
            const jobLocation = job.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
            const jobBadge = job.querySelector('.job-badge');
            const jobType = jobBadge ? jobBadge.textContent : '';
            
            // Check if job matches all filter criteria
            const matchesRole = roleInput === '' || jobTitle.includes(roleInput);
            const matchesLocation = locationInput === '' || jobLocation.includes(locationInput);
            const matchesType = jobTypeSelect === '' || jobType.includes(jobTypeSelect);
            
            // Show or hide the job based on filter matches
            if (matchesRole && matchesLocation && matchesType) {
                job.style.display = 'block';
                visibleCount++;
                
                // Add animation to filtered results
                job.classList.add('filtered-in');
                setTimeout(() => {
                    job.classList.remove('filtered-in');
                }, 500);
            } else {
                job.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
        
        // Update job count badge
        jobCountBadge.textContent = visibleCount;
    }
    
    // Function to update job count
    function updateJobCount() {
        let visibleCount = 0;
        jobListings.forEach(job => {
            if (job.style.display !== 'none') {
                visibleCount++;
            }
        });
        jobCountBadge.textContent = visibleCount;
    }
    
    // Add a CSS class for animations
    const style = document.createElement('style');
    style.textContent = `
        .filtered-in {
            animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
            from { opacity: 0.5; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .pulse {
            animation: pulse 1s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}); 