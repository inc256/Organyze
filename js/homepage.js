document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update UI with user data
    document.getElementById('user-initial').textContent = userData.name.charAt(0).toUpperCase();
    document.getElementById('credit-count').textContent = userData.credits;
    
    // Elements
    const tabs = document.querySelectorAll('.tab');
    const generateBtn = document.getElementById('generate-btn');
    const contextInput = document.getElementById('context');
    const toneSelect = document.getElementById('tone');
    const lengthSelect = document.getElementById('length');
    const durationInput = document.getElementById('duration');
    const stanzasInput = document.getElementById('stanzas');
    const outputContent = document.querySelector('.ai-response');
    const copyBtn = document.getElementById('copy-btn');
    const fileUpload = document.getElementById('file-upload');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const creditCount = document.getElementById('credit-count');
    const userProfile = document.getElementById('user-profile');
    
    // Tab-specific elements
    const toneGroup = document.getElementById('tone-group');
    const typeGroup = document.getElementById('type-group');
    const lengthGroup = document.getElementById('length-group');
    const durationGroup = document.getElementById('duration-group');
    const stanzasGroup = document.getElementById('stanzas-group');
    const uploadGroup = document.getElementById('upload-group');
    
    // Current tab state
    let currentTab = 'email';
    let uploadedFile = null;
    
    // Tab configurations
    const tabConfigs = {
        email: {
            toneLabel: 'Tone',
            toneOptions: ['Personal', 'Professional', 'Marketing'],
            showLength: true,
            showType: false,
            showDuration: false,
            showStanzas: false,
            showUpload: false
        },
        letter: {
            toneLabel: 'Formality',
            toneOptions: ['Formal', 'Informal'],
            showLength: true,
            showType: true,
            typeLabel: 'Letter Type',
            typeOptions: {
                Formal: ['Recommendation', 'Business', 'Job Application', 'Complaint', 'Resignation'],
                Informal: ['Personal', 'Thank You', 'Holiday', 'Birthday']
            },
            showDuration: false,
            showStanzas: false,
            showUpload: false
        },
        report: {
            toneLabel: 'Report Type',
            toneOptions: ['Financial', 'Marketing', 'Progress', 'Research'],
            showLength: true,
            showType: false,
            showDuration: false,
            showStanzas: false,
            showUpload: false
        },
        script: {
            toneLabel: 'Script Type',
            toneOptions: ['YouTube Video', 'TikTok', 'Podcast', 'Stage Play', 'Movie Script', 'Incident'],
            showLength: false,
            showType: false,
            showDuration: true,
            showStanzas: false,
            showUpload: false
        },
        cv: {
            toneLabel: 'CV Type',
            toneOptions: ['Combination', 'Functional', 'Chronological'],
            showLength: true,
            showType: false,
            showDuration: false,
            showStanzas: false,
            showUpload: false
        },
        song: {
            toneLabel: 'Song Genre',
            toneOptions: ['Pop', 'Rock', 'Hip Hop', 'Country', 'Jazz', 'R&B', 'Electronic'],
            showLength: false,
            showType: false,
            showDuration: true,
            showStanzas: true,
            showUpload: false
        },
        research: {
            toneLabel: 'Research Type',
            toneOptions: ['Basic', 'Applied', 'Explanatory', 'Descriptive', 'Correlational'],
            showLength: true,
            showType: false,
            showDuration: false,
            showStanzas: false,
            showUpload: false
        },
        summarize: {
            toneLabel: 'Summary Type',
            toneOptions: ['Brief', 'Detailed', 'Bullet Points', 'Executive Summary'],
            showLength: false,
            showType: false,
            showDuration: false,
            showStanzas: false,
            showUpload: true
        },
        qa: {
            toneLabel: 'Answer Type',
            toneOptions: ['Straight Answer', 'Essay', 'Convergent', 'Divergent'],
            showLength: false,
            showType: false,
            showDuration: false,
            showStanzas: false,
            showUpload: true
        }
    };
    
    // Initialize the UI based on the default tab (email)
    updateUIForTab(currentTab);
    
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.getAttribute('data-tab');
            updateUIForTab(currentTab);
        });
    });
    
    // Update UI based on selected tab
    function updateUIForTab(tab) {
        const config = tabConfigs[tab];
        
        // Update tone label and options
        toneGroup.querySelector('label').innerHTML = `<i class="fas fa-palette"></i> ${config.toneLabel}`;
        toneSelect.innerHTML = '';
        config.toneOptions.forEach(option => {
            const optElement = document.createElement('option');
            optElement.textContent = option;
            optElement.value = option;
            toneSelect.appendChild(optElement);
        });
        
        // Show/hide length field
        config.showLength ? lengthGroup.classList.remove('hidden') : lengthGroup.classList.add('hidden');
        
        // Show/hide duration field
        config.showDuration ? durationGroup.classList.remove('hidden') : durationGroup.classList.add('hidden');
        
        // Show/hide stanzas field
        config.showStanzas ? stanzasGroup.classList.remove('hidden') : stanzasGroup.classList.add('hidden');
        
        // Show/hide upload field
        config.showUpload ? uploadGroup.classList.remove('hidden') : uploadGroup.classList.add('hidden');
        
        // Handle type field for specific tabs
        if (config.showType) {
            typeGroup.classList.remove('hidden');
            typeGroup.innerHTML = `
                <label for="type"><i class="fas fa-list"></i> ${config.typeLabel}</label>
                <select id="type">
                    ${config.typeOptions[toneSelect.value].map(opt => `<option>${opt}</option>`).join('')}
                </select>
            `;
            
            // Update type options when tone changes
            toneSelect.addEventListener('change', () => {
                const typeSelect = document.getElementById('type');
                typeSelect.innerHTML = '';
                config.typeOptions[toneSelect.value].forEach(option => {
                    const optElement = document.createElement('option');
                    optElement.textContent = option;
                    optElement.value = option;
                    typeSelect.appendChild(optElement);
                });
            });
        } else {
            typeGroup.classList.add('hidden');
        }
    }
    
    // Example cards
    const exampleCards = document.querySelectorAll('.example-card');
    exampleCards.forEach(card => {
        card.addEventListener('click', () => {
            contextInput.value = card.querySelector('p').textContent;
        });
    });
    
    // File upload handling
    fileUpload.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            uploadedFile = e.target.files[0];
            fileInfo.innerHTML = `
                <div class="uploaded-file">
                    <div class="uploaded-file-info">
                        <i class="fas fa-file"></i>
                        <div>
                            <div>${uploadedFile.name}</div>
                            <div style="font-size: 0.8rem; color: var(--text-secondary);">${(uploadedFile.size / 1024).toFixed(1)} KB</div>
                        </div>
                    </div>
                    <button class="btn-secondary" id="remove-file">Remove</button>
                </div>
            `;
            
            document.getElementById('remove-file').addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput.value = '';
                fileInfo.innerHTML = '';
                uploadedFile = null;
            });
        }
    });
    
    // Generate button
    generateBtn.addEventListener('click', async () => {
        const context = contextInput.value;
        const tone = toneSelect.value;
        const length = lengthSelect.value;
        
        if (!context) {
            showNotification('Please provide some context for generation', 'error');
            return;
        }
        
        // Check if user has enough credits
        if (userData.credits < 5) {
            showNotification("You don't have enough credits. Upgrade your plan to get more.", "error");
            return;
        }
        
        // Show loading state
        generateBtn.innerHTML = '<div class="loading"></div> Generating...';
        generateBtn.disabled = true;
        
        try {
            // Prepare prompt based on tab and inputs
            const prompt = preparePrompt(currentTab, context, tone, length);
            
            // Call the AI API
            const response = await callAIAPI(prompt);
            outputContent.textContent = response;
            
            // Deduct credits
            userData.credits -= 5;
            creditCount.textContent = userData.credits;
            localStorage.setItem('userData', JSON.stringify(userData));
            
            showNotification('Content generated successfully! 5 credits deducted.', 'success');
        } catch (error) {
            outputContent.textContent = `Error: ${error.message}`;
            showNotification('Failed to generate content', 'error');
        } finally {
            // Reset button
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate (5 credits)';
            generateBtn.disabled = false;
        }
    });
    
    // Prepare prompt based on tab and inputs
    function preparePrompt(tab, context, tone, length) {
        let prompt = '';
        
        switch(tab) {
            case 'email':
                prompt = `Write a ${tone.toLowerCase()} email about: ${context}. Make it ${length.toLowerCase()} in length.`;
                break;
            case 'letter':
                const type = document.getElementById('type') ? document.getElementById('type').value : 'Formal';
                prompt = `Write a ${tone.toLowerCase()} ${type.toLowerCase()} letter about: ${context}. Make it ${length.toLowerCase()} in length.`;
                break;
            case 'report':
                prompt = `Write a ${tone.toLowerCase()} report about: ${context}. Make it ${length.toLowerCase()} in length.`;
                break;
            case 'script':
                const duration = document.getElementById('duration').value;
                prompt = `Write a ${tone.toLowerCase()} script with duration of ${duration} minutes about: ${context}.`;
                break;
            case 'cv':
                prompt = `Create a ${tone.toLowerCase()} CV based on: ${context}. Make it ${length.toLowerCase()} in length.`;
                break;
            case 'song':
                const stanzas = document.getElementById('stanzas').value;
                const songDuration = document.getElementById('duration').value;
                prompt = `Write ${tone.toLowerCase()} song lyrics with ${stanzas} stanzas and ${songDuration} minutes duration about: ${context}.`;
                break;
            case 'research':
                prompt = `Write a ${tone.toLowerCase()} research paper about: ${context}. Make it ${length.toLowerCase()} in length.`;
                break;
            case 'summarize':
                if (uploadedFile) {
                    prompt = `Summarize the uploaded document about: ${context}. The document is titled "${uploadedFile.name}".`;
                } else {
                    prompt = `Summarize the following content: ${context}.`;
                }
                break;
            case 'qa':
                if (uploadedFile) {
                    prompt = `Answer the following question based on the uploaded document: ${context}. The document is titled "${uploadedFile.name}".`;
                } else {
                    prompt = `Answer the following question: ${context}.`;
                }
                break;
            default:
                prompt = `Generate content about: ${context}.`;
        }
        
        return prompt;
    }
    
    // Copy button functionality
    copyBtn.addEventListener('click', () => {
        const textToCopy = outputContent.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Content copied to clipboard!', 'success');
        });
    });
    
    // User profile click to redirect to account page
    userProfile.addEventListener('click', () => {
        window.location.href = 'account.html';
    });
});