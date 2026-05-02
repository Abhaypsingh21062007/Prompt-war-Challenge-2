# 🗳️ Election Guide AI

Election Guide AI is a premium, production-ready web application designed to empower citizens with unbiased, AI-powered information about the Indian electoral process. Built with **Next.js**, **TypeScript**, and **Framer Motion**, it offers a modern glassmorphism UI with interactive tools to help voters navigate their journey from registration to result day.

---

## ✨ Key Features

- **🎯 AI-Powered Hero**: Cinematic landing experience with animated background elements.
- **📅 Interactive Timeline**: A responsive 6-stage visualization of the entire election journey.
- **📝 Voting Guide**: Step-by-step expandable cards covering the voting process.
- **✅ Eligibility Checker**: Real-time interactive tool to verify voting eligibility in India.
- **📋 Document Hub**: A comprehensive guide to required and valid photo identity documents.
- **📊 Insights & Stats**: Animated infographics for voter turnout and an interactive India map placeholder.
- **🤖 VoteBuddy AI**: A global floating chatbot assistant with a predefined election knowledge base.
- **🌓 Adaptive Theme**: Full dark and light mode support with glassmorphism aesthetics.
- **📱 Responsive & Accessible**: Optimized for all devices and keyboard-accessible navigation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (Pages Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: Custom-built reusable components with `clsx` and `tailwind-merge`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/election-guide-ai.git
   ```
2. Navigate to the project directory:
   ```bash
   cd election-guide-ai
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Folder Structure

```text
election-guide-ai/
├── src/
│   ├── components/
│   │   ├── layout/       # Navbar, Footer, Layout wrapper
│   │   ├── ui/           # Atomic components (Button, Card, Typography)
│   │   └── ...           # Feature components (VoteBuddy, FAQ, etc.)
│   ├── hooks/            # Custom React hooks (useTheme)
│   ├── pages/            # Next.js pages
│   ├── assets/           # Global styles and static assets
│   └── utils/            # Helper functions (cn utility)
├── public/               # Public assets (icons, images)
└── tailwind.config.ts    # Tailwind configuration
```

---

## 📸 Screenshots

| Desktop View | Mobile View |
| :---: | :---: |
| ![Desktop Screenshot Placeholder](https://via.placeholder.com/600x400?text=Desktop+Preview) | ![Mobile Screenshot Placeholder](https://via.placeholder.com/200x400?text=Mobile+Preview) |

---

## 🔮 Future Improvements

- [ ] **Live Election API**: Integrate real-time data from official ECI sources.
- [ ] **Candidate Comparison**: AI-driven tool to compare candidate manifestos side-by-side.
- [ ] **Regional Language Support**: Fully localized content in 22 official Indian languages.
- [ ] **Constituency Search**: Deep-link to local polling stations using geolocation.
- [ ] **Voice Recognition**: Enable hands-free navigation via the voice assistant placeholder.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to help improve democracy through technology.
