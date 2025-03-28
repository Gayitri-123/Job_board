document.addEventListener('DOMContentLoaded', function() {
  // Sample job data
  const jobs = [
      {
          id: 1,
          title: "Frontend Developer",
          company: "TechCorp",
          logo: "https://via.placeholder.com/50x50",
          location: "San Francisco, CA",
          type: "full-time",
          experience: "mid",
          salary: "$90,000 - $120,000",
          description: "We're looking for a skilled Frontend Developer to join our team. You'll be responsible for building user interfaces and implementing design systems.",
          posted: "2 days ago"
      },
      {
          id: 2,
          title: "UX Designer",
          company: "DesignHub",
          logo: "https://via.placeholder.com/50x50",
          location: "Remote",
          type: "remote",
          experience: "mid",
          salary: "$80,000 - $110,000",
          description: "Join our design team to create beautiful and intuitive user experiences for our products.",
          posted: "1 week ago"
      },
      {
          id: 3,
          title: "Backend Engineer",
          company: "DataSystems",
          logo: "https://via.placeholder.com/50x50",
          location: "New York, NY",
          type: "full-time",
          experience: "senior",
          salary: "$110,000 - $150,000",
          description: "Looking for an experienced Backend Engineer to develop and maintain our server infrastructure.",
          posted: "3 days ago"
      },
      {
          id: 4,
          title: "Marketing Specialist",
          company: "GrowthMasters",
          logo: "https://via.placeholder.com/50x50",
          location: "Chicago, IL",
          type: "part-time",
          experience: "entry",
          salary: "$25 - $35 per hour",
          description: "Help us grow our brand and reach new customers through creative marketing campaigns.",
          posted: "5 days ago"
      },
      {
          id: 5,
          title: "DevOps Engineer",
          company: "CloudTech",
          logo: "https://via.placeholder.com/50x50",
          location: "Austin, TX",
          type: "full-time",
          experience: "senior",
          salary: "$100,000 - $140,000",
          description: "Join our infrastructure team to build and maintain our cloud deployment systems.",
          posted: "1 day ago"
      },
      {
          id: 6,
          title: "Product Manager",
          company: "InnovateCo",
          logo: "https://via.placeholder.com/50x50",
          location: "Boston, MA",
          type: "full-time",
          experience: "mid",
          salary: "$95,000 - $125,000",
          description: "Lead product development from conception to launch, working with cross-functional teams.",
          posted: "2 weeks ago"
      }
  ];

  // DOM elements
  const jobListingsContainer = document.getElementById('job-listings');
  const jobTypeFilter = document.getElementById('job-type-filter');
  const experienceFilter = document.getElementById('experience-filter');
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-box input');

  // Display all jobs initially
  displayJobs(jobs);

  // Filter jobs based on selections
  jobTypeFilter.addEventListener('change', filterJobs);
  experienceFilter.addEventListener('change', filterJobs);

  // Search functionality
  searchBtn.addEventListener('click', function() {
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm) {
          const filteredJobs = jobs.filter(job => 
              job.title.toLowerCase().includes(searchTerm) || 
              job.company.toLowerCase().includes(searchTerm) ||
              job.description.toLowerCase().includes(searchTerm)
          );
          displayJobs(filteredJobs);
      } else {
          displayJobs(jobs);
      }
  });

  // Filter jobs function
  function filterJobs() {
      const typeValue = jobTypeFilter.value;
      const experienceValue = experienceFilter.value;
      
      let filteredJobs = jobs;
      
      if (typeValue !== 'all') {
          filteredJobs = filteredJobs.filter(job => job.type === typeValue);
      }
      
      if (experienceValue !== 'all') {
          filteredJobs = filteredJobs.filter(job => job.experience === experienceValue);
      }
      
      displayJobs(filteredJobs);
  }

  // Display jobs function
  function displayJobs(jobsToDisplay) {
      jobListingsContainer.innerHTML = '';
      
      if (jobsToDisplay.length === 0) {
          jobListingsContainer.innerHTML = '<p class="no-jobs">No jobs found matching your criteria.</p>';
          return;
      }
      
      jobsToDisplay.forEach(job => {
          const jobCard = document.createElement('div');
          jobCard.className = 'job-card';
          
          let typeClass = '';
          switch(job.type) {
              case 'full-time':
                  typeClass = 'full-time';
                  break;
              case 'part-time':
                  typeClass = 'part-time';
                  break;
              case 'contract':
                  typeClass = 'contract';
                  break;
              case 'remote':
                  typeClass = 'remote';
                  break;
          }
          
          jobCard.innerHTML = `
              <div class="job-header">
                  <img src="${job.logo}" alt="${job.company}">
                  <div class="job-title">
                      <h3>${job.title}</h3>
                      <p>${job.company} • ${job.location}</p>
                  </div>
              </div>
              <div class="job-details">
                  <p>${job.description}</p>
                  <span class="job-type ${typeClass}">${formatJobType(job.type)}</span>
                  <span class="job-experience">${formatExperience(job.experience)}</span>
              </div>
              <div class="job-footer">
                  <span class="job-salary">${job.salary}</span>
                  <span class="job-posted">${job.posted}</span>
              </div>
          `;
          
          jobListingsContainer.appendChild(jobCard);
      });
  }

  // Format job type for display
  function formatJobType(type) {
      switch(type) {
          case 'full-time':
              return 'Full-time';
          case 'part-time':
              return 'Part-time';
          case 'contract':
              return 'Contract';
          case 'remote':
              return 'Remote';
          default:
              return type;
      }
  }

  // Format experience level for display
  function formatExperience(level) {
      switch(level) {
          case 'entry':
              return 'Entry Level';
          case 'mid':
              return 'Mid Level';
          case 'senior':
              return 'Senior Level';
          default:
              return level;
      }
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav ul');
  
  mobileMenuBtn.addEventListener('click', function() {
      nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (window.innerWidth <= 992) {
              nav.style.display = 'none';
          }
      });
  });

  // Testimonial slider functionality
  let currentTestimonial = 0;
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  function showTestimonial(index) {
      testimonialCards.forEach((card, i) => {
          card.style.display = i === index ? 'block' : 'none';
      });
  }
  
  // Auto-rotate testimonials
  setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(currentTestimonial);
  }, 5000);
  
  // Initialize
  showTestimonial(0);
});
