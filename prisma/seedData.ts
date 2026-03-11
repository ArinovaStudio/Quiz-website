import { Difficulty, PLAN_STATUS, Role } from "@prisma/client";

export const seedData = {
  users: [
    { name: "Admin User", email: "admin@gmail.com", role: Role.ADMIN },
    { name: "Rahul Sharma", email: "rahul.sharma@gmail.com", role: Role.USER },
    { name: "Amit Patel", email: "amit.patel@gmail.com", role: Role.USER },
    { name: "Priya Verma", email: "priya.verma@gmail.com", role: Role.USER },
    { name: "Ankit Gupta", email: "ankit.gupta@gmail.com", role: Role.USER },
    { name: "Neha Singh", email: "neha.singh@gmail.com", role: Role.USER },
    { name: "Rohit Mehta", email: "rohit.mehta@gmail.com", role: Role.USER },
    { name: "Sneha Iyer", email: "sneha.iyer@gmail.com", role: Role.USER },
    { name: "Vikas Yadav", email: "vikas.yadav@gmail.com", role: Role.USER },
    { name: "Pooja Nair", email: "pooja.nair@gmail.com", role: Role.USER },
    { name: "Arjun Reddy", email: "arjun.reddy@gmail.com", role: Role.USER },
    { name: "Karan Malhotra", email: "karan.malhotra@gmail.com", role: Role.USER },
    { name: "Shreya Banerjee", email: "shreya.banerjee@gmail.com", role: Role.USER },
    { name: "Manish Agarwal", email: "manish.agarwal@gmail.com", role: Role.USER },
    { name: "Divya Kulkarni", email: "divya.kulkarni@gmail.com", role: Role.USER },
    { name: "Sanjay Choudhary", email: "sanjay.choudhary@gmail.com", role: Role.USER },
    { name: "Ritika Kapoor", email: "ritika.kapoor@gmail.com", role: Role.USER },
    { name: "Aditya Joshi", email: "aditya.joshi@gmail.com", role: Role.USER },
    { name: "Nikhil Bansal", email: "nikhil.bansal@gmail.com", role: Role.USER },
    { name: "Tanvi Desai", email: "tanvi.desai@gmail.com", role: Role.USER },
    { name: "Harsh Vardhan", email: "harsh.vardhan@gmail.com", role: Role.USER }
  ],
  plans: [
    { title: "Free Plan", description: "Get started for free", tokens: 50, price: 0, status: PLAN_STATUS.ACTIVATED },
    { title: "Pro Plan", description: "Unlock more tournaments", tokens: 500, price: 199, status: PLAN_STATUS.ACTIVATED },
  ],
  categories: [
    {
    name: "Technology",
    subCategories: ["Web Development", "Artificial Intelligence"],
    tournament: {
        title: "Web Dev Championship",
        description: "Test your frontend and backend development knowledge.",
        durationPerQ: 30,
        totalQuestions: 10,
        difficulty: Difficulty.MEDIUM,
        totalSeats: 100,
        winningSeats: 10,
        entryFee: 10,
        prizePool: 1000,
        questions: [
        {
            text: "What does HTML stand for?",
            options: [
            { text: "Hyper Text Markup Language", isCorrect: true },
            { text: "High Transfer Machine Language", isCorrect: false },
            { text: "Hyperlinks Text Machine Language", isCorrect: false },
            { text: "Home Tool Markup Language", isCorrect: false }
            ]
        },
        {
            text: "Which CSS property controls text size?",
            options: [
            { text: "font-size", isCorrect: true },
            { text: "text-style", isCorrect: false },
            { text: "font-weight", isCorrect: false },
            { text: "text-size", isCorrect: false }
            ]
        },
        {
            text: "Which JavaScript keyword declares a constant variable?",
            options: [
            { text: "const", isCorrect: true },
            { text: "var", isCorrect: false },
            { text: "let", isCorrect: false },
            { text: "constant", isCorrect: false }
            ]
        },
        {
            text: "Which framework is used for building user interfaces?",
            options: [
            { text: "React", isCorrect: true },
            { text: "Laravel", isCorrect: false },
            { text: "Django", isCorrect: false },
            { text: "Spring", isCorrect: false }
            ]
        },
        {
            text: "Which HTML tag is used for inserting an image?",
            options: [
            { text: "<img>", isCorrect: true },
            { text: "<image>", isCorrect: false },
            { text: "<src>", isCorrect: false },
            { text: "<picture>", isCorrect: false }
            ]
        },
        {
            text: "Which protocol is used for secure web communication?",
            options: [
            { text: "HTTPS", isCorrect: true },
            { text: "FTP", isCorrect: false },
            { text: "HTTP", isCorrect: false },
            { text: "SMTP", isCorrect: false }
            ]
        },
        {
            text: "Which JavaScript method converts JSON to object?",
            options: [
            { text: "JSON.parse()", isCorrect: true },
            { text: "JSON.stringify()", isCorrect: false },
            { text: "JSON.convert()", isCorrect: false },
            { text: "JSON.toObject()", isCorrect: false }
            ]
        },
        {
            text: "Which HTML element is used for hyperlinks?",
            options: [
            { text: "<a>", isCorrect: true },
            { text: "<link>", isCorrect: false },
            { text: "<href>", isCorrect: false },
            { text: "<nav>", isCorrect: false }
            ]
        },
        {
            text: "Which database is NoSQL?",
            options: [
            { text: "MongoDB", isCorrect: true },
            { text: "MySQL", isCorrect: false },
            { text: "PostgreSQL", isCorrect: false },
            { text: "SQLite", isCorrect: false }
            ]
        },
        {
            text: "Which tool manages project dependencies in Node.js?",
            options: [
            { text: "npm", isCorrect: true },
            { text: "pip", isCorrect: false },
            { text: "composer", isCorrect: false },
            { text: "gradle", isCorrect: false }
            ]
        }
        ]
    }
    },

    {
    name: "Science",
    subCategories: ["Physics", "Chemistry"],
    tournament: {
        title: "Physics Fundamentals Cup",
        description: "Challenge your understanding of physics concepts.",
        durationPerQ: 30,
        totalQuestions: 11,
        difficulty: Difficulty.MEDIUM,
        totalSeats: 100,
        winningSeats: 10,
        entryFee: 10,
        prizePool: 1000,
        questions: [
        {
            text: "What is the SI unit of force?",
            options: [
            { text: "Newton", isCorrect: true },
            { text: "Joule", isCorrect: false },
            { text: "Pascal", isCorrect: false },
            { text: "Watt", isCorrect: false }
            ]
        },
        {
            text: "Who formulated the law of gravity?",
            options: [
            { text: "Isaac Newton", isCorrect: true },
            { text: "Albert Einstein", isCorrect: false },
            { text: "Galileo Galilei", isCorrect: false },
            { text: "Nikola Tesla", isCorrect: false }
            ]
        },
        {
            text: "Speed is defined as:",
            options: [
            { text: "Distance / Time", isCorrect: true },
            { text: "Time / Distance", isCorrect: false },
            { text: "Acceleration × Time", isCorrect: false },
            { text: "Mass × Velocity", isCorrect: false }
            ]
        },
        {
            text: "Which particle has a negative charge?",
            options: [
            { text: "Electron", isCorrect: true },
            { text: "Proton", isCorrect: false },
            { text: "Neutron", isCorrect: false },
            { text: "Photon", isCorrect: false }
            ]
        },
        {
            text: "What is the speed of light?",
            options: [
            { text: "3 × 10^8 m/s", isCorrect: true },
            { text: "3 × 10^6 m/s", isCorrect: false },
            { text: "3 × 10^5 m/s", isCorrect: false },
            { text: "3 × 10^7 m/s", isCorrect: false }
            ]
        },
        {
            text: "Which device measures electric current?",
            options: [
            { text: "Ammeter", isCorrect: true },
            { text: "Voltmeter", isCorrect: false },
            { text: "Thermometer", isCorrect: false },
            { text: "Barometer", isCorrect: false }
            ]
        },
        {
            text: "Which law states F = ma?",
            options: [
            { text: "Newton's Second Law", isCorrect: true },
            { text: "Newton's First Law", isCorrect: false },
            { text: "Newton's Third Law", isCorrect: false },
            { text: "Law of Gravitation", isCorrect: false }
            ]
        },
        {
            text: "Energy stored in an object due to position is:",
            options: [
            { text: "Potential Energy", isCorrect: true },
            { text: "Kinetic Energy", isCorrect: false },
            { text: "Thermal Energy", isCorrect: false },
            { text: "Electrical Energy", isCorrect: false }
            ]
        },
        {
            text: "Which wave travels fastest?",
            options: [
            { text: "Light Wave", isCorrect: true },
            { text: "Sound Wave", isCorrect: false },
            { text: "Water Wave", isCorrect: false },
            { text: "Seismic Wave", isCorrect: false }
            ]
        },
        {
            text: "What instrument measures atmospheric pressure?",
            options: [
            { text: "Barometer", isCorrect: true },
            { text: "Thermometer", isCorrect: false },
            { text: "Altimeter", isCorrect: false },
            { text: "Speedometer", isCorrect: false }
            ]
        },
        {
            text: "Which energy is associated with motion?",
            options: [
            { text: "Kinetic Energy", isCorrect: true },
            { text: "Potential Energy", isCorrect: false },
            { text: "Chemical Energy", isCorrect: false },
            { text: "Nuclear Energy", isCorrect: false }
            ]
        }
        ]
    }
    },

    {
    name: "Mathematics",
    subCategories: ["Algebra", "Geometry"],
    tournament: {
        title: "Algebra Masters Tournament",
        description: "Solve algebraic problems and test your mathematical thinking.",
        durationPerQ: 30,
        totalQuestions: 10,
        difficulty: Difficulty.EASY,
        totalSeats: 100,
        winningSeats: 10,
        entryFee: 10,
        prizePool: 1000,
        questions: [
        {
            text: "What is the value of x in 2x = 10?",
            options: [
            { text: "5", isCorrect: true },
            { text: "10", isCorrect: false },
            { text: "2", isCorrect: false },
            { text: "8", isCorrect: false }
            ]
        },
        {
            text: "What is 7 × 8?",
            options: [
            { text: "56", isCorrect: true },
            { text: "54", isCorrect: false },
            { text: "64", isCorrect: false },
            { text: "48", isCorrect: false }
            ]
        },
        {
            text: "Solve: x + 4 = 9",
            options: [
            { text: "5", isCorrect: true },
            { text: "4", isCorrect: false },
            { text: "6", isCorrect: false },
            { text: "3", isCorrect: false }
            ]
        },
        {
            text: "What is the square of 6?",
            options: [
            { text: "36", isCorrect: true },
            { text: "30", isCorrect: false },
            { text: "42", isCorrect: false },
            { text: "12", isCorrect: false }
            ]
        },
        {
            text: "What is 15 − 7?",
            options: [
            { text: "8", isCorrect: true },
            { text: "6", isCorrect: false },
            { text: "7", isCorrect: false },
            { text: "9", isCorrect: false }
            ]
        },
        {
            text: "Solve: 3x = 12",
            options: [
            { text: "4", isCorrect: true },
            { text: "3", isCorrect: false },
            { text: "6", isCorrect: false },
            { text: "2", isCorrect: false }
            ]
        },
        {
            text: "What is 9 + 11?",
            options: [
            { text: "20", isCorrect: true },
            { text: "18", isCorrect: false },
            { text: "21", isCorrect: false },
            { text: "19", isCorrect: false }
            ]
        },
        {
            text: "What is the cube of 3?",
            options: [
            { text: "27", isCorrect: true },
            { text: "9", isCorrect: false },
            { text: "18", isCorrect: false },
            { text: "12", isCorrect: false }
            ]
        },
        {
            text: "What is 100 ÷ 4?",
            options: [
            { text: "25", isCorrect: true },
            { text: "20", isCorrect: false },
            { text: "30", isCorrect: false },
            { text: "40", isCorrect: false }
            ]
        },
        {
            text: "Solve: x − 3 = 7",
            options: [
            { text: "10", isCorrect: true },
            { text: "9", isCorrect: false },
            { text: "8", isCorrect: false },
            { text: "7", isCorrect: false }
            ]
        }
        ]
    }
    },
    {
  name: "History",
  subCategories: ["Ancient History", "World Wars"],
  tournament: {
    title: "Ancient Civilizations Challenge",
    description: "Test your knowledge about early human civilizations.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.MEDIUM,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "Which civilization built the pyramids of Giza?",
        options: [
          { text: "Ancient Egyptians", isCorrect: true },
          { text: "Romans", isCorrect: false },
          { text: "Greeks", isCorrect: false },
          { text: "Mayans", isCorrect: false }
        ]
      },
      {
        text: "Who was the first emperor of Rome?",
        options: [
          { text: "Augustus", isCorrect: true },
          { text: "Julius Caesar", isCorrect: false },
          { text: "Nero", isCorrect: false },
          { text: "Constantine", isCorrect: false }
        ]
      },
      {
        text: "The Indus Valley Civilization was located in present-day:",
        options: [
          { text: "India and Pakistan", isCorrect: true },
          { text: "China", isCorrect: false },
          { text: "Egypt", isCorrect: false },
          { text: "Greece", isCorrect: false }
        ]
      },
      {
        text: "Which structure in Rome was used for gladiator contests?",
        options: [
          { text: "Colosseum", isCorrect: true },
          { text: "Pantheon", isCorrect: false },
          { text: "Acropolis", isCorrect: false },
          { text: "Forum", isCorrect: false }
        ]
      },
      {
        text: "Who discovered America in 1492?",
        options: [
          { text: "Christopher Columbus", isCorrect: true },
          { text: "Vasco da Gama", isCorrect: false },
          { text: "Ferdinand Magellan", isCorrect: false },
          { text: "Marco Polo", isCorrect: false }
        ]
      },
      {
        text: "The Great Wall of China was primarily built to protect against:",
        options: [
          { text: "Mongol invasions", isCorrect: true },
          { text: "Japanese armies", isCorrect: false },
          { text: "Indian kingdoms", isCorrect: false },
          { text: "Roman forces", isCorrect: false }
        ]
      },
      {
        text: "Which ancient civilization developed democracy?",
        options: [
          { text: "Greece", isCorrect: true },
          { text: "Egypt", isCorrect: false },
          { text: "Persia", isCorrect: false },
          { text: "Babylon", isCorrect: false }
        ]
      },
      {
        text: "Who was the famous queen of ancient Egypt?",
        options: [
          { text: "Cleopatra", isCorrect: true },
          { text: "Elizabeth", isCorrect: false },
          { text: "Victoria", isCorrect: false },
          { text: "Mary", isCorrect: false }
        ]
      },
      {
        text: "The Trojan War is associated with which civilization?",
        options: [
          { text: "Greek", isCorrect: true },
          { text: "Roman", isCorrect: false },
          { text: "Egyptian", isCorrect: false },
          { text: "Chinese", isCorrect: false }
        ]
      },
      {
        text: "Which river was central to Egyptian civilization?",
        options: [
          { text: "Nile", isCorrect: true },
          { text: "Amazon", isCorrect: false },
          { text: "Danube", isCorrect: false },
          { text: "Yangtze", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "Sports",
  subCategories: ["Cricket", "Football"],
  tournament: {
    title: "Cricket Premier Quiz",
    description: "Test your cricket knowledge from history to modern era.",
    durationPerQ: 30,
    totalQuestions: 11,
    difficulty: Difficulty.EASY,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "How many players are in a cricket team?",
        options: [
          { text: "11", isCorrect: true },
          { text: "10", isCorrect: false },
          { text: "9", isCorrect: false },
          { text: "12", isCorrect: false }
        ]
      },
      {
        text: "Which country won the ICC Cricket World Cup 2011?",
        options: [
          { text: "India", isCorrect: true },
          { text: "Australia", isCorrect: false },
          { text: "England", isCorrect: false },
          { text: "Pakistan", isCorrect: false }
        ]
      },
      {
        text: "Who is known as the 'God of Cricket'?",
        options: [
          { text: "Sachin Tendulkar", isCorrect: true },
          { text: "Virat Kohli", isCorrect: false },
          { text: "Ricky Ponting", isCorrect: false },
          { text: "Brian Lara", isCorrect: false }
        ]
      },
      {
        text: "What is the maximum number of overs in an ODI match per team?",
        options: [
          { text: "50", isCorrect: true },
          { text: "40", isCorrect: false },
          { text: "60", isCorrect: false },
          { text: "20", isCorrect: false }
        ]
      },
      {
        text: "Which country hosted the 2019 Cricket World Cup?",
        options: [
          { text: "England", isCorrect: true },
          { text: "India", isCorrect: false },
          { text: "Australia", isCorrect: false },
          { text: "South Africa", isCorrect: false }
        ]
      },
      {
        text: "What does LBW stand for?",
        options: [
          { text: "Leg Before Wicket", isCorrect: true },
          { text: "Long Bat Wicket", isCorrect: false },
          { text: "Leg Bat Wicket", isCorrect: false },
          { text: "Long Ball Wide", isCorrect: false }
        ]
      },
      {
        text: "Which format of cricket has 20 overs per side?",
        options: [
          { text: "T20", isCorrect: true },
          { text: "ODI", isCorrect: false },
          { text: "Test", isCorrect: false },
          { text: "Premier", isCorrect: false }
        ]
      },
      {
        text: "Who was the captain of India in the 2007 T20 World Cup?",
        options: [
          { text: "MS Dhoni", isCorrect: true },
          { text: "Sourav Ganguly", isCorrect: false },
          { text: "Virat Kohli", isCorrect: false },
          { text: "Rahul Dravid", isCorrect: false }
        ]
      },
      {
        text: "Which country has won the most Cricket World Cups?",
        options: [
          { text: "Australia", isCorrect: true },
          { text: "India", isCorrect: false },
          { text: "England", isCorrect: false },
          { text: "West Indies", isCorrect: false }
        ]
      },
      {
        text: "What is a score of zero called in cricket?",
        options: [
          { text: "Duck", isCorrect: true },
          { text: "Goose", isCorrect: false },
          { text: "Zero Run", isCorrect: false },
          { text: "Drop", isCorrect: false }
        ]
      },
      {
        text: "Which Indian stadium is the largest cricket stadium?",
        options: [
          { text: "Narendra Modi Stadium", isCorrect: true },
          { text: "Eden Gardens", isCorrect: false },
          { text: "Wankhede Stadium", isCorrect: false },
          { text: "Chepauk Stadium", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "Geography",
  subCategories: ["World Geography", "Countries & Capitals"],
  tournament: {
    title: "World Geography Cup",
    description: "Explore continents, countries, and natural wonders.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.MEDIUM,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "Which is the largest continent?",
        options: [
          { text: "Asia", isCorrect: true },
          { text: "Africa", isCorrect: false },
          { text: "Europe", isCorrect: false },
          { text: "North America", isCorrect: false }
        ]
      },
      {
        text: "What is the capital of Japan?",
        options: [
          { text: "Tokyo", isCorrect: true },
          { text: "Seoul", isCorrect: false },
          { text: "Beijing", isCorrect: false },
          { text: "Bangkok", isCorrect: false }
        ]
      },
      {
        text: "Which river is the longest in the world?",
        options: [
          { text: "Nile", isCorrect: true },
          { text: "Amazon", isCorrect: false },
          { text: "Yangtze", isCorrect: false },
          { text: "Mississippi", isCorrect: false }
        ]
      },
      {
        text: "Mount Everest is located in which mountain range?",
        options: [
          { text: "Himalayas", isCorrect: true },
          { text: "Andes", isCorrect: false },
          { text: "Rockies", isCorrect: false },
          { text: "Alps", isCorrect: false }
        ]
      },
      {
        text: "Which country has the largest population?",
        options: [
          { text: "India", isCorrect: true },
          { text: "China", isCorrect: false },
          { text: "USA", isCorrect: false },
          { text: "Indonesia", isCorrect: false }
        ]
      },
      {
        text: "Which desert is the largest in the world?",
        options: [
          { text: "Sahara", isCorrect: true },
          { text: "Gobi", isCorrect: false },
          { text: "Arabian", isCorrect: false },
          { text: "Kalahari", isCorrect: false }
        ]
      },
      {
        text: "Which ocean is the largest?",
        options: [
          { text: "Pacific Ocean", isCorrect: true },
          { text: "Atlantic Ocean", isCorrect: false },
          { text: "Indian Ocean", isCorrect: false },
          { text: "Arctic Ocean", isCorrect: false }
        ]
      },
      {
        text: "What is the capital of Australia?",
        options: [
          { text: "Canberra", isCorrect: true },
          { text: "Sydney", isCorrect: false },
          { text: "Melbourne", isCorrect: false },
          { text: "Perth", isCorrect: false }
        ]
      },
      {
        text: "Which country is known as the Land of the Rising Sun?",
        options: [
          { text: "Japan", isCorrect: true },
          { text: "China", isCorrect: false },
          { text: "Thailand", isCorrect: false },
          { text: "South Korea", isCorrect: false }
        ]
      },
      {
        text: "Which continent has the most countries?",
        options: [
          { text: "Africa", isCorrect: true },
          { text: "Europe", isCorrect: false },
          { text: "Asia", isCorrect: false },
          { text: "South America", isCorrect: false }
        ]
      }
    ]
  }
},
{
  name: "Business",
  subCategories: ["Entrepreneurship", "Finance"],
  tournament: {
    title: "Startup & Business Strategy Cup",
    description: "Test your knowledge of startups, finance, and global business.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.MEDIUM,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "Who is the founder of Amazon?",
        options: [
          { text: "Jeff Bezos", isCorrect: true },
          { text: "Elon Musk", isCorrect: false },
          { text: "Bill Gates", isCorrect: false },
          { text: "Larry Page", isCorrect: false }
        ]
      },
      {
        text: "What does CEO stand for?",
        options: [
          { text: "Chief Executive Officer", isCorrect: true },
          { text: "Corporate Executive Officer", isCorrect: false },
          { text: "Chief Engineering Officer", isCorrect: false },
          { text: "Central Executive Operator", isCorrect: false }
        ]
      },
      {
        text: "Which company created the iPhone?",
        options: [
          { text: "Apple", isCorrect: true },
          { text: "Samsung", isCorrect: false },
          { text: "Google", isCorrect: false },
          { text: "Microsoft", isCorrect: false }
        ]
      },
      {
        text: "What is the main purpose of a business plan?",
        options: [
          { text: "To outline strategy and goals", isCorrect: true },
          { text: "To hire employees", isCorrect: false },
          { text: "To design products", isCorrect: false },
          { text: "To advertise services", isCorrect: false }
        ]
      },
      {
        text: "Which term refers to the money invested in a startup?",
        options: [
          { text: "Capital", isCorrect: true },
          { text: "Salary", isCorrect: false },
          { text: "Revenue", isCorrect: false },
          { text: "Expense", isCorrect: false }
        ]
      },
      {
        text: "Which company is known for the search engine Google?",
        options: [
          { text: "Alphabet", isCorrect: true },
          { text: "Meta", isCorrect: false },
          { text: "Amazon", isCorrect: false },
          { text: "Tesla", isCorrect: false }
        ]
      },
      {
        text: "Profit equals revenue minus:",
        options: [
          { text: "Expenses", isCorrect: true },
          { text: "Assets", isCorrect: false },
          { text: "Capital", isCorrect: false },
          { text: "Sales", isCorrect: false }
        ]
      },
      {
        text: "Which company owns Instagram?",
        options: [
          { text: "Meta", isCorrect: true },
          { text: "Google", isCorrect: false },
          { text: "Twitter", isCorrect: false },
          { text: "Apple", isCorrect: false }
        ]
      },
      {
        text: "What is IPO in business?",
        options: [
          { text: "Initial Public Offering", isCorrect: true },
          { text: "International Profit Order", isCorrect: false },
          { text: "Internal Public Operation", isCorrect: false },
          { text: "Investment Portfolio Option", isCorrect: false }
        ]
      },
      {
        text: "Which country has Wall Street?",
        options: [
          { text: "USA", isCorrect: true },
          { text: "UK", isCorrect: false },
          { text: "Germany", isCorrect: false },
          { text: "Japan", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "Space & Astronomy",
  subCategories: ["Solar System", "Space Exploration"],
  tournament: {
    title: "Solar System Challenge",
    description: "Test your knowledge of planets, stars, and space missions.",
    durationPerQ: 30,
    totalQuestions: 11,
    difficulty: Difficulty.MEDIUM,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "Which planet is known as the Red Planet?",
        options: [
          { text: "Mars", isCorrect: true },
          { text: "Venus", isCorrect: false },
          { text: "Jupiter", isCorrect: false },
          { text: "Mercury", isCorrect: false }
        ]
      },
      {
        text: "What is the largest planet in our solar system?",
        options: [
          { text: "Jupiter", isCorrect: true },
          { text: "Saturn", isCorrect: false },
          { text: "Earth", isCorrect: false },
          { text: "Neptune", isCorrect: false }
        ]
      },
      {
        text: "Which planet is closest to the Sun?",
        options: [
          { text: "Mercury", isCorrect: true },
          { text: "Venus", isCorrect: false },
          { text: "Earth", isCorrect: false },
          { text: "Mars", isCorrect: false }
        ]
      },
      {
        text: "Who was the first human in space?",
        options: [
          { text: "Yuri Gagarin", isCorrect: true },
          { text: "Neil Armstrong", isCorrect: false },
          { text: "Buzz Aldrin", isCorrect: false },
          { text: "Alan Shepard", isCorrect: false }
        ]
      },
      {
        text: "Which galaxy contains our solar system?",
        options: [
          { text: "Milky Way", isCorrect: true },
          { text: "Andromeda", isCorrect: false },
          { text: "Sombrero", isCorrect: false },
          { text: "Whirlpool", isCorrect: false }
        ]
      },
      {
        text: "Which planet has the most prominent ring system?",
        options: [
          { text: "Saturn", isCorrect: true },
          { text: "Jupiter", isCorrect: false },
          { text: "Uranus", isCorrect: false },
          { text: "Neptune", isCorrect: false }
        ]
      },
      {
        text: "Which mission first landed humans on the Moon?",
        options: [
          { text: "Apollo 11", isCorrect: true },
          { text: "Apollo 10", isCorrect: false },
          { text: "Sputnik", isCorrect: false },
          { text: "Artemis", isCorrect: false }
        ]
      },
      {
        text: "What is the name of Earth's natural satellite?",
        options: [
          { text: "Moon", isCorrect: true },
          { text: "Europa", isCorrect: false },
          { text: "Titan", isCorrect: false },
          { text: "Phobos", isCorrect: false }
        ]
      },
      {
        text: "Which planet is known for its Great Red Spot storm?",
        options: [
          { text: "Jupiter", isCorrect: true },
          { text: "Mars", isCorrect: false },
          { text: "Saturn", isCorrect: false },
          { text: "Neptune", isCorrect: false }
        ]
      },
      {
        text: "What force keeps planets in orbit around the Sun?",
        options: [
          { text: "Gravity", isCorrect: true },
          { text: "Magnetism", isCorrect: false },
          { text: "Friction", isCorrect: false },
          { text: "Pressure", isCorrect: false }
        ]
      },
      {
        text: "Which space agency launched the James Webb Space Telescope?",
        options: [
          { text: "NASA", isCorrect: true },
          { text: "ISRO", isCorrect: false },
          { text: "ESA", isCorrect: false },
          { text: "Roscosmos", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "Programming",
  subCategories: ["JavaScript", "Data Structures"],
  tournament: {
    title: "JavaScript Coding Arena",
    description: "Challenge your programming knowledge with JavaScript concepts.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.MEDIUM,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "Which keyword declares a variable in JavaScript?",
        options: [
          { text: "let", isCorrect: true },
          { text: "int", isCorrect: false },
          { text: "string", isCorrect: false },
          { text: "define", isCorrect: false }
        ]
      },
      {
        text: "Which company developed JavaScript?",
        options: [
          { text: "Netscape", isCorrect: true },
          { text: "Microsoft", isCorrect: false },
          { text: "Google", isCorrect: false },
          { text: "Sun Microsystems", isCorrect: false }
        ]
      },
      {
        text: "Which symbol is used for single-line comments in JavaScript?",
        options: [
          { text: "//", isCorrect: true },
          { text: "/* */", isCorrect: false },
          { text: "#", isCorrect: false },
          { text: "<!-- -->", isCorrect: false }
        ]
      },
      {
        text: "Which method converts a string to integer in JavaScript?",
        options: [
          { text: "parseInt()", isCorrect: true },
          { text: "toNumber()", isCorrect: false },
          { text: "parseString()", isCorrect: false },
          { text: "int()", isCorrect: false }
        ]
      },
      {
        text: "Which data structure works on FIFO principle?",
        options: [
          { text: "Queue", isCorrect: true },
          { text: "Stack", isCorrect: false },
          { text: "Tree", isCorrect: false },
          { text: "Graph", isCorrect: false }
        ]
      },
      {
        text: "Which data structure works on LIFO principle?",
        options: [
          { text: "Stack", isCorrect: true },
          { text: "Queue", isCorrect: false },
          { text: "Array", isCorrect: false },
          { text: "Linked List", isCorrect: false }
        ]
      },
      {
        text: "Which JavaScript function prints output to console?",
        options: [
          { text: "console.log()", isCorrect: true },
          { text: "print()", isCorrect: false },
          { text: "log.console()", isCorrect: false },
          { text: "echo()", isCorrect: false }
        ]
      },
      {
        text: "Which keyword is used to define a function?",
        options: [
          { text: "function", isCorrect: true },
          { text: "method", isCorrect: false },
          { text: "define", isCorrect: false },
          { text: "func", isCorrect: false }
        ]
      },
      {
        text: "Which operator checks both value and type?",
        options: [
          { text: "===", isCorrect: true },
          { text: "==", isCorrect: false },
          { text: "=", isCorrect: false },
          { text: "!=", isCorrect: false }
        ]
      },
      {
        text: "Which structure stores key-value pairs in JavaScript?",
        options: [
          { text: "Object", isCorrect: true },
          { text: "Array", isCorrect: false },
          { text: "Stack", isCorrect: false },
          { text: "Queue", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "Cybersecurity",
  subCategories: ["Network Security", "Ethical Hacking"],
  tournament: {
    title: "Cyber Defense Challenge",
    description: "Test your knowledge of cybersecurity concepts and threats.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.HARD,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "What does VPN stand for?",
        options: [
          { text: "Virtual Private Network", isCorrect: true },
          { text: "Virtual Public Network", isCorrect: false },
          { text: "Verified Private Node", isCorrect: false },
          { text: "Virtual Protected Network", isCorrect: false }
        ]
      },
      {
        text: "Which attack floods a server with traffic?",
        options: [
          { text: "DDoS", isCorrect: true },
          { text: "Phishing", isCorrect: false },
          { text: "SQL Injection", isCorrect: false },
          { text: "Brute Force", isCorrect: false }
        ]
      },
      {
        text: "What is phishing?",
        options: [
          { text: "Fraudulent attempt to obtain sensitive data", isCorrect: true },
          { text: "Breaking a password using algorithms", isCorrect: false },
          { text: "Encrypting a message", isCorrect: false },
          { text: "Scanning a network", isCorrect: false }
        ]
      },
      {
        text: "Which protocol secures websites?",
        options: [
          { text: "HTTPS", isCorrect: true },
          { text: "FTP", isCorrect: false },
          { text: "SMTP", isCorrect: false },
          { text: "HTTP", isCorrect: false }
        ]
      },
      {
        text: "What does malware mean?",
        options: [
          { text: "Malicious software", isCorrect: true },
          { text: "Management software", isCorrect: false },
          { text: "Memory software", isCorrect: false },
          { text: "Manual software", isCorrect: false }
        ]
      },
      {
        text: "Which attack tries many password combinations?",
        options: [
          { text: "Brute Force Attack", isCorrect: true },
          { text: "Spoofing", isCorrect: false },
          { text: "Phishing", isCorrect: false },
          { text: "DDoS", isCorrect: false }
        ]
      },
      {
        text: "Which tool is commonly used for penetration testing?",
        options: [
          { text: "Metasploit", isCorrect: true },
          { text: "Photoshop", isCorrect: false },
          { text: "Excel", isCorrect: false },
          { text: "Figma", isCorrect: false }
        ]
      },
      {
        text: "What does firewall do?",
        options: [
          { text: "Blocks unauthorized network access", isCorrect: true },
          { text: "Stores passwords", isCorrect: false },
          { text: "Speeds up internet", isCorrect: false },
          { text: "Encrypts files", isCorrect: false }
        ]
      },
      {
        text: "Which authentication uses two verification steps?",
        options: [
          { text: "Two-factor authentication", isCorrect: true },
          { text: "Single login", isCorrect: false },
          { text: "Password login", isCorrect: false },
          { text: "Guest login", isCorrect: false }
        ]
      },
      {
        text: "Which encryption algorithm is widely used for secure communication?",
        options: [
          { text: "AES", isCorrect: true },
          { text: "MP3", isCorrect: false },
          { text: "JPEG", isCorrect: false },
          { text: "HTML", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "Movies & Entertainment",
  subCategories: ["Hollywood", "Bollywood"],
  tournament: {
    title: "Ultimate Movie Trivia",
    description: "Challenge your knowledge of famous movies and actors.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.EASY,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "Who directed the movie Titanic?",
        options: [
          { text: "James Cameron", isCorrect: true },
          { text: "Steven Spielberg", isCorrect: false },
          { text: "Christopher Nolan", isCorrect: false },
          { text: "Ridley Scott", isCorrect: false }
        ]
      },
      {
        text: "Which movie features the character Iron Man?",
        options: [
          { text: "Avengers", isCorrect: true },
          { text: "Batman", isCorrect: false },
          { text: "Superman", isCorrect: false },
          { text: "Spider-Man", isCorrect: false }
        ]
      },
      {
        text: "Who played Jack in Titanic?",
        options: [
          { text: "Leonardo DiCaprio", isCorrect: true },
          { text: "Brad Pitt", isCorrect: false },
          { text: "Tom Cruise", isCorrect: false },
          { text: "Matt Damon", isCorrect: false }
        ]
      },
      {
        text: "Which Bollywood actor is known as the 'King Khan'?",
        options: [
          { text: "Shah Rukh Khan", isCorrect: true },
          { text: "Salman Khan", isCorrect: false },
          { text: "Aamir Khan", isCorrect: false },
          { text: "Saif Ali Khan", isCorrect: false }
        ]
      },
      {
        text: "Which movie won Best Picture at the Oscars in 2020?",
        options: [
          { text: "Parasite", isCorrect: true },
          { text: "Joker", isCorrect: false },
          { text: "1917", isCorrect: false },
          { text: "Ford v Ferrari", isCorrect: false }
        ]
      },
      {
        text: "Which Bollywood movie features the song 'Jai Ho'?",
        options: [
          { text: "Slumdog Millionaire", isCorrect: true },
          { text: "Dangal", isCorrect: false },
          { text: "3 Idiots", isCorrect: false },
          { text: "Lagaan", isCorrect: false }
        ]
      },
      {
        text: "Who directed the Dark Knight trilogy?",
        options: [
          { text: "Christopher Nolan", isCorrect: true },
          { text: "James Cameron", isCorrect: false },
          { text: "Peter Jackson", isCorrect: false },
          { text: "Quentin Tarantino", isCorrect: false }
        ]
      },
      {
        text: "Which movie features the character Harry Potter?",
        options: [
          { text: "Harry Potter and the Sorcerer's Stone", isCorrect: true },
          { text: "Lord of the Rings", isCorrect: false },
          { text: "Chronicles of Narnia", isCorrect: false },
          { text: "Fantastic Beasts", isCorrect: false }
        ]
      },
      {
        text: "Which Bollywood actor starred in the movie Dangal?",
        options: [
          { text: "Aamir Khan", isCorrect: true },
          { text: "Hrithik Roshan", isCorrect: false },
          { text: "Akshay Kumar", isCorrect: false },
          { text: "Ranbir Kapoor", isCorrect: false }
        ]
      },
      {
        text: "Which movie franchise features the character Luke Skywalker?",
        options: [
          { text: "Star Wars", isCorrect: true },
          { text: "Star Trek", isCorrect: false },
          { text: "Avatar", isCorrect: false },
          { text: "Matrix", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "General Knowledge",
  subCategories: ["Current Affairs", "World Facts"],
  tournament: {
    title: "Global Knowledge Cup",
    description: "Test your awareness about the world and general facts.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.EASY,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "What is the capital of France?",
        options: [
          { text: "Paris", isCorrect: true },
          { text: "Rome", isCorrect: false },
          { text: "Berlin", isCorrect: false },
          { text: "Madrid", isCorrect: false }
        ]
      },
      {
        text: "Which planet is known as the Blue Planet?",
        options: [
          { text: "Earth", isCorrect: true },
          { text: "Mars", isCorrect: false },
          { text: "Venus", isCorrect: false },
          { text: "Neptune", isCorrect: false }
        ]
      },
      {
        text: "Who wrote the play Romeo and Juliet?",
        options: [
          { text: "William Shakespeare", isCorrect: true },
          { text: "Charles Dickens", isCorrect: false },
          { text: "Leo Tolstoy", isCorrect: false },
          { text: "Mark Twain", isCorrect: false }
        ]
      },
      {
        text: "Which is the largest ocean on Earth?",
        options: [
          { text: "Pacific Ocean", isCorrect: true },
          { text: "Atlantic Ocean", isCorrect: false },
          { text: "Indian Ocean", isCorrect: false },
          { text: "Arctic Ocean", isCorrect: false }
        ]
      },
      {
        text: "Which country hosted the 2020 Summer Olympics?",
        options: [
          { text: "Japan", isCorrect: true },
          { text: "China", isCorrect: false },
          { text: "Brazil", isCorrect: false },
          { text: "USA", isCorrect: false }
        ]
      },
      {
        text: "What is the largest mammal?",
        options: [
          { text: "Blue Whale", isCorrect: true },
          { text: "Elephant", isCorrect: false },
          { text: "Giraffe", isCorrect: false },
          { text: "Shark", isCorrect: false }
        ]
      },
      {
        text: "Which language has the most native speakers?",
        options: [
          { text: "Mandarin Chinese", isCorrect: true },
          { text: "English", isCorrect: false },
          { text: "Spanish", isCorrect: false },
          { text: "Hindi", isCorrect: false }
        ]
      },
      {
        text: "Which country is known for the Eiffel Tower?",
        options: [
          { text: "France", isCorrect: true },
          { text: "Italy", isCorrect: false },
          { text: "Spain", isCorrect: false },
          { text: "Germany", isCorrect: false }
        ]
      },
      {
        text: "What is the currency of Japan?",
        options: [
          { text: "Yen", isCorrect: true },
          { text: "Won", isCorrect: false },
          { text: "Dollar", isCorrect: false },
          { text: "Peso", isCorrect: false }
        ]
      },
      {
        text: "Which is the tallest mountain in the world?",
        options: [
          { text: "Mount Everest", isCorrect: true },
          { text: "K2", isCorrect: false },
          { text: "Kangchenjunga", isCorrect: false },
          { text: "Makalu", isCorrect: false }
        ]
      }
    ]
  }
},
{
  name: "Artificial Intelligence",
  subCategories: ["Machine Learning", "Deep Learning"],
  tournament: {
    title: "AI & Machine Learning Challenge",
    description: "Test your understanding of artificial intelligence and ML concepts.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.HARD,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "What does AI stand for?",
        options: [
          { text: "Artificial Intelligence", isCorrect: true },
          { text: "Automated Internet", isCorrect: false },
          { text: "Advanced Interface", isCorrect: false },
          { text: "Artificial Integration", isCorrect: false }
        ]
      },
      {
        text: "Which programming language is widely used in AI?",
        options: [
          { text: "Python", isCorrect: true },
          { text: "HTML", isCorrect: false },
          { text: "CSS", isCorrect: false },
          { text: "PHP", isCorrect: false }
        ]
      },
      {
        text: "Which library is popular for machine learning in Python?",
        options: [
          { text: "Scikit-learn", isCorrect: true },
          { text: "Bootstrap", isCorrect: false },
          { text: "jQuery", isCorrect: false },
          { text: "Laravel", isCorrect: false }
        ]
      },
      {
        text: "Which neural network is used for image recognition?",
        options: [
          { text: "CNN", isCorrect: true },
          { text: "RNN", isCorrect: false },
          { text: "GAN", isCorrect: false },
          { text: "MLP", isCorrect: false }
        ]
      },
      {
        text: "Which AI technique learns from labeled data?",
        options: [
          { text: "Supervised Learning", isCorrect: true },
          { text: "Unsupervised Learning", isCorrect: false },
          { text: "Reinforcement Learning", isCorrect: false },
          { text: "Transfer Learning", isCorrect: false }
        ]
      },
      {
        text: "Which algorithm is used for classification?",
        options: [
          { text: "Decision Tree", isCorrect: true },
          { text: "K-Means", isCorrect: false },
          { text: "Apriori", isCorrect: false },
          { text: "PageRank", isCorrect: false }
        ]
      },
      {
        text: "Which company developed the TensorFlow framework?",
        options: [
          { text: "Google", isCorrect: true },
          { text: "Microsoft", isCorrect: false },
          { text: "Amazon", isCorrect: false },
          { text: "IBM", isCorrect: false }
        ]
      },
      {
        text: "Which model is commonly used for natural language processing?",
        options: [
          { text: "Transformer", isCorrect: true },
          { text: "Linear Regression", isCorrect: false },
          { text: "KNN", isCorrect: false },
          { text: "Naive Bayes", isCorrect: false }
        ]
      },
      {
        text: "Which AI field focuses on human language understanding?",
        options: [
          { text: "NLP", isCorrect: true },
          { text: "Computer Vision", isCorrect: false },
          { text: "Robotics", isCorrect: false },
          { text: "IoT", isCorrect: false }
        ]
      },
      {
        text: "Which algorithm is used for clustering?",
        options: [
          { text: "K-Means", isCorrect: true },
          { text: "SVM", isCorrect: false },
          { text: "Logistic Regression", isCorrect: false },
          { text: "Decision Tree", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "Health & Fitness",
  subCategories: ["Nutrition", "Exercise"],
  tournament: {
    title: "Health & Fitness Quiz",
    description: "Test your knowledge about nutrition, health, and workouts.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.EASY,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "Which vitamin is produced when the skin is exposed to sunlight?",
        options: [
          { text: "Vitamin D", isCorrect: true },
          { text: "Vitamin A", isCorrect: false },
          { text: "Vitamin C", isCorrect: false },
          { text: "Vitamin B12", isCorrect: false }
        ]
      },
      {
        text: "Which nutrient is the main source of energy for the body?",
        options: [
          { text: "Carbohydrates", isCorrect: true },
          { text: "Proteins", isCorrect: false },
          { text: "Vitamins", isCorrect: false },
          { text: "Minerals", isCorrect: false }
        ]
      },
      {
        text: "Which exercise primarily strengthens the chest muscles?",
        options: [
          { text: "Push-ups", isCorrect: true },
          { text: "Squats", isCorrect: false },
          { text: "Lunges", isCorrect: false },
          { text: "Plank", isCorrect: false }
        ]
      },
      {
        text: "How many minutes of moderate exercise is recommended daily?",
        options: [
          { text: "30 minutes", isCorrect: true },
          { text: "10 minutes", isCorrect: false },
          { text: "15 minutes", isCorrect: false },
          { text: "60 minutes", isCorrect: false }
        ]
      },
      {
        text: "Which mineral is essential for strong bones?",
        options: [
          { text: "Calcium", isCorrect: true },
          { text: "Iron", isCorrect: false },
          { text: "Zinc", isCorrect: false },
          { text: "Sodium", isCorrect: false }
        ]
      },
      {
        text: "Which organ pumps blood throughout the body?",
        options: [
          { text: "Heart", isCorrect: true },
          { text: "Liver", isCorrect: false },
          { text: "Kidney", isCorrect: false },
          { text: "Lungs", isCorrect: false }
        ]
      },
      {
        text: "Which exercise improves cardiovascular endurance?",
        options: [
          { text: "Running", isCorrect: true },
          { text: "Weightlifting", isCorrect: false },
          { text: "Stretching", isCorrect: false },
          { text: "Yoga", isCorrect: false }
        ]
      },
      {
        text: "Which nutrient helps build muscles?",
        options: [
          { text: "Protein", isCorrect: true },
          { text: "Carbohydrate", isCorrect: false },
          { text: "Fiber", isCorrect: false },
          { text: "Vitamin C", isCorrect: false }
        ]
      },
      {
        text: "What is the normal human body temperature?",
        options: [
          { text: "37°C", isCorrect: true },
          { text: "35°C", isCorrect: false },
          { text: "39°C", isCorrect: false },
          { text: "32°C", isCorrect: false }
        ]
      },
      {
        text: "Which activity improves flexibility?",
        options: [
          { text: "Yoga", isCorrect: true },
          { text: "Running", isCorrect: false },
          { text: "Cycling", isCorrect: false },
          { text: "Bench press", isCorrect: false }
        ]
      }
    ]
  }
},

{
  name: "Environment",
  subCategories: ["Climate Change", "Wildlife Conservation"],
  tournament: {
    title: "Environment Awareness Quiz",
    description: "Test your knowledge about climate change and conservation.",
    durationPerQ: 30,
    totalQuestions: 10,
    difficulty: Difficulty.MEDIUM,
    totalSeats: 100,
    winningSeats: 10,
    entryFee: 10,
    prizePool: 1000,
    questions: [
      {
        text: "Which gas is the primary contributor to global warming?",
        options: [
          { text: "Carbon Dioxide", isCorrect: true },
          { text: "Oxygen", isCorrect: false },
          { text: "Nitrogen", isCorrect: false },
          { text: "Helium", isCorrect: false }
        ]
      },
      {
        text: "Which energy source is renewable?",
        options: [
          { text: "Solar energy", isCorrect: true },
          { text: "Coal", isCorrect: false },
          { text: "Oil", isCorrect: false },
          { text: "Natural gas", isCorrect: false }
        ]
      },
      {
        text: "What is deforestation?",
        options: [
          { text: "Cutting down forests", isCorrect: true },
          { text: "Planting trees", isCorrect: false },
          { text: "Saving wildlife", isCorrect: false },
          { text: "Recycling waste", isCorrect: false }
        ]
      },
      {
        text: "Which organization works globally for environmental protection?",
        options: [
          { text: "UNEP", isCorrect: true },
          { text: "FIFA", isCorrect: false },
          { text: "NATO", isCorrect: false },
          { text: "WTO", isCorrect: false }
        ]
      },
      {
        text: "Which layer protects Earth from UV radiation?",
        options: [
          { text: "Ozone Layer", isCorrect: true },
          { text: "Troposphere", isCorrect: false },
          { text: "Stratosphere", isCorrect: false },
          { text: "Ionosphere", isCorrect: false }
        ]
      },
      {
        text: "Which animal is considered endangered?",
        options: [
          { text: "Tiger", isCorrect: true },
          { text: "Dog", isCorrect: false },
          { text: "Cow", isCorrect: false },
          { text: "Cat", isCorrect: false }
        ]
      },
      {
        text: "Which process converts waste into reusable material?",
        options: [
          { text: "Recycling", isCorrect: true },
          { text: "Burning", isCorrect: false },
          { text: "Dumping", isCorrect: false },
          { text: "Mining", isCorrect: false }
        ]
      },
      {
        text: "Which gas do plants absorb during photosynthesis?",
        options: [
          { text: "Carbon Dioxide", isCorrect: true },
          { text: "Oxygen", isCorrect: false },
          { text: "Hydrogen", isCorrect: false },
          { text: "Nitrogen", isCorrect: false }
        ]
      },
      {
        text: "Which ecosystem has the highest biodiversity?",
        options: [
          { text: "Rainforest", isCorrect: true },
          { text: "Desert", isCorrect: false },
          { text: "Tundra", isCorrect: false },
          { text: "Grassland", isCorrect: false }
        ]
      },
      {
        text: "What does the 3R principle stand for?",
        options: [
          { text: "Reduce, Reuse, Recycle", isCorrect: true },
          { text: "Read, Write, Run", isCorrect: false },
          { text: "Recover, Restore, Repair", isCorrect: false },
          { text: "Remove, Replace, Return", isCorrect: false }
        ]
      }
    ]
  }
}

]
};