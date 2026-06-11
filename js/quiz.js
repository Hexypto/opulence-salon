/**
 * Opulence Luxury Salon - Service Finder Quiz Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if we need to auto-open quiz from homepage teaser link (?quiz=open)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('quiz') === 'open') {
        setTimeout(() => {
            const quizSec = document.getElementById('quiz-section');
            if (quizSec) {
                quizSec.scrollIntoView({ behavior: 'smooth' });
                startQuiz();
            }
        }, 500);
    }

    // Quiz Questions Data
    const questions = [
        {
            id: 1,
            title: "What is your primary beauty focus today?",
            options: [
                { text: "Bespoke Hair Transformation", value: "hair", next: 2 },
                { text: "Advanced Radiant Skincare", value: "skin", next: 3 },
                { text: "Luxe Bridal/Groom Couture", value: "bridal", next: 4 },
                { text: "Exquisite Nails & Grooming", value: "nails", next: 5 }
            ]
        ],
        // Hair path
        {
            id: 2,
            title: "What is your main hair concern or objective?",
            options: [
                { text: "Dryness, frizz, or split ends", value: "hair-dry", outcome: "hair-spa" },
                { text: "Color refresh, balayage, or highlights", value: "hair-color", outcome: "hair-color" },
                { text: "Sleek, straight, frizz-free texture", value: "hair-straight", outcome: "hair-smoothing" },
                { text: "Designer haircut & professional blowout", value: "hair-cut", outcome: "hair-cut" }
            ]
        ],
        // Skin path
        {
            id: 3,
            title: "What skin result are you looking to achieve?",
            options: [
                { text: "Deep hydration, rejuvenation, and cellular glow", value: "skin-glow", outcome: "skin-facial" },
                { text: "Acne therapy, clarifying, or blackhead cleanup", value: "skin-acne", outcome: "skin-cleanup" },
                { text: "Fine lines, lifting, and anti-aging care", value: "skin-age", outcome: "skin-advanced" }
            ]
        ],
        // Bridal path
        {
            id: 4,
            title: "What wedding or festive service do you need?",
            options: [
                { text: "Comprehensive Royal Bridal Makeover & Trial", value: "bridal-main", outcome: "bridal-luxe" },
                { text: "Light party makeup & gorgeous styling", value: "party-make", outcome: "makeup-party" },
                { text: "Festive groom package with luxury shaves", value: "groom-make", outcome: "groom-pack" }
            ]
        ],
        // Nails/Grooming path
        {
            id: 5,
            title: "Which nail or grooming service describes your goal?",
            options: [
                { text: "Sleek gel extensions & custom nail art", value: "nail-art", outcome: "nail-extensions" },
                { text: "Relaxing manicure, pedicure, and cuticle care", value: "nail-spa", outcome: "nail-pedicure" },
                { text: "Smooth waxing & precision facial threading", value: "groom-wax", outcome: "grooming-basic" }
            ]
        }
    ];

    const outcomes = {
        "hair-spa": {
            title: "Kérastase Luxury Chronologiste Hair Spa",
            category: "Hair Couture",
            description: "An exceptional hair and scalp rejuvenation ritual. Restores elasticity, deep hydration, and brilliant shine using premium chronologiste caviar beads.",
            benefits: "Rebuilds hair fibers, combats scalp aging, restores luxurious bounce."
        },
        "hair-color": {
            title: "French Balayage & Olaplex Protection",
            category: "Hair Couture",
            description: "Custom hand-painted color highlights designed by our Creative Hair Directors. Enhanced with Olaplex bond repair to ensure hair integrity.",
            benefits: "Multi-dimensional depth, luminous gold tones, ultimate hair strength."
        },
        "hair-smoothing": {
            title: "Signature Keratin Silk Smoothing Treatment",
            category: "Hair Couture",
            description: "Tame unruly frizz with our premium formaldehyde-free Keratin therapy. Leaves hair beautifully sleek, shiny, and manageable.",
            benefits: "Eliminates frizz by 90%, slashes blowout time, lasts up to 4 months."
        },
        "hair-cut": {
            title: "Couture Haircut & L'Oréal Glossing Blowout",
            category: "Hair Couture",
            description: "A tailored face-framing haircut by Amit Aneja followed by a signature high-shine glaze and luxury voluminous blowout.",
            benefits: "Brings structure, volume, and red-carpet shine to flat hair."
        },
        "skin-facial": {
            title: "Advanced Hydra-Radiance Facial & Cellular Infusion",
            category: "Advanced Skincare",
            description: "A multi-step medical facial utilizing vacuum suction extraction, customized serum infusion, and oxygen therapy for immediate plumping.",
            benefits: "Cleanses pores deeply, stimulates collagen, provides an instant red-carpet glow."
        },
        "skin-cleanup": {
            title: "Clarifying Herbal Skin Detox & Anti-Acne CleanUp",
            category: "Advanced Skincare",
            description: "A deep pore cleansing treatment focusing on extractions, soothing clay masks, and organic clarifying extracts to reduce congestion.",
            benefits: "Removes blackheads, reduces skin oiliness, calms inflamed breakouts."
        },
        "skin-advanced": {
            title: "Premium Gold Collagen Lifting & Tightening Treatment",
            category: "Advanced Skincare",
            description: "High-concentration gold collagen leaf infusion paired with micro-current lifting massage to firm facial contour contours.",
            benefits: "Reduces appearance of fine lines, firms saggy skin, lifts cheekbones."
        },
        "bridal-luxe": {
            title: "Royal HD Bridal Makeover & Pre-Bridal Ritual",
            category: "Bridal Luxe Makeover",
            description: "Our signature luxury bridal treatment. Includes a personalized makeup trial, HD cosmetics application, hair sculpting, and jewelry draping.",
            benefits: "Photogenic HD finish, custom lashes, flawless long-wear airbrush techniques."
        },
        "makeup-party": {
            title: "Designer Party Glam & Glam Blowout",
            category: "Bridal Luxe Makeover",
            description: "A stunning waterproof makeup look tailored to your outfit (dewy, smoky, or classic red lip) paired with a glam styling blowout.",
            benefits: "Premium makeup brands (MAC, Huda Beauty), custom lashes, camera-ready look."
        },
        "groom-pack": {
            title: "The Royal Hive Groom Pack & Beard Couture",
            category: "Gentlemen's Grooming",
            description: "Designed for the sophisticated man. Features a signature beard trim, charcoal skin scrub, hair wash, and hot towel charcoal shave.",
            benefits: "Refined posture grooming, deep skin purification, stress relief hot massage."
        },
        "nail-extensions": {
            title: "Exquisite Acrylic Extensions & Hand-Painted Gel Art",
            category: "Nail Artistry",
            description: "Flawless extensions tailored to your desired shape (stiletto, almond, coffin) topped with bespoke hand-painted detailing and glass gel shine.",
            benefits: "Perfect nail symmetry, durable chip-free wear, stunning customized designs."
        },
        "nail-pedicure": {
            title: "Luxury Organic Rose & Milk Spa Pedicure",
            category: "Nail Artistry",
            description: "A restorative hand and foot ritual featuring organic sea salt scrubs, milk baths, rose petal massage, and nourishing paraffin mask.",
            benefits: "Softens dry heels, increases foot blood circulation, offers ultimate relaxation."
        },
        "grooming-basic": {
            title: "Premium Rica Waxing & Silk Threading Package",
            category: "Gentlemen's Grooming",
            description: "Hygienic, comfortable hair removal package utilizing premium Italian Rica wax (chocolate or honey) and organic threads.",
            benefits: "Minimal skin irritation, slows down hair growth, defines brows precisely."
        }
    };

    let currentStep = 1;
    let quizHistory = [];

    // DOM Elements
    const startBtn = document.getElementById('start-quiz-btn');
    const quizIntro = document.getElementById('quiz-intro');
    const quizCard = document.getElementById('quiz-card');
    const quizTitle = document.getElementById('quiz-question-title');
    const quizOptions = document.getElementById('quiz-options-container');
    const quizBackBtn = document.getElementById('quiz-back-btn');
    const quizResult = document.getElementById('quiz-result');
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');
    const resultBenefits = document.getElementById('result-benefits');
    const resultBookBtn = document.getElementById('quiz-book-btn');
    const quizRestartBtn = document.getElementById('quiz-restart-btn');

    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (quizBackBtn) quizBackBtn.addEventListener('click', goBack);
    if (quizRestartBtn) quizRestartBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        if (quizIntro && quizCard) {
            quizIntro.style.display = 'none';
            quizCard.style.display = 'block';
            showQuestion(1);
        }
    }

    function showQuestion(qId) {
        currentStep = qId;
        const q = questions.find(item => item.id === qId);
        
        if (!q) return;

        quizTitle.textContent = q.title;
        quizOptions.innerHTML = '';

        // Show back button if not first step
        if (quizHistory.length > 0) {
            quizBackBtn.style.display = 'block';
        } else {
            quizBackBtn.style.display = 'none';
        }

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline';
            btn.style.width = '100%';
            btn.style.textAlign = 'left';
            btn.style.marginBottom = '10px';
            btn.innerHTML = `<span style="color:var(--color-primary); margin-right: 15px;">✦</span> ${opt.text}`;
            
            btn.addEventListener('click', () => {
                quizHistory.push(qId);
                
                if (opt.next) {
                    showQuestion(opt.next);
                } else if (opt.outcome) {
                    showOutcome(opt.outcome);
                }
            });
            
            quizOptions.appendChild(btn);
        });
    }

    function showOutcome(outcomeKey) {
        const data = outcomes[outcomeKey];
        if (!data) return;

        quizCard.style.display = 'none';
        quizResult.style.display = 'block';

        resultTitle.textContent = data.title;
        resultDesc.textContent = data.description;
        resultBenefits.textContent = data.benefits;

        // Clean event listeners on book button
        const newBookBtn = resultBookBtn.cloneNode(true);
        resultBookBtn.parentNode.replaceChild(newBookBtn, resultBookBtn);

        newBookBtn.addEventListener('click', () => {
            const text = `Hello Opulence Luxury Salon! I took the Service Finder Quiz and was recommended the *${data.title}* (${data.category}). I would like to reserve an appointment slot for this treatment.`;
            const waUrl = `https://wa.me/919811630659?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
        });
    }

    function goBack() {
        if (quizHistory.length > 0) {
            const prevId = quizHistory.pop();
            showQuestion(prevId);
        }
    }

    function restartQuiz() {
        quizHistory = [];
        quizResult.style.display = 'none';
        quizCard.style.display = 'block';
        showQuestion(1);
    }
});
