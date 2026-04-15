const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const resumeButtons = [
    document.getElementById("downloadResumeNav"),
    document.getElementById("downloadResumeHero")
];
const contactForm = document.querySelector(".contact-form");
const revealElements = document.querySelectorAll(".section, .project-card, .timeline-item, .education-card, .contact-form");

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
