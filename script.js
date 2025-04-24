let currentGrade = 6;
let currentSubject = null;

// Sample data structure for content
const content = {
    math: {
        6: {
            'Algebra': {
                topics: ['Introduction to Variables', 'Simple Equations', 'Basic Operations'],
                solutions: {
                    'Introduction to Variables': 'Variables are symbols that represent numbers. For example, in the equation x + 5 = 10, x is a variable that represents the number 5.',
                    'Simple Equations': 'To solve x + 5 = 10, subtract 5 from both sides: x = 10 - 5 = 5',
                    'Basic Operations': 'Addition, subtraction, multiplication, and division with variables follow the same rules as with numbers.'
                }
            },
            'Geometry': {
                topics: ['Basic Shapes', 'Perimeter', 'Area'],
                solutions: {
                    'Basic Shapes': 'Learn about triangles, squares, rectangles, and circles.',
                    'Perimeter': 'Perimeter is the distance around a shape. Rectangle perimeter = 2(length + width)',
                    'Area': 'Area is the space inside a shape. Rectangle area = length × width'
                }
            }
        },
        // Add more grades here
    },
    science: {
        6: {
            'Physics': {
                topics: ['Motion', 'Force', 'Energy'],
                solutions: {
                    'Motion': 'Motion is a change in position of an object over time.',
                    'Force': 'Force is a push or pull that can change the motion of an object.',
                    'Energy': 'Energy is the ability to do work. It exists in many forms like potential and kinetic energy.'
                }
            },
            'Chemistry': {
                topics: ['Matter', 'Elements', 'Compounds'],
                solutions: {
                    'Matter': 'Matter is anything that has mass and takes up space.',
                    'Elements': 'Elements are pure substances made of only one type of atom.',
                    'Compounds': 'Compounds are substances made of two or more elements chemically combined.'
                }
            }
        },
        // Add more grades here
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set up grade button listeners
    const gradeButtons = document.querySelectorAll('.grade-btn');
    gradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentGrade = parseInt(button.dataset.grade);
            updateActiveGrade(currentGrade);
            if (currentSubject) {
                showSubjectContent(currentSubject, currentGrade);
            }
        });
    });

    // Set initial active grade
    updateActiveGrade(currentGrade);
});

function updateActiveGrade(grade) {
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.grade) === grade) {
            btn.classList.add('active');
        }
    });
}

function showSubject(subject) {
    currentSubject = subject;
    showSubjectContent(subject, currentGrade);
}

function showSubjectContent(subject, grade) {
    const contentArea = document.getElementById('content-area');
    const subjectContent = content[subject][grade];
    
    if (!subjectContent) {
        contentArea.innerHTML = '<div class="alert alert-info">Content for this grade is coming soon!</div>';
        return;
    }

    let html = `<h2>${subject.charAt(0).toUpperCase() + subject.slice(1)} - Class ${grade}</h2>`;
    
    Object.keys(subjectContent).forEach(chapter => {
        html += `
            <div class="card topic-card mb-3">
                <div class="card-body">
                    <h3 class="card-title">${chapter}</h3>
                    <div class="topic-list">
                        ${subjectContent[chapter].topics.map(topic => `
                            <div class="topic-item">
                                <button class="btn btn-link" onclick="showSolution('${subject}', ${grade}, '${chapter}', '${topic}')">
                                    ${topic}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });

    contentArea.innerHTML = html;
}

function showSolution(subject, grade, chapter, topic) {
    const solution = content[subject][grade][chapter].solutions[topic];
    const contentArea = document.getElementById('content-area');
    
    // Add the solution below the topic
    const topicElement = contentArea.querySelector(`button.btn-link:contains('${topic}')`).parentElement;
    
    // Remove any existing solution
    const existingSolution = topicElement.querySelector('.solution-content');
    if (existingSolution) {
        existingSolution.remove();
        return;
    }

    // Add the new solution
    const solutionElement = document.createElement('div');
    solutionElement.className = 'solution-content';
    solutionElement.innerHTML = `
        <h4>Solution:</h4>
        <p>${solution}</p>
    `;
    topicElement.appendChild(solutionElement);
}

// Helper function for querySelector
Element.prototype.querySelector = function(selector) {
    return Array.from(this.querySelectorAll('*')).find(el => 
        selector.startsWith(':contains(') && 
        el.textContent.includes(selector.slice(10, -2))
    ) || HTMLElement.prototype.querySelector.call(this, selector);
}; 
