document.addEventListener('DOMContentLoaded', function() {
    // Get all feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Add click event listeners to each card
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove purple class and active class from all cards
            featureCards.forEach(c => {
                c.classList.remove('active', 'purple');
            });
            
            // Add purple class and active class to clicked card
            this.classList.add('active', 'purple');
            
            // Hide all flow sections
            document.querySelectorAll('.flow-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show corresponding flow section
            const flowId = this.getAttribute('data-flow');
            document.getElementById(flowId).classList.add('active');
        });
    });
}); 