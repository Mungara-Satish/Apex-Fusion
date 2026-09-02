import { CbseExamPaper } from './types';

export const CBSE_CLASS_10_MATH_BOARD_PAPER: CbseExamPaper = {
  id: 'cbse-math-2026-full',
  title: 'CBSE Class 10 Mathematics (Standard) Official Board Model Exam 2025-26',
  subjectName: 'Mathematics (Standard)',
  code: 'MATH-041',
  year: 2026,
  totalMarks: 80,
  durationMinutes: 180, // 3 hours
  instructions: [
    'This question paper contains 38 questions divided into 5 Sections A, B, C, D and E.',
    'Section A comprises 20 MCQs of 1 mark each (Questions 1 to 18 standard MCQs, 19 & 20 Assertion-Reasoning).',
    'Section B comprises 5 Very Short Answer (VSA) type questions of 2 marks each.',
    'Section C comprises 6 Short Answer (SA) type questions of 3 marks each.',
    'Section D comprises 4 Long Answer (LA) type questions of 5 marks each.',
    'Section E comprises 3 Case-Based integrated units of assessment (4 marks each) with sub-parts.',
    'All questions are compulsory. Internal choice is provided in 2 questions of 2 marks, 2 questions of 3 marks, and 2 questions of 5 marks.',
  ],
  questions: [
    // SECTION A (20 Marks)
    {
      id: 'q-secA-1',
      section: 'SECTION_A',
      questionNumber: 1,
      marks: 1,
      questionType: 'MCQ',
      questionText: 'If two positive integers $a$ and $b$ are written as $a = x^3 y^2$ and $b = x y^3$, where $x, y$ are prime numbers, then $\\text{HCF}(a, b)$ is:',
      options: ['xy', 'xy^2', 'x^3 y^3', 'x^2 y^2'],
      correctOptionIndex: 1,
      markingRubric: ['1 Mark for choosing option (B) $xy^2$.'],
      topperModelAnswer: 'Option (B) $xy^2$. HCF is the product of the smallest power of each common prime factor involved: $\\text{HCF} = x^1 \\cdot y^2 = xy^2$.',
      explanation: 'HCF takes the minimum exponent for each common prime base: $\\min(3,1)=1$ for $x$, and $\\min(2,3)=2$ for $y$. Hence $\\text{HCF} = x y^2$.',
      topic: 'Real Numbers - HCF by Prime Factorisation',
    },
    {
      id: 'q-secA-2',
      section: 'SECTION_A',
      questionNumber: 2,
      marks: 1,
      questionType: 'MCQ',
      questionText: 'If one zero of the quadratic polynomial $x^2 + 3x + k$ is 2, then the value of $k$ is:',
      options: ['10', '-10', '-7', '-2'],
      correctOptionIndex: 1,
      markingRubric: ['1 Mark for calculating $k = -10$.'],
      topperModelAnswer: 'Option (B) $-10$. Since $2$ is a zero: $(2)^2 + 3(2) + k = 0 \\implies 4 + 6 + k = 0 \\implies k = -10$.',
      explanation: 'Substitute $x = 2$ into $P(x) = 0$: $4 + 6 + k = 0 \\implies k = -10$.',
      topic: 'Polynomials - Zeroes of Polynomial',
    },
    {
      id: 'q-secA-3',
      section: 'SECTION_A',
      questionNumber: 3,
      marks: 1,
      questionType: 'MCQ',
      questionText: 'The pair of linear equations $x + 2y + 5 = 0$ and $-3x - 6y + 1 = 0$ has:',
      options: ['A unique solution', 'Exactly two solutions', 'Infinitely many solutions', 'No solution'],
      correctOptionIndex: 3,
      markingRubric: ['1 Mark for identifying parallel lines condition $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$.'],
      topperModelAnswer: 'Option (D) No solution. Ratio test: $\\frac{1}{-3} = \\frac{2}{-6} = -\\frac{1}{3} \\neq \\frac{5}{1}$. Lines are parallel.',
      explanation: '$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$ represents inconsistent parallel lines with no solution.',
      topic: 'Linear Equations - Consistency Conditions',
    },
    {
      id: 'q-secA-4',
      section: 'SECTION_A',
      questionNumber: 4,
      marks: 1,
      questionType: 'MCQ',
      questionText: 'If $\\sin \\theta + \\cos \\theta = \\sqrt{2} \\cos \\theta$, then the value of $(\\cos \\theta - \\sin \\theta)$ is:',
      options: ['\\sqrt{2} \\sin \\theta', '\\sqrt{2} \\cos \\theta', '\\frac{1}{\\sqrt{2}} \\sin \\theta', '2 \\sin \\theta'],
      correctOptionIndex: 0,
      markingRubric: ['1 Mark for proving $\\cos \\theta - \\sin \\theta = \\sqrt{2} \\sin \\theta$.'],
      topperModelAnswer: 'Option (A) $\\sqrt{2} \\sin \\theta$.\nGiven: $\\sin \\theta = (\\sqrt{2} - 1)\\cos \\theta \\implies \\cos \\theta = \\frac{\\sin \\theta}{\\sqrt{2}-1} = (\\sqrt{2}+1)\\sin \\theta$.\nThen $\\cos \\theta - \\sin \\theta = (\\sqrt{2}+1)\\sin \\theta - \\sin \\theta = \\sqrt{2}\\sin \\theta$.',
      explanation: 'Squaring and using trigonometric identity $\\sin^2 \\theta + \\cos^2 \\theta = 1$ yields $\\cos \\theta - \\sin \\theta = \\sqrt{2}\\sin \\theta$.',
      topic: 'Trigonometry - Identities',
    },
    {
      id: 'q-secA-19',
      section: 'SECTION_A',
      questionNumber: 19,
      marks: 1,
      questionType: 'ASSERTION_REASON',
      questionText: '**Assertion (A):** The HCF of two numbers is 5 and their product is 150, then their LCM is 30.\n**Reason (R):** For any two positive integers $a$ and $b$, $\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$.',
      options: [
        'Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of (A).',
        'Both Assertion (A) and Reason (R) are true but Reason (R) is NOT the correct explanation of (A).',
        'Assertion (A) is true but Reason (R) is false.',
        'Assertion (A) is false but Reason (R) is true.',
      ],
      correctOptionIndex: 0,
      markingRubric: ['1 Mark for selecting Option (A).'],
      topperModelAnswer: 'Option (A). Product = $\\text{HCF} \\times \\text{LCM} \\implies 150 = 5 \\times \\text{LCM} \\implies \\text{LCM} = 30$. Both are true and Reason correctly explains Assertion.',
      explanation: '$\\text{LCM} = \\frac{150}{5} = 30$. Reason provides the exact formula utilized.',
      topic: 'Real Numbers - Assertion & Reasoning',
    },

    // SECTION B (Very Short Answer - 2 Marks)
    {
      id: 'q-secB-21',
      section: 'SECTION_B',
      questionNumber: 21,
      marks: 2,
      questionType: 'VERY_SHORT',
      questionText: 'Prove that $\\sqrt{5}$ is an irrational number using the method of contradiction.',
      markingRubric: [
        '1 Mark: Assuming $\\sqrt{5} = \\frac{a}{b}$ (where $a, b$ are coprime) and deriving $a^2 = 5b^2 \\implies 5$ divides $a$.',
        '1 Mark: Substituting $a = 5c$, obtaining $b^2 = 5c^2 \\implies 5$ divides $b$, contradicting the coprime assumption.',
      ],
      topperModelAnswer: `**Proof:**
1. Let us assume, to the contrary, that $\\sqrt{5}$ is rational.
   Then $\\sqrt{5} = \\frac{a}{b}$, where $a$ and $b$ are coprime integers and $b \\neq 0$.
2. Squaring both sides: $5 = \\frac{a^2}{b^2} \\implies a^2 = 5b^2$.
   Therefore, $5$ divides $a^2$, which means $5$ divides $a$ (by Theorem: if $p$ divides $a^2$, $p$ divides $a$).
3. Let $a = 5c$ for some integer $c$.
   Substituting: $(5c)^2 = 5b^2 \\implies 25c^2 = 5b^2 \\implies b^2 = 5c^2$.
   This means $5$ divides $b^2$, so $5$ divides $b$.
4. Thus, $5$ is a common factor of both $a$ and $b$. But this contradicts the fact that $a$ and $b$ are coprime.
   This contradiction has arisen because of our incorrect assumption.
   **Hence, $\\sqrt{5}$ is irrational.**`,
      explanation: 'Standard NCERT Theorem proof for irrationality.',
      topic: 'Real Numbers - Irrationality Proofs',
    },

    // SECTION C (Short Answer - 3 Marks)
    {
      id: 'q-secC-26',
      section: 'SECTION_C',
      questionNumber: 26,
      marks: 3,
      questionType: 'SHORT',
      questionText: 'Prove the trigonometric identity: $$\\frac{\\sin \\theta - \\cos \\theta + 1}{\\sin \\theta + \\cos \\theta - 1} = \\frac{1}{\\sec \\theta - \\tan \\theta}$$ using the identity $\\sec^2 \\theta = 1 + \\tan^2 \\theta$.',
      markingRubric: [
        '1 Mark: Dividing numerator and denominator by $\\cos \\theta$ to convert to $\\tan \\theta$ and $\\sec \\theta$.',
        '1 Mark: Replacing $1$ with $(\\sec^2 \\theta - \\tan^2 \\theta)$ in the numerator.',
        '1 Mark: Factoring and cancelling identical terms to arrive at $\\text{RHS}$.',
      ],
      topperModelAnswer: `**Proof:**
Dividing numerator and denominator of LHS by $\\cos \\theta$:
$$\\text{LHS} = \\frac{\\tan \\theta - 1 + \\sec \\theta}{\\tan \\theta + 1 - \\sec \\theta} = \\frac{(\\tan \\theta + \\sec \\theta) - (\\sec^2 \\theta - \\tan^2 \\theta)}{\\tan \\theta - \\sec \\theta + 1}$$

Factoring $(\\sec^2 \\theta - \\tan^2 \\theta) = (\\sec \\theta - \\tan \\theta)(\\sec \\theta + \\tan \\theta)$:
$$= \\frac{(\\sec \\theta + \\tan \\theta)[1 - (\\sec \\theta - \\tan \\theta)]}{\\tan \\theta - \\sec \\theta + 1}$$
$$= \\frac{(\\sec \\theta + \\tan \\theta)(1 - \\sec \\theta + \\tan \\theta)}{1 - \\sec \\theta + \\tan \\theta} = \\sec \\theta + \\tan \\theta$$

Multiply and divide by $(\\sec \\theta - \\tan \\theta)$:
$$= \\frac{(\\sec \\theta + \\tan \\theta)(\\sec \\theta - \\tan \\theta)}{\\sec \\theta - \\tan \\theta} = \\frac{\\sec^2 \\theta - \\tan^2 \\theta}{\\sec \\theta - \\tan \\theta} = \\frac{1}{\\sec \\theta - \\tan \\theta} = \\text{RHS}$$
**Hence Proved.**`,
      explanation: 'One of the most frequently asked 3-mark questions in CBSE 10th Board history.',
      topic: 'Trigonometry - Algebraic Proofs',
    },

    // SECTION D (Long Answer - 5 Marks)
    {
      id: 'q-secD-32',
      section: 'SECTION_D',
      questionNumber: 32,
      marks: 5,
      questionType: 'LONG',
      questionText: 'A motor boat whose speed is $18\\text{ km/h}$ in still water takes $1\\text{ hour}$ more to go $24\\text{ km}$ upstream than to return downstream to the same spot. Find the speed of the stream.',
      markingRubric: [
        '1 Mark: Defining speed of stream as $x\\text{ km/h}$ and expressing upstream speed $(18-x)$ and downstream speed $(18+x)$.',
        '2 Marks: Formulating the time difference equation $\\frac{24}{18-x} - \\frac{24}{18+x} = 1$.',
        '1.5 Marks: Simplifying to standard quadratic form $x^2 + 48x - 324 = 0$ and solving via factorisation.',
        '0.5 Marks: Rejecting negative value and stating final stream speed $6\\text{ km/h}$.',
      ],
      topperModelAnswer: `**Step 1: Define variables**
Let the speed of the stream be $x\\text{ km/h}$.
Given speed of boat in still water = $18\\text{ km/h}$.
- Speed of boat upstream = $(18 - x)\\text{ km/h}$
- Speed of boat downstream = $(18 + x)\\text{ km/h}$
Distance = $24\\text{ km}$.

**Step 2: Formulate equation according to problem**
$$\\text{Time taken upstream} - \\text{Time taken downstream} = 1\\text{ hour}$$
$$\\frac{24}{18 - x} - \\frac{24}{18 + x} = 1$$

**Step 3: Algebraic simplification**
$$24 \\left[ \\frac{(18 + x) - (18 - x)}{(18 - x)(18 + x)} \\right] = 1$$
$$24 \\left[ \\frac{2x}{324 - x^2} \\right] = 1 \\implies 48x = 324 - x^2$$
$$x^2 + 48x - 324 = 0$$

**Step 4: Factorisation**
$$x^2 + 54x - 6x - 324 = 0$$
$$x(x + 54) - 6(x + 54) = 0 \\implies (x - 6)(x + 54) = 0$$
$$x = 6 \\quad \\text{or} \\quad x = -54$$

Since speed cannot be negative, $x = 6$.
**Answer: The speed of the stream is $6\\text{ km/h}$.**`,
      explanation: 'Classic speed-distance-time quadratic model.',
      topic: 'Quadratic Equations - Upstream/Downstream Applications',
    },

    // SECTION E (Case-Based Competency - 4 Marks)
    {
      id: 'q-secE-36',
      section: 'SECTION_E',
      questionNumber: 36,
      marks: 4,
      questionType: 'CASE_BASED',
      questionText: 'Answer the following case study questions based on the scenario below:',
      casePassage: `**Case Study: Construction of a Suspension Bridge**
A suspension bridge has two towers $50\\text{ m}$ apart. The cable hanging between the towers forms a parabolic curve given by $y = \\frac{1}{25} x^2$, where the vertex of the parabola is at the origin $(0,0)$ on the roadway, and $x$ is the horizontal distance in metres from the center of the bridge.

(i) What is the height of the cable at a distance of $10\\text{ m}$ from the center? (1 Mark)
(ii) If the towers are at $x = -25\\text{ m}$ and $x = +25\\text{ m}$, what is the total height of the supporting towers above the roadway? (1 Mark)
(iii) Find the coordinates of two vertical support struts of height $9\\text{ m}$ each. (2 Marks)`,
      markingRubric: [
        '1 Mark: (i) $y = \\frac{1}{25}(10)^2 = 4\\text{ m}$.',
        '1 Mark: (ii) $y = \\frac{1}{25}(25)^2 = 25\\text{ m}$.',
        '2 Marks: (iii) $9 = \\frac{1}{25} x^2 \\implies x^2 = 225 \\implies x = \\pm 15\\text{ m}$. Coordinates are $(15, 9)$ and $(-15, 9)$.',
      ],
      topperModelAnswer: `**(i) Height at $x = 10\\text{ m}$:**
$$y = \\frac{1}{25}(10)^2 = \\frac{100}{25} = 4\\text{ metres}.$$

**(ii) Height of supporting towers at $x = 25\\text{ m}$:**
$$y = \\frac{1}{25}(25)^2 = \\frac{625}{25} = 25\\text{ metres}.$$

**(iii) Location of $9\\text{ m}$ struts:**
$$9 = \\frac{1}{25} x^2 \\implies x^2 = 225 \\implies x = \\pm 15\\text{ metres}.$$
The struts are located at coordinates $(15, 9)$ and $(-15, 9)$, i.e., $15\\text{ m}$ on either side of the center.`,
      explanation: 'Official CBSE Section E Competency-based quadratic parabola modeling.',
      topic: 'Coordinate Geometry & Quadratic Modeling (Competency Unit)',
    },
  ],
};
