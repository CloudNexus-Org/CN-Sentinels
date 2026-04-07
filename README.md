# CN Sentinels - Employee Directory

एक आधुनिक और responsive employee directory application जो CN Sentinels team के सभी सदस्यों की जानकारी प्रदान करती है।

## 🌟 Features

- **Complete Team Directory**: सभी team members की comprehensive information
- **Individual Profile Pages**: हर employee का detailed profile page
- **Advanced Search & Filter**: नाम, पद, विभाग या स्थान के आधार पर खोज
- **Responsive Design**: सभी devices पर perfect display
- **Modern UI/UX**: Glass-morphism और gradient effects के साथ
- **Hindi Language Support**: User-friendly Hindi interface

## 🚀 Technology Stack

- **Frontend**: React.js 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Employee Information Included

हर employee profile में निम्नलिखित जानकारी है:

- 📸 Employee photo/avatar
- 👤 Full name
- 💼 Job title and department
- 📍 Location
- 📞 Contact details (official)
- 📅 Date of joining
- ⏰ Time Zone/Shift
- 🛠️ Key skills and areas of expertise
- 📝 Professional introduction/bio
- 💻 Technical development skills (जहाँ applicable)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (version 14 या उससे ऊपर)
- npm या yarn

### Installation

1. Repository को clone करें:
\`\`\`bash
git clone <repository-url>
cd CN-Sentinels
\`\`\`

2. Dependencies install करें:
\`\`\`bash
npm install
\`\`\`

3. Development server start करें:
\`\`\`bash
npm run dev
\`\`\`

4. Browser में खोलें: `http://localhost:5174`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

## 📱 Usage

### Main Directory Page
- सभी team members की grid view
- Search bar से real-time searching
- Department और location के आधार पर filtering
- Employee cards पर click करके individual profiles देखें

### Individual Profile Pages
- Complete employee information
- Professional skills और expertise
- Technical development skills
- Professional introduction/bio
- Back navigation to main directory

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme
- **Glass Morphism**: Modern translucent design elements
- **Smooth Animations**: Fade-in और slide-in effects
- **Hover Effects**: Interactive card animations
- **Gradient Accents**: Beautiful color gradients
- **Responsive Layout**: Mobile-first design approach

## 👥 Team Members Included

Current directory में 30+ team members शामिल हैं:

### Leadership Team
- Kaustubh Singh (Founder & CEO)
- Yash Singh (CTO)

### Development Team
- Team Leads और Senior Developers
- Software Development Engineers (SDE-1)
- Software Development Engineer Interns
- Software Development Engineer Trainees

### Business Operations
- Revenue Operations (RevOps) team

## 🔧 Customization

### Adding New Employees
`src/data/employees.js` file में new employee objects add करें:

\`\`\`javascript
{
  id: 'unique-id',
  name: 'Employee Name',
  jobTitle: 'Job Title',
  department: 'Department',
  location: 'Location',
  contact: 'Contact Info',
  dateOfJoining: 'DD MMM YYYY',
  timeZone: 'Shift Time',
  avatar: '🤵', // Emoji or image path
  keySkills: ['Skill 1', 'Skill 2'],
  professionalIntro: 'Bio text...',
  technicalSkills: [
    { category: 'Category', skills: 'Skills list' }
  ]
}
\`\`\`

### Styling Modifications
- `src/App.css` - Main component styles
- `src/index.css` - Global styles और utilities

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - आप इस project को freely use, modify और distribute कर सकते हैं।

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

किसी भी प्रकार की सहायता के लिए CN Sentinels team से संपर्क करें।

---

**Made with ❤️ by CN Sentinels Team**
