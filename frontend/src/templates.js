// export const jobTemplate = (job, currency) => `
// <div class="card">
//   <div class="card-body">
//   <h4 class="card-title">${job.title} up to ${currency}${job.salary_max}</h4>
//   <h5>${job.location.display_name}</h5>
//   <p class="card-text">${job.description}</p>
//   <a href="${job.redirect_url}">View Job</a>
//   </div>
// </div>


// <div class="job-cards">
//      <div class="job-card">
//       <div class="job-card-header">
//        <div class="menu-dot"></div>
//       </div>
//       <div class="job-card-title">${job.title}</div>
//       <div class="job-card-subtitle">
//       ${job.description}
//       </div>
//       <div class="job-detail-buttons">
//        <button class="search-buttons detail-button">Full Time</button>
//       </div>
//       <div class="job-card-buttons">
//        <button class="search-buttons card-buttons"> <a href="${job.redirect_url}">Apply now </a></button>
//       </div>
//      </div>

// `;

export const jobTemplate = (job, currency) => `


     <div class="job-card">
      <div class="job-card-header">
      </div>
      <div class="job-card-title">${job.title}</div>
      <div class="job-card-subtitle">
      ${job.description}
      </div>
      <div class="job-detail-buttons">
       <button class="search-buttons detail-button">up to ${currency}${job.salary_max}</button>
       <button class="search-buttons detail-button">${job.location.display_name}</button>
      </div>
      <div class="job-card-buttons">
       <button class="search-buttons card-buttons"> <a class ="href-buttons" href="${job.redirect_url}">Apply now </a></button>
      </div>
     </div>

`;