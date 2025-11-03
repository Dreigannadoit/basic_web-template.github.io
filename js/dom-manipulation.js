// DOM Manipulation Requirements Implementation

// Requirement A: Content Switcher
document.addEventListener('DOMContentLoaded', function() {
    // Get elements for content switcher
    const toggleButton = document.getElementById('toggle-content');
    const problemBlock = document.getElementById('problem-statement');
    const solutionBlock = document.getElementById('solution-description');
    
    // Requirement A: Toggle between problem and solution
    if (toggleButton && problemBlock && solutionBlock) {
        toggleButton.addEventListener('click', function() {
            // Toggle active class using classList
            problemBlock.classList.toggle('active');
            solutionBlock.classList.toggle('active');
            
            // Update button text based on which content is visible
            if (problemBlock.classList.contains('active')) {
                toggleButton.textContent = 'View Solution';
            } else {
                toggleButton.textContent = 'View Problem';
            }
            
            console.log('Content toggled - Problem active:', problemBlock.classList.contains('active'));
        });
    }
    
    // Requirement B: Tabbed Interface
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Requirement B: Switch tabs functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const targetTab = document.getElementById(`${tabId}-tab`);
            if (targetTab) {
                targetTab.classList.add('active');
                console.log(`Switched to tab: ${tabId}`);
            }
        });
    });
    
    // Log initial state
    console.log('DOM Manipulation features loaded successfully');
    console.log('Requirement A: Content switcher initialized');
    console.log('Requirement B: Tabbed interface initialized');
});