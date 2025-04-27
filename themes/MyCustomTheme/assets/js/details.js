document.addEventListener('DOMContentLoaded', function() {
    // Find all details headers
    const detailsHeaders = document.querySelectorAll('.details-header');
    
    // Add click event to each header
    detailsHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle the open class on the parent container
            const container = this.closest('.details-container');
            container.classList.toggle('open');
            
            // Update the icon
            const icon = this.querySelector('.details-icon');
            if (container.classList.contains('open')) {
                icon.textContent = '▼';
            } else {
                icon.textContent = '▶';
            }
        });
    });
});
