import React, { useState } from 'react';

// ==================== ADMIN FLOW IMPORTS ====================
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Analytics from './Components/Admin/Analytics';
import ComplaintList from './Components/Admin/ComplaintList';
import ComplaintDetail from './Components/Admin/ComplaintDetail';
import DepartmentFilter from './Components/Admin/DepartmentFilter';
import UpdateStatus from './Components/Admin/UpdateStatus';

/**
 * SUVIDHA - Government Public Service Kiosk Application 
 */
function App() {
  // ==================== STATE MANAGEMENT ====================
  const [screen, setScreen] = useState('welcome');
  const [language, setLanguage] = useState('en');
  const [userData, setUserData] = useState({
    department: '',
    service: '',
    name: '',
    mobile: '',
    problem: ''
  });
  const [token, setToken] = useState('');
  const [userType, setUserType] = useState(null);
  const [adminAuth, setAdminAuth] = useState(null);
  
  // OTP verification states
  const [otpMobile, setOtpMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // ==================== MULTILINGUAL TRANSLATIONS ====================
  const translations = {
    en: {
      welcome: 'Welcome to SUVIDHA',
      welcomeSubtitle: 'Government Public Service Kiosk',
      start: 'Start',
      selectLanguage: 'Select Your Language',
      selectRole: 'Please select your role',
      selectDepartment: 'Select Department',
      selectService: 'Select Service',
      fillForm: 'Fill Your Details',
      confirm: 'Confirm Your Details',
      receipt: 'Your Request is Submitted',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      home: 'Home',
      iAmCitizen: 'I am a Citizen',
      iAmAdmin: 'I am an Admin',
      electricity: 'Electricity',
      water: 'Water Supply',
      gas: 'Gas',
      municipal: 'Municipal Services',
      complaint: 'Register Complaint',
      newApplication: 'New Application',
      trackStatus: 'Track Status',
      name: 'Full Name',
      mobile: 'Mobile Number',
      problem: 'Describe Your Problem / Request',
      reviewDetails: 'Please review your details',
      department: 'Department',
      service: 'Service',
      tokenNumber: 'Token Number',
      smsMessage: 'SMS sent to your mobile number',
      thankYou: 'Thank you for using SUVIDHA',
      keepToken: 'Please keep this token for reference',
      // OTP Screen
      otpVerification: 'Mobile Verification',
      enterMobile: 'Enter Your Mobile Number',
      sendOtp: 'Send OTP',
      enterOtp: 'Enter 6-Digit OTP',
      otpSentMessage: 'OTP has been sent to your mobile',
      verify: 'Verify OTP',
      resendOtp: 'Resend OTP',
      invalidOtp: 'Invalid OTP. Please try again.',
      mobileRequired: 'Please enter mobile number',
      invalidMobile: 'Please enter valid 10-digit mobile number'
    },
    hi: {
      welcome: 'SUVIDHA में आपका स्वागत है',
      welcomeSubtitle: 'सरकारी सार्वजनिक सेवा केंद्र',
      start: 'शुरू करें',
      selectLanguage: 'अपनी भाषा चुनें',
      selectRole: 'कृपया अपनी भूमिका चुनें',
      selectDepartment: 'विभाग चुनें',
      selectService: 'सेवा चुनें',
      fillForm: 'अपना विवरण भरें',
      confirm: 'अपना विवरण सत्यापित करें',
      receipt: 'आपका अनुरोध जमा हो गया है',
      back: 'पीछे',
      next: 'आगे',
      submit: 'जमा करें',
      home: 'होम',
      iAmCitizen: 'मैं नागरिक हूं',
      iAmAdmin: 'मैं व्यवस्थापक हूं',
      electricity: 'बिजली',
      water: 'जल आपूर्ति',
      gas: 'गैस',
      municipal: 'नगरपालिका सेवाएं',
      complaint: 'शिकायत दर्ज करें',
      newApplication: 'नया आवेदन',
      trackStatus: 'स्थिति ट्रैक करें',
      name: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      problem: 'अपनी समस्या / अनुरोध का विवरण दें',
      reviewDetails: 'कृपया अपना विवरण जांचें',
      department: 'विभाग',
      service: 'सेवा',
      tokenNumber: 'टोकन नंबर',
      smsMessage: 'आपके मोबाइल नंबर पर SMS भेजा गया',
      thankYou: 'SUVIDHA का उपयोग करने के लिए धन्यवाद',
      keepToken: 'कृपया इस टोकन को संदर्भ के लिए रखें',
      // OTP Screen
      otpVerification: 'मोबाइल सत्यापन',
      enterMobile: 'अपना मोबाइल नंबर दर्ज करें',
      sendOtp: 'OTP भेजें',
      enterOtp: '6 अंकों का OTP दर्ज करें',
      otpSentMessage: 'आपके मोबाइल पर OTP भेजा गया है',
      verify: 'OTP सत्यापित करें',
      resendOtp: 'OTP पुनः भेजें',
      invalidOtp: 'गलत OTP। कृपया पुनः प्रयास करें।',
      mobileRequired: 'कृपया मोबाइल नंबर दर्ज करें',
      invalidMobile: 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें'
    },
    bn: {
      welcome: 'সুবিধায় স্বাগতম',
      welcomeSubtitle: 'সরকারি জনসেবা কেন্দ্র',
      start: 'শুরু করুন',
      selectLanguage: 'আপনার ভাষা নির্বাচন করুন',
      selectRole: 'আপনার ভূমিকা নির্বাচন করুন',
      selectDepartment: 'বিভাগ নির্বাচন করুন',
      selectService: 'সেবা নির্বাচন করুন',
      fillForm: 'আপনার বিবরণ পূরণ করুন',
      confirm: 'আপনার বিবরণ নিশ্চিত করুন',
      receipt: 'আপনার অনুরোধ জমা হয়েছে',
      back: 'পিছনে',
      next: 'পরবর্তী',
      submit: 'জমা দিন',
      home: 'হোম',
      iAmCitizen: 'আমি নাগরিক',
      iAmAdmin: 'আমি প্রশাসক',
      electricity: 'বিদ্যুৎ',
      water: 'জল সরবরাহ',
      gas: 'গ্যাস',
      municipal: 'পৌর সেবা',
      complaint: 'অভিযোগ নিবন্ধন করুন',
      newApplication: 'নতুন আবেদন',
      trackStatus: 'স্ট্যাটাস ট্র্যাক করুন',
      name: 'পুরো নাম',
      mobile: 'মোবাইল নম্বর',
      problem: 'আপনার সমস্যা / অনুরোধ বর্ণনা করুন',
      reviewDetails: 'আপনার বিবরণ পর্যালোচনা করুন',
      department: 'বিভাগ',
      service: 'সেবা',
      tokenNumber: 'টোকেন নম্বর',
      smsMessage: 'আপনার মোবাইল নম্বরে SMS পাঠানো হয়েছে',
      thankYou: 'সুবিধা ব্যবহারের জন্য ধন্যবাদ',
      keepToken: 'রেফারেন্সের জন্য এই টোকেন রাখুন',
      otpVerification: 'মোবাইল যাচাইকরণ',
      enterMobile: 'আপনার মোবাইল নম্বর লিখুন',
      sendOtp: 'OTP পাঠান',
      enterOtp: '৬ সংখ্যার OTP লিখুন',
      otpSentMessage: 'আপনার মোবাইলে OTP পাঠানো হয়েছে',
      verify: 'OTP যাচাই করুন',
      resendOtp: 'OTP পুনরায় পাঠান',
      invalidOtp: 'ভুল OTP। আবার চেষ্টা করুন।',
      mobileRequired: 'মোবাইল নম্বর লিখুন',
      invalidMobile: '১০ সংখ্যার বৈধ মোবাইল নম্বর লিখুন'
    },
    te: {
      welcome: 'సువిధకు స్వాగతం',
      welcomeSubtitle: 'ప్రభుత్వ ప్రజా సేవా కేంద్రం',
      start: 'ప్రారంభించండి',
      selectLanguage: 'మీ భాషను ఎంచుకోండి',
      selectRole: 'దయచేసి మీ పాత్రను ఎంచుకోండి',
      selectDepartment: 'విభాగాన్ని ఎంచుకోండి',
      selectService: 'సేవను ఎంచుకోండి',
      fillForm: 'మీ వివరాలను పూరించండి',
      confirm: 'మీ వివరాలను నిర్ధారించండి',
      receipt: 'మీ అభ్యర్థన సమర్పించబడింది',
      back: 'వెనుకకు',
      next: 'తదుపరి',
      submit: 'సమర్పించండి',
      home: 'హోం',
      iAmCitizen: 'నేను పౌరుడను',
      iAmAdmin: 'నేను నిర్వాహకుడను',
      electricity: 'విద్యుత్',
      water: 'నీటి సరఫరా',
      gas: 'గ్యాస్',
      municipal: 'మునిసిపల్ సేవలు',
      complaint: 'ఫిర్యాదు నమోదు చేయండి',
      newApplication: 'కొత్త దరఖాస్తు',
      trackStatus: 'స్థితిని ట్రాక్ చేయండి',
      name: 'పూర్తి పేరు',
      mobile: 'మొబైల్ నంబర్',
      problem: 'మీ సమస్య / అభ్యర్థనను వివరించండి',
      reviewDetails: 'దయచేసి మీ వివరాలను సమీక్షించండి',
      department: 'విభాగం',
      service: 'సేవ',
      tokenNumber: 'టోకెన్ నంబర్',
      smsMessage: 'మీ మొబైల్ నంబర్‌కు SMS పంపబడింది',
      thankYou: 'సువిధను ఉపయోగించినందుకు ధన్యవాదాలు',
      keepToken: 'రిఫరెన్స్ కోసం ఈ టోకెన్‌ను ఉంచండి',
      otpVerification: 'మొబైల్ ధృవీకరణ',
      enterMobile: 'మీ మొబైల్ నంబర్ నమోదు చేయండి',
      sendOtp: 'OTP పంపండి',
      enterOtp: '6 అంకెల OTP నమోదు చేయండి',
      otpSentMessage: 'మీ మొబైల్‌కు OTP పంపబడింది',
      verify: 'OTP ధృవీకరించండి',
      resendOtp: 'OTP మళ్లీ పంపండి',
      invalidOtp: 'తప్పు OTP. మళ్లీ ప్రయత్నించండి.',
      mobileRequired: 'మొబైల్ నంబర్ నమోదు చేయండి',
      invalidMobile: '10 అంకెల చెల్లుబాటు అయ్యే మొబైల్ నంబర్ నమోదు చేయండి'
    },
    mr: {
      welcome: 'SUVIDHA मध्ये आपले स्वागत आहे',
      welcomeSubtitle: 'सरकारी सार्वजनिक सेवा केंद्र',
      start: 'सुरू करा',
      selectLanguage: 'आपली भाषा निवडा',
      selectRole: 'कृपया आपली भूमिका निवडा',
      selectDepartment: 'विभाग निवडा',
      selectService: 'सेवा निवडा',
      fillForm: 'आपला तपशील भरा',
      confirm: 'आपला तपशील पडताळा',
      receipt: 'आपली विनंती सबमिट केली आहे',
      back: 'मागे',
      next: 'पुढे',
      submit: 'सबमिट करा',
      home: 'होम',
      iAmCitizen: 'मी नागरिक आहे',
      iAmAdmin: 'मी प्रशासक आहे',
      electricity: 'वीज',
      water: 'पाणी पुरवठा',
      gas: 'गॅस',
      municipal: 'नगरपालिका सेवा',
      complaint: 'तक्रार नोंदवा',
      newApplication: 'नवीन अर्ज',
      trackStatus: 'स्थिती ट्रॅक करा',
      name: 'पूर्ण नाव',
      mobile: 'मोबाइल नंबर',
      problem: 'आपली समस्या / विनंती वर्णन करा',
      reviewDetails: 'कृपया आपला तपशील तपासा',
      department: 'विभाग',
      service: 'सेवा',
      tokenNumber: 'टोकन क्रमांक',
      smsMessage: 'आपल्या मोबाइल नंबरवर SMS पाठवला',
      thankYou: 'SUVIDHA वापरल्याबद्दल धन्यवाद',
      keepToken: 'कृपया हे टोकन संदर्भासाठी ठेवा',
      otpVerification: 'मोबाइल पडताळणी',
      enterMobile: 'आपला मोबाइल नंबर प्रविष्ट करा',
      sendOtp: 'OTP पाठवा',
      enterOtp: '६ अंकी OTP प्रविष्ट करा',
      otpSentMessage: 'आपल्या मोबाइलवर OTP पाठवला आहे',
      verify: 'OTP पडताळा',
      resendOtp: 'OTP पुन्हा पाठवा',
      invalidOtp: 'चुकीचा OTP. कृपया पुन्हा प्रयत्न करा.',
      mobileRequired: 'कृपया मोबाइल नंबर प्रविष्ट करा',
      invalidMobile: 'कृपया १० अंकी वैध मोबाइल नंबर प्रविष्ट करा'
    },
    ta: {
      welcome: 'சுவிதாவுக்கு வரவேற்கிறோம்',
      welcomeSubtitle: 'அரசு பொது சேவை மையம்',
      start: 'தொடங்கு',
      selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
      selectRole: 'உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்',
      selectDepartment: 'துறையைத் தேர்ந்தெடுக்கவும்',
      selectService: 'சேவையைத் தேர்ந்தெடுக்கவும்',
      fillForm: 'உங்கள் விவரங்களை நிரப்பவும்',
      confirm: 'உங்கள் விவரங்களை உறுதிப்படுத்தவும்',
      receipt: 'உங்கள் கோரிக்கை சமர்ப்பிக்கப்பட்டது',
      back: 'பின்னால்',
      next: 'அடுத்து',
      submit: 'சமர்ப்பிக்கவும்',
      home: 'முகப்பு',
      iAmCitizen: 'நான் குடிமகன்',
      iAmAdmin: 'நான் நிர்வாகி',
      electricity: 'மின்சாரம்',
      water: 'நீர் வழங்கல்',
      gas: 'எரிவாயு',
      municipal: 'நகராட்சி சேவைகள்',
      complaint: 'புகார் பதிவு செய்யவும்',
      newApplication: 'புதிய விண்ணப்பம்',
      trackStatus: 'நிலையைக் கண்காணிக்கவும்',
      name: 'முழு பெயர்',
      mobile: 'மொபைல் எண்',
      problem: 'உங்கள் பிரச்சனை / கோரிக்கையை விவரிக்கவும்',
      reviewDetails: 'உங்கள் விவரங்களைப் பார்வையிடவும்',
      department: 'துறை',
      service: 'சேவை',
      tokenNumber: 'டோக்கன் எண்',
      smsMessage: 'உங்கள் மொபைல் எண்ணுக்கு SMS அனுப்பப்பட்டது',
      thankYou: 'சுவிதாவைப் பயன்படுத்தியதற்கு நன்றி',
      keepToken: 'குறிப்புக்காக இந்த டோக்கனை வைத்திருக்கவும்',
      otpVerification: 'மொபைல் சரிபார்ப்பு',
      enterMobile: 'உங்கள் மொபைல் எண்ணை உள்ளிடவும்',
      sendOtp: 'OTP அனுப்பவும்',
      enterOtp: '6 இலக்க OTP உள்ளிடவும்',
      otpSentMessage: 'உங்கள் மொபைலுக்கு OTP அனுப்பப்பட்டது',
      verify: 'OTP சரிபார்க்கவும்',
      resendOtp: 'OTP மீண்டும் அனுப்பவும்',
      invalidOtp: 'தவறான OTP. மீண்டும் முயற்சிக்கவும்.',
      mobileRequired: 'மொபைல் எண்ணை உள்ளிடவும்',
      invalidMobile: '10 இலக்க சரியான மொபைல் எண்ணை உள்ளிடவும்'
    },
    gu: {
      welcome: 'સુવિધામાં આપનું સ્વાગત છે',
      welcomeSubtitle: 'સરકારી જાહેર સેવા કેન્દ્ર',
      start: 'શરૂ કરો',
      selectLanguage: 'તમારી ભાષા પસંદ કરો',
      selectRole: 'કૃપા કરીને તમારી ભૂમિકા પસંદ કરો',
      selectDepartment: 'વિભાગ પસંદ કરો',
      selectService: 'સેવા પસંદ કરો',
      fillForm: 'તમારી વિગતો ભરો',
      confirm: 'તમારી વિગતો પુષ્ટિ કરો',
      receipt: 'તમારી વિનંતી સબમિટ થઈ ગઈ છે',
      back: 'પાછળ',
      next: 'આગળ',
      submit: 'સબમિટ કરો',
      home: 'હોમ',
      iAmCitizen: 'હું નાગરિક છું',
      iAmAdmin: 'હું વ્યવસ્થાપક છું',
      electricity: 'વીજળી',
      water: 'પાણી પુરવઠો',
      gas: 'ગેસ',
      municipal: 'મ્યુનિસિપલ સેવાઓ',
      complaint: 'ફરિયાદ નોંધાવો',
      newApplication: 'નવી અરજી',
      trackStatus: 'સ્થિતિ ટ્રેક કરો',
      name: 'પૂરું નામ',
      mobile: 'મોબાઈલ નંબર',
      problem: 'તમારી સમસ્યા / વિનંતીનું વર્ણન કરો',
      reviewDetails: 'કૃપા કરીને તમારી વિગતો તપાસો',
      department: 'વિભાગ',
      service: 'સેવા',
      tokenNumber: 'ટોકન નંબર',
      smsMessage: 'તમારા મોબાઈલ નંબર પર SMS મોકલ્યો',
      thankYou: 'સુવિધાનો ઉપયોગ કરવા બદલ આભાર',
      keepToken: 'કૃપા કરીને સંદર્ભ માટે આ ટોકન રાખો',
      otpVerification: 'મોબાઇલ ચકાસણી',
      enterMobile: 'તમારો મોબાઇલ નંબર દાખલ કરો',
      sendOtp: 'OTP મોકલો',
      enterOtp: '6 અંકનો OTP દાખલ કરો',
      otpSentMessage: 'તમારા મોબાઇલ પર OTP મોકલવામાં આવ્યો છે',
      verify: 'OTP ચકાસો',
      resendOtp: 'OTP ફરીથી મોકલો',
      invalidOtp: 'ખોટો OTP. કૃપા કરીને ફરી પ્રયાસ કરો.',
      mobileRequired: 'કૃપા કરીને મોબાઇલ નંબર દાખલ કરો',
      invalidMobile: 'કૃપા કરીને 10 અંકનો માન્ય મોબાઇલ નંબર દાખલ કરો'
    }
  };

  const t = translations[language] || translations.en;

  // ==================== HELPER FUNCTIONS ====================
  const generateToken = () => 'SUV' + Math.floor(10000000 + Math.random() * 90000000);

  const selectDepartment = (dept) => {
    setUserData({ ...userData, department: dept });
    setScreen('service');
  };

  const selectService = (service) => {
    setUserData({ ...userData, service: service });
    setScreen('form');
  };

  const handleFormSubmit = () => {
    if (!userData.name || !userData.mobile || !userData.problem) {
      alert(t.mobileRequired || 'Please fill all fields');
      return;
    }
    if (userData.mobile.length !== 10) {
      alert(t.invalidMobile || 'Please enter valid 10-digit mobile number');
      return;
    }
    setScreen('confirm');
  };

  const handleConfirm = () => {
    const newToken = generateToken();
    setToken(newToken);
    setScreen('receipt');
  };

  const resetApp = () => {
    setScreen('welcome');
    setLanguage('en');
    setUserData({ department: '', service: '', name: '', mobile: '', problem: '' });
    setToken('');
    setUserType(null);
    setAdminAuth(null);
    setOtpMobile('');
    setOtp(['', '', '', '', '', '']);
    setGeneratedOtp('');
    setOtpSent(false);
  };

  // ==================== OTP FUNCTIONS ====================
  const handleSendOtp = () => {
    if (!otpMobile) {
      alert(t.mobileRequired);
      return;
    }
    if (otpMobile.length !== 10) {
      alert(t.invalidMobile);
      return;
    }
    
    // Generate 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    
    // Show OTP in console (in production, this would be sent via SMS)
    console.log('Generated OTP:', newOtp);
    alert(`OTP sent to ${otpMobile}: ${newOtp}\n\n(In production, this will be sent via SMS)`);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === generatedOtp) {
      // OTP is correct
      setScreen('department');
    } else {
      alert(t.invalidOtp);
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    }
  };

  // ==================== TEXT-TO-SPEECH FUNCTION ====================
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' :
                       language === 'hi' ? 'hi-IN' :
                       language === 'bn' ? 'bn-IN' :
                       language === 'te' ? 'te-IN' :
                       language === 'mr' ? 'mr-IN' :
                       language === 'ta' ? 'ta-IN' :
                       language === 'gu' ? 'gu-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // ==================== STYLES ====================
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    screenContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '50px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      maxWidth: '900px',
      width: '100%',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    title: {
      fontSize: '56px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '20px',
      textAlign: 'center',
      letterSpacing: '2px'
    },
    subtitle: {
      fontSize: '28px',
      color: '#475569',
      marginBottom: '50px',
      textAlign: 'center',
      fontWeight: '500'
    },
    sectionTitle: {
      fontSize: '40px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '40px',
      textAlign: 'center'
    },
    button: {
      padding: '25px 50px',
      fontSize: '28px',
      fontWeight: 'bold',
      borderRadius: '15px',
      border: 'none',
      cursor: 'pointer',
      margin: '15px',
      minWidth: '280px',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px'
    },
    languageButton: {
      padding: '30px 40px',
      fontSize: '32px',
      fontWeight: 'bold',
      borderRadius: '15px',
      border: '3px solid #2563eb',
      cursor: 'pointer',
      margin: '12px',
      minWidth: '320px',
      backgroundColor: '#ffffff',
      color: '#2563eb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    },
    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '25px',
      marginBottom: '40px',
      width: '100%'
    },
    backButton: {
      padding: '20px 40px',
      fontSize: '24px',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: '2px solid #64748b',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#64748b',
      minWidth: '180px'
    },
    ttsIcon: { fontSize: '28px' },
    // OTP Styles
    otpContainer: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      marginBottom: '30px'
    },
    otpInput: {
      width: '70px',
      height: '80px',
      fontSize: '36px',
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: '12px',
      border: '3px solid #cbd5e1',
      outline: 'none',
      transition: 'border-color 0.3s ease'
    },
    govtButton: {
      padding: '18px 40px',
      fontSize: '22px',
      fontWeight: '600',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#1e40af',
      color: '#ffffff',
      boxShadow: '0 2px 8px rgba(30,64,175,0.3)',
      transition: 'all 0.3s ease',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    infoBox: {
      backgroundColor: '#dbeafe',
      border: '2px solid #3b82f6',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '30px',
      width: '100%',
      maxWidth: '600px'
    },
    infoText: {
      color: '#1e40af',
      fontSize: '18px',
      textAlign: 'center',
      margin: 0
    }
  };

  // ==================== MAIN RENDER ====================
  return (
    <div style={styles.container}>

      {/* ─── WELCOME ──────────────────────────────────────── */}
      {screen === 'welcome' && (
        <div style={styles.screenContainer}>
          <h1 style={styles.title}>🏛️ SUVIDHA</h1>
          <p style={styles.subtitle}>{t.welcomeSubtitle}</p>
          <button
            style={styles.button}
            onClick={() => setScreen('language')}
          >
            <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(t.start); }}>🔊</span>
            {t.start}
          </button>
        </div>
      )}

      {/* ─── LANGUAGE SELECTION ────────────────────────────── */}
      {screen === 'language' && (
        <div style={styles.screenContainer}>
          <h2 style={styles.sectionTitle}>{t.selectLanguage}</h2>
          <div style={styles.buttonGrid}>
            {[
              { code: 'en', name: 'English' },
              { code: 'hi', name: 'हिंदी' },
              { code: 'bn', name: 'বাংলা' },
              { code: 'te', name: 'తెలుగు' },
              { code: 'mr', name: 'मराठी' },
              { code: 'ta', name: 'தமிழ்' },
              { code: 'gu', name: 'ગુજરાતી' }
            ].map((lang) => (
              <button
                key={lang.code}
                style={{
                  ...styles.languageButton,
                  backgroundColor: language === lang.code ? '#2563eb' : '#ffffff',
                  color: language === lang.code ? '#ffffff' : '#2563eb'
                }}
                onClick={() => {
                  setLanguage(lang.code);
                  setScreen('roleSelection');
                }}
              >
                <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(lang.name); }}>🔊</span>
                {lang.name}
              </button>
            ))}
          </div>
          <button style={styles.backButton} onClick={() => setScreen('welcome')}>
            ← {t.back}
          </button>
        </div>
      )}

      {/* ─── ROLE SELECTION ────────────────────────────────── */}
      {screen === 'roleSelection' && (
        <div style={styles.screenContainer}>
          <h2 style={styles.sectionTitle}>{t.welcome}</h2>
          <p style={styles.subtitle}>{t.selectRole}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', maxWidth: '600px', margin: '40px 0' }}>
            <button
              style={{ ...styles.button, backgroundColor: '#22c55e', padding: '30px', fontSize: '32px' }}
              onClick={() => setScreen('otpVerification')}
            >
              <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(t.iAmCitizen); }}>🔊</span>
              {t.iAmCitizen}
            </button>

            <button
              style={{ ...styles.button, backgroundColor: '#8b5cf6', padding: '30px', fontSize: '32px' }}
              onClick={() => setScreen('adminLogin')}
            >
              <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(t.iAmAdmin); }}>🔊</span>
              {t.iAmAdmin}
            </button>
          </div>

          <button style={styles.backButton} onClick={() => setScreen('language')}>
            <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(t.back); }}>🔊</span>
            ← {t.back}
          </button>
        </div>
      )}

      {/* ─── OTP VERIFICATION ──────────────────────────────── */}
      {screen === 'otpVerification' && (
        <div style={styles.screenContainer}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.ttsIcon} onClick={() => speak(t.otpVerification)}>🔊</span>
            {t.otpVerification}
          </h2>

          {!otpSent ? (
            // Mobile Number Entry
            <div style={{ width: '100%', maxWidth: '600px' }}>
              <div style={{ marginBottom: '40px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#1e3a8a', 
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  {t.enterMobile}
                </label>
                <input
                  type="tel"
                  maxLength="10"
                  style={{ 
                    width: '100%', 
                    padding: '25px', 
                    fontSize: '28px', 
                    textAlign: 'center',
                    borderRadius: '12px', 
                    border: '3px solid #cbd5e1',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                  }}
                  value={otpMobile}
                  onChange={(e) => setOtpMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit number"
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
                <button 
                  style={styles.backButton} 
                  onClick={() => setScreen('roleSelection')}
                >
                  ← {t.back}
                </button>
                <button
                  style={styles.govtButton}
                  onClick={handleSendOtp}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1e40af'}
                >
                  📱 {t.sendOtp}
                </button>
              </div>
            </div>
          ) : (
            // OTP Entry
            <div style={{ width: '100%', maxWidth: '700px' }}>
              <div style={styles.infoBox}>
                <p style={styles.infoText}>
                  ✅ {t.otpSentMessage}: {otpMobile}
                </p>
              </div>

              <label style={{ 
                display: 'block', 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#1e3a8a', 
                marginBottom: '25px',
                textAlign: 'center'
              }}>
                {t.enterOtp}
              </label>

              <div style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    style={{
                      ...styles.otpInput,
                      borderColor: digit ? '#2563eb' : '#cbd5e1'
                    }}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = digit ? '#2563eb' : '#cbd5e1'}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
                <button
                  style={{...styles.govtButton, backgroundColor: '#64748b'}}
                  onClick={handleSendOtp}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#475569'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#64748b'}
                >
                  🔄 {t.resendOtp}
                </button>
                <button
                  style={styles.govtButton}
                  onClick={handleVerifyOtp}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1e40af'}
                >
                  ✓ {t.verify}
                </button>
              </div>

              <button 
                style={{...styles.backButton, marginTop: '30px'}} 
                onClick={() => {
                  setOtpSent(false);
                  setOtp(['', '', '', '', '', '']);
                }}
              >
                ← {t.back}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── USER FLOW ─────────────────────────────────────── */}
      {screen === 'department' && (
        <div style={styles.screenContainer}>
          <h2 style={styles.sectionTitle}>{t.selectDepartment}</h2>
          <div style={styles.buttonGrid}>
            {[
              { id: 'electricity', icon: '⚡', label: t.electricity },
              { id: 'water', icon: '💧', label: t.water },
              { id: 'gas', icon: '🔥', label: t.gas },
              { id: 'municipal', icon: '🏢', label: t.municipal }
            ].map((dept) => (
              <button
                key={dept.id}
                style={styles.button}
                onClick={() => {
                  setUserData({ ...userData, department: dept.label });
                  setScreen('service');
                }}
              >
                <span style={{ fontSize: '40px' }}>{dept.icon}</span>
                <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(dept.label); }}>🔊</span>
                {dept.label}
              </button>
            ))}
          </div>
          <button style={styles.backButton} onClick={() => setScreen('roleSelection')}>
            ← {t.back}
          </button>
        </div>
      )}

      {/* ─── SERVICE, FORM, CONFIRM, RECEIPT ──────────────── */}
      {screen === 'service' && (
        <div style={styles.screenContainer}>
          <h2 style={styles.sectionTitle}>{t.selectService}</h2>
          <div style={styles.buttonGrid}>
            {[
              { id: 'complaint', icon: '📝', label: t.complaint },
              { id: 'newApplication', icon: '📄', label: t.newApplication },
              { id: 'trackStatus', icon: '🔍', label: t.trackStatus }
            ].map((srv) => (
              <button
                key={srv.id}
                style={styles.button}
                onClick={() => {
                  setUserData({ ...userData, service: srv.label });
                  setScreen('form');
                }}
              >
                <span style={{ fontSize: '40px' }}>{srv.icon}</span>
                <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(srv.label); }}>🔊</span>
                {srv.label}
              </button>
            ))}
          </div>
          <button style={styles.backButton} onClick={() => setScreen('department')}>
            ← {t.back}
          </button>
        </div>
      )}

      {screen === 'form' && (
        <div style={styles.screenContainer}>
          <h2 style={styles.sectionTitle}>{t.fillForm}</h2>
          <div style={{ width: '100%', maxWidth: '700px' }}>
            <div style={{ marginBottom: '35px' }}>
              <label style={{ display: 'block', fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '12px' }}>
                <span style={styles.ttsIcon} onClick={() => speak(t.name)}>🔊</span> {t.name}
              </label>
              <input
                type="text"
                style={{ width: '100%', padding: '20px', fontSize: '26px', borderRadius: '10px', border: '3px solid #cbd5e1' }}
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '35px' }}>
              <label style={{ display: 'block', fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '12px' }}>
                <span style={styles.ttsIcon} onClick={() => speak(t.mobile)}>🔊</span> {t.mobile}
              </label>
              <input
                type="tel"
                maxLength="10"
                style={{ width: '100%', padding: '20px', fontSize: '26px', borderRadius: '10px', border: '3px solid #cbd5e1' }}
                value={userData.mobile}
                onChange={(e) => setUserData({ ...userData, mobile: e.target.value.replace(/\D/g, '') })}
              />
            </div>

            <div style={{ marginBottom: '35px' }}>
              <label style={{ display: 'block', fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '12px' }}>
                <span style={styles.ttsIcon} onClick={() => speak(t.problem)}>🔊</span> {t.problem}
              </label>
              <textarea
                style={{ width: '100%', padding: '20px', fontSize: '26px', borderRadius: '10px', border: '3px solid #cbd5e1', minHeight: '180px' }}
                value={userData.problem}
                onChange={(e) => setUserData({ ...userData, problem: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button style={styles.backButton} onClick={() => setScreen('service')}>
                ← {t.back}
              </button>
              <button
                style={{ ...styles.button, minWidth: '200px' }}
                onClick={handleFormSubmit}
              >
                <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(t.next); }}>🔊</span>
                {t.next}
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === 'confirm' && (
        <div style={styles.screenContainer}>
          <h2 style={styles.sectionTitle}>{t.confirm}</h2>
          <p style={{ fontSize: '24px', color: '#64748b', marginBottom: '30px' }}>
            {t.reviewDetails}
          </p>
          <div style={{ backgroundColor: '#f8fafc', padding: '35px', borderRadius: '15px', marginBottom: '30px', width: '100%', border: '2px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #e2e8f0', fontSize: '24px' }}>
              <span style={{ fontWeight: 'bold', color: '#475569', minWidth: '200px' }}>{t.department}:</span>
              <span style={{ color: '#1e3a8a', fontWeight: '600' }}>{userData.department}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #e2e8f0', fontSize: '24px' }}>
              <span style={{ fontWeight: 'bold', color: '#475569', minWidth: '200px' }}>{t.service}:</span>
              <span style={{ color: '#1e3a8a', fontWeight: '600' }}>{userData.service}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #e2e8f0', fontSize: '24px' }}>
              <span style={{ fontWeight: 'bold', color: '#475569', minWidth: '200px' }}>{t.name}:</span>
              <span style={{ color: '#1e3a8a', fontWeight: '600' }}>{userData.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #e2e8f0', fontSize: '24px' }}>
              <span style={{ fontWeight: 'bold', color: '#475569', minWidth: '200px' }}>{t.mobile}:</span>
              <span style={{ color: '#1e3a8a', fontWeight: '600' }}>{userData.mobile}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', fontSize: '24px' }}>
              <span style={{ fontWeight: 'bold', color: '#475569', minWidth: '200px' }}>{t.problem}:</span>
              <span style={{ color: '#1e3a8a', fontWeight: '600' }}>{userData.problem}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button style={styles.backButton} onClick={() => setScreen('form')}>
              ← {t.back}
            </button>
            <button
              style={{ ...styles.button, backgroundColor: '#22c55e', minWidth: '250px' }}
              onClick={handleConfirm}
            >
              <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(t.submit); }}>🔊</span>
              ✓ {t.submit}
            </button>
          </div>
        </div>
      )}

      {screen === 'receipt' && (
        <div style={styles.screenContainer}>
          <h2 style={{ ...styles.sectionTitle, color: '#22c55e' }}>✓ {t.receipt}</h2>
          <div style={{ backgroundColor: '#f0fdf4', padding: '50px', borderRadius: '20px', border: '4px dashed #22c55e', textAlign: 'center', marginBottom: '30px', width: '100%' }}>
            <p style={{ fontSize: '26px', color: '#166534' }}>{t.tokenNumber}</p>
            <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#15803d', margin: '30px 0', letterSpacing: '4px' }}>{token}</div>
            <p style={{ fontSize: '26px', color: '#166534' }}>📱 {t.smsMessage}</p>
            <p style={{ fontSize: '26px', color: '#166534' }}>{t.mobile}: {userData.mobile}</p>
            <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px dashed #86efac' }} />
            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#166534' }}>{t.thankYou}</p>
            <p style={{ fontSize: '26px', color: '#166534' }}>{t.keepToken}</p>
          </div>
          <button
            style={{ ...styles.button, backgroundColor: '#2563eb', minWidth: '300px' }}
            onClick={resetApp}
          >
            <span style={styles.ttsIcon} onClick={(e) => { e.stopPropagation(); speak(t.home); }}>🔊</span>
            🏠 {t.home}
          </button>
        </div>
      )}

      {/* ─── ADMIN SCREENS ─────────────────────────────────── */}
      {screen === 'adminLogin' && <AdminLogin t={t} setScreen={setScreen} setAdminAuth={setAdminAuth} />}
      {screen === 'adminDashboard' && <AdminDashboard t={t} adminAuth={adminAuth} setScreen={setScreen} />}
      {screen === 'complaintList' && <ComplaintList t={t} adminAuth={adminAuth} setScreen={setScreen} />}
      {screen === 'complaintDetail' && <ComplaintDetail t={t} adminAuth={adminAuth} setScreen={setScreen} />}
      {screen === 'updateStatus' && <UpdateStatus t={t} adminAuth={adminAuth} setScreen={setScreen} />}
      {screen === 'analytics' && <Analytics t={t} adminAuth={adminAuth} setScreen={setScreen} />}
    </div>
  );
}

export default App;