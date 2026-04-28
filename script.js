const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const resumeButtons = [
    document.getElementById("downloadResumeNav"),
    document.getElementById("downloadResumeHero")
];
const contactForm = document.querySelector(".contact-form");
const revealElements = document.querySelectorAll(".section:not(.assistant-section), .project-card, .timeline-item, .education-card, .contact-form");

// Mobile menu toggle for smaller screens.
menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after selecting a navigation link.
navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

// Generate a resume PDF directly in the browser.
function downloadResume() {
    const jsPDF = window.jspdf?.jsPDF;

    if (!jsPDF) {
        alert("Resume PDF generator is not available right now. Please refresh the page and try again.");
        return;
    }

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let cursorY = 24;

    function ensurePageSpace(requiredHeight = 10) {
        if (cursorY + requiredHeight > pageHeight - margin) {
            doc.addPage();
            cursorY = margin;
        }
    }

    function addSectionTitle(title) {
        ensurePageSpace(12);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(34, 34, 34);
        doc.text(title, margin, cursorY);
        cursorY += 7;
    }

    function addParagraph(text, size = 10.5, color = [85, 85, 85]) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(size);
        doc.setTextColor(...color);

        const lines = doc.splitTextToSize(text, contentWidth);
        const lineHeight = size >= 11 ? 5 : 5.2;
        const blockHeight = lines.length * lineHeight;
        ensurePageSpace(blockHeight + 2);
        doc.text(lines, margin, cursorY);
        cursorY += blockHeight + 2;
    }

    function addBullet(text) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(85, 85, 85);

        const bulletIndent = margin + 4.5;
        const lines = doc.splitTextToSize(text, contentWidth - 6.5);
        const blockHeight = lines.length * 5.2;
        ensurePageSpace(blockHeight + 1);
        doc.text("-", margin, cursorY);
        doc.text(lines, bulletIndent, cursorY);
        cursorY += blockHeight + 1.5;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(24, 24, 24);
    doc.text("Klent Bastatas Mantalaba", margin, cursorY);
    cursorY += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(142, 95, 57);
    doc.text("Junior Software Engineer II | Web Developer", margin, cursorY);
    cursorY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(85, 85, 85);
    doc.text("Email: mantalabaklent@gmail.com", margin, cursorY);
    cursorY += 5.5;
    doc.text("Phone: +63 9690708166 / +63 9945361789", margin, cursorY);
    cursorY += 10;

    addSectionTitle("Career Objective");
    addParagraph(
        "Junior Software Engineer aiming to leverage strong skills in C#, HTML, CSS, and JavaScript to build responsive web interfaces and reliable back-end services. Created a web-based reporting tool that cut manual data-entry time by 30% and improved accuracy. Eager to join a collaborative team where clean code, user-centric design, and continuous improvement are valued."
    );

    addSectionTitle("Skills");
    addParagraph(
        "HTML, CSS, JavaScript, C#, MySQL, SQL Server, Template Editor (Tekla Structures Tools), Flutter (Basic)"
    );

    addSectionTitle("Work Experience");
    addParagraph("TritonTek, Inc. | Junior Software Engineer II | 2024-2026", 11, [34, 34, 34]);
    addBullet("Contributed to internal applications, automation workflows, Tekla-related utilities, and reporting tools that improved speed, usability, and operational accuracy.");
    addParagraph("NBI Satellite Office - Naga Cebu | Office Staff (OJT) | 2022", 11, [34, 34, 34]);
    addBullet("Supported daily office operations while gaining hands-on experience in coordination, communication, and workplace processes.");

    addSectionTitle("Projects");
    addParagraph("Order Tracking Website", 11, [34, 34, 34]);
    addBullet("Worked with the team for 3 months to help create a website for order tracking for Gillette Pepsi Companies.");
    addBullet("Technologies: C#, MudBlazor, HTML, CSS, SQL Server");

    addParagraph("OPEX Team Applications", 11, [34, 34, 34]);
    addBullet("Improved internal applications and built Tekla-related tools and macro utilities for easier user workflows.");
    addBullet("Created solutions that allowed users to generate LOT reports with one click instead of spending a full day on manual reports.");
    addBullet("Technologies: C#, DevExpress, Template Editor (Tekla Structures Tools), MySQL");

    addParagraph("OrkaSync", 11, [34, 34, 34]);
    addBullet("Built a tool/server that syncs Tekla model data, automatically counts pieces and tonnage, and notifies developers when sync succeeds or fails.");
    addBullet("Technologies: C#, DevExpress, SQLite");

    addSectionTitle("Education");
    addParagraph("Cebu Technological University - Naga Campus", 11, [34, 34, 34]);
    addBullet("Bachelor of Industrial Technology, Major in Computer Technology");
    addBullet("Graduated in 2022");

    doc.save("Klent-Mantalaba-Resume.pdf");
}

resumeButtons.forEach((button) => {
    button?.addEventListener("click", downloadResume);
});

// Keep the contact form beginner-friendly while showing a polished interaction.
contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thanks for your message! You can also reach me directly at mantalabaklent@gmail.com.");
    contactForm.reset();
});

// Add a subtle reveal animation as sections come into view.
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
});

// AI Assistant functionality
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const questionButtons = document.querySelectorAll(".question-btn");
const quickQuestionsPanel = document.getElementById("quickQuestionsPanel");
const toggleQuestionsButton = document.getElementById("toggleQuestions");

const assistantResponses = {
    skills: "I specialize in full-stack development with expertise in C#, HTML, CSS, JavaScript, and various frameworks. My skills include frontend technologies (HTML, CSS, JS), backend development (C#, .NET), databases (MySQL, SQL Server, SQLite), and tools like DevExpress, MudBlazor, and Tekla Structures. I also have basic experience with Flutter for mobile development.",

    projects: "I've worked on several impactful projects including an Order Tracking Website for Gillette Pepsi Companies, OPEX Team Applications that improved workflow efficiency, and OrkaSync - an automation server for Tekla model data processing. These projects demonstrate my ability to build practical solutions that save time and improve business processes.",

    experience: "I currently work as a Junior Software Engineer II at TritonTek, Inc. since 2024, where I contribute to internal applications, automation workflows, and reporting tools. Previously, I gained foundational experience through an OJT role at NBI Satellite Office. I hold a Bachelor's degree in Computer Technology from Cebu Technological University.",

    contact: "You can reach me through email at mantalabaklent@gmail.com or by phone at +63 9690708166 / +63 9945361789. I'm also available on professional platforms like GitHub and LinkedIn. Feel free to send me a message about potential opportunities or collaborations!",

    availability: "Yes, I'm currently available for full-time roles and freelance projects. I'm particularly interested in opportunities involving web development, automation solutions, and software engineering roles where I can contribute to building efficient, user-friendly applications."
};

// Keywords for matching user input to responses
const keywordMap = {
    skills: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool', 'expertise', 'proficient', 'know'],
    projects: ['project', 'work', 'portfolio', 'built', 'created', 'developed', 'application', 'website', 'software'],
    experience: ['experience', 'work', 'job', 'career', 'background', 'employment', 'role', 'position', 'company'],
    contact: ['contact', 'email', 'phone', 'reach', 'connect', 'message', 'call', 'linkedin', 'github', 'social'],
    availability: ['available', 'hire', 'job', 'work', 'freelance', 'open', 'looking', 'opportunity', 'position']
};

const fallbackResponses = [
    "I'd be happy to help! You can ask me about Klent's skills, projects, experience, contact information, or availability.",
    "I'm here to help you learn more about Klent. Try asking about his skills, projects, work experience, or how to get in touch!",
    "That's an interesting question! I can tell you about Klent's technical skills, past projects, professional experience, or contact details.",
    "I specialize in answering questions about Klent's background. Ask me about his skills, projects, experience, or contact information!"
];

function addMessage(content, isBot = true) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isBot ? "bot-message" : "user-message"}`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = isBot ? "KM" : "You";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    messageContent.appendChild(paragraph);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processUserInput(userMessage) {
    const message = userMessage.toLowerCase().trim();

    // Check for exact matches with predefined questions
    for (const [key, response] of Object.entries(assistantResponses)) {
        if (message.includes(key)) {
            return response;
        }
    }

    // Check for keyword matches
    for (const [category, keywords] of Object.entries(keywordMap)) {
        for (const keyword of keywords) {
            if (message.includes(keyword)) {
                return assistantResponses[category];
            }
        }
    }

    // Check for greetings
    if (message.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
        return "Hello! I'm Klent's AI assistant. I can help you learn about his skills, projects, experience, and contact information. What would you like to know?";
    }

    // Check for thanks
    if (message.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
        return "You're welcome! Feel free to ask me anything else about Klent.";
    }

    // Return random fallback response
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

function handleUserMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, false);

    // Clear input
    chatInput.value = '';
    sendButton.disabled = true;

    // Process and respond
    setTimeout(() => {
        const response = processUserInput(message);
        addMessage(response, true);
    }, 500 + Math.random() * 500); // Random delay for more natural feel
}

// Event listeners for quick question buttons
questionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const questionText = button.querySelector("span:last-child")?.textContent.trim() || button.textContent.trim();
        handleUserMessage(questionText);
    });
});

function setQuestionsVisibility(isVisible) {
    quickQuestionsPanel?.classList.toggle("is-hidden", !isVisible);

    if (toggleQuestionsButton) {
        toggleQuestionsButton.textContent = isVisible ? "Hide" : "Unhide";
        toggleQuestionsButton.setAttribute("aria-expanded", String(isVisible));
    }
}

toggleQuestionsButton?.addEventListener("click", () => {
    const isCurrentlyHidden = quickQuestionsPanel?.classList.contains("is-hidden");
    setQuestionsVisibility(Boolean(isCurrentlyHidden));
});

// Event listeners for chat input
chatInput.addEventListener("input", () => {
    sendButton.disabled = !chatInput.value.trim();
});

chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !sendButton.disabled) {
        handleUserMessage(chatInput.value);
    }
});

sendButton.addEventListener("click", () => {
    if (!sendButton.disabled) {
        handleUserMessage(chatInput.value);
    }
});

// Chatbot toggle functionality
const chatbotToggle = document.getElementById("chatbotToggle");
const assistantSection = document.querySelector(".assistant-section");

function toggleAssistant() {
    const isHidden = assistantSection.classList.contains("hidden");
    assistantSection.classList.toggle("hidden");
    chatbotToggle.classList.toggle("active");

    // Focus on input when opening
    if (isHidden) {
        setQuestionsVisibility(true);
        setTimeout(() => {
            chatInput.focus();
        }, 300);
    }
}

chatbotToggle.addEventListener("click", toggleAssistant);

// Close assistant when clicking the close button
const closeAssistantBtn = document.getElementById("closeAssistant");
closeAssistantBtn.addEventListener("click", toggleAssistant);

// Close assistant when clicking outside
assistantSection.addEventListener("click", (e) => {
    if (e.target === assistantSection) {
        toggleAssistant();
    }
});

// Close assistant with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !assistantSection.classList.contains("hidden")) {
        toggleAssistant();
    }
});
