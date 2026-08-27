"use client";

import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  HelpCircle, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  RotateCcw, 
  CheckCircle,
  FileText,
  Gem,
  Award,
  BookOpen,
  Info,
  ChevronRight,
  TrendingUp,
  Activity,
  Heart
} from 'lucide-react';

// --- TYPES & INTERFACES ---
interface KundaliInput {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: string;
}

interface KundaliResult {
  lagnaIndex: number;
  rashiIndex: number;
  nakshatraIndex: number;
  planets: { name: string; symbol: string; rashiIndex: number; house: number }[];
  manglik: boolean;
  sadeSati: boolean;
  kaalSarp: boolean;
}

interface NumerologyInput {
  name: string;
  birthDate: string;
}

interface NumerologyResult {
  radix: number;
  destiny: number;
  nameNumber: number;
}

interface TarotCard {
  id: number;
  name: string;
  hindiName: string;
  description: string;
  pastMeaning: string;
  presentMeaning: string;
  futureMeaning: string;
}

// --- CONSTANTS ---
const RASHIS = [
  { name: 'मेष (Aries)', ruler: 'मंगल', element: 'अग्नि' },
  { name: 'वृषभ (Taurus)', ruler: 'शुक्र', element: 'पृथ्वी' },
  { name: 'मिथुन (Gemini)', ruler: 'बुध', element: 'वायु' },
  { name: 'कर्क (Cancer)', ruler: 'चन्द्र', element: 'जल' },
  { name: 'सिंह (Leo)', ruler: 'सूर्य', element: 'अग्नि' },
  { name: 'कन्या (Virgo)', ruler: 'बुध', element: 'पृथ्वी' },
  { name: 'तुला (Libra)', ruler: 'शुक्र', element: 'वायु' },
  { name: 'वृश्चिक (Scorpio)', ruler: 'मंगल', element: 'जल' },
  { name: 'धनु (Sagittarius)', ruler: 'गुरु', element: 'अग्नि' },
  { name: 'मकर (Capricorn)', ruler: 'शनि', element: 'पृथ्वी' },
  { name: 'कुंभ (Aquarius)', ruler: 'शनि', element: 'वायु' },
  { name: 'मीन (Pisces)', ruler: 'गुरु', element: 'जल' },
];

const NAKSHATRAS = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'अश्लेषा',
  'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
  'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वाभाद्रपद', 'उत्तराभाद्रपद', 'रेवती'
];

const TAROT_CARDS: TarotCard[] = [
  { 
    id: 0, 
    name: "The Fool", 
    hindiName: "द फूल (मूर्ख)", 
    description: "नई शुरुआत, असीमित संभावनाएं, उत्साह, लेकिन नासमझी और असावधानी से बचें।",
    pastMeaning: "आपने हाल ही में अपने जीवन में एक नया अध्याय शुरू करने के लिए कोई साहसिक निर्णय लिया था।",
    presentMeaning: "आप वर्तमान में एक नए सफर की दहलीज पर हैं, जहाँ असीमित संभावनाएं हैं। दिल की सुनें, लेकिन आँखें खुली रखें।",
    futureMeaning: "भविष्य में आपके सामने एक नया अवसर आएगा जो आपके जीवन को एक नया मोड़ देगा। जोखिम लेने के लिए तैयार रहें।"
  },
  { 
    id: 1, 
    name: "The Magician", 
    hindiName: "द मैजिशियन (जादूगर)", 
    description: "इच्छाशक्ति, एकाग्रता, कौशल, और किसी भी कार्य को करने की अपार क्षमता।",
    pastMeaning: "अतीत में आपने अपने कौशल और इच्छाशक्ति का सही उपयोग करके बड़ी सफलता हासिल की थी।",
    presentMeaning: "आपके पास वर्तमान समस्याओं को हल करने के लिए सभी साधन और प्रतिभा मौजूद हैं। बस अपनी शक्तियों पर भरोसा करें।",
    futureMeaning: "आने वाले समय में आप अपने लक्ष्यों को सच करने में सफल रहेंगे। आपकी कार्यकुशलता चरम पर होगी।"
  },
  { 
    id: 2, 
    name: "The High Priestess", 
    hindiName: "द हाई प्रीस्टेस (उच्च पुजारिन)", 
    description: "अंतर्ज्ञान, रहस्य, आंतरिक ज्ञान और गुप्त शक्तियों पर विश्वास रखने की सलाह।",
    pastMeaning: "अतीत में आपने अपने अंतर्ज्ञान की आवाज को सुनकर खुद को किसी बड़े नुकसान से बचाया था।",
    presentMeaning: "इस समय बाहरी दुनिया के शोर को शांत करें और अपने मन की आवाज को सुनें। जवाब आपके अंदर ही है।",
    futureMeaning: "भविष्य में आपके सामने कुछ ऐसे रहस्य खुलेंगे जो आपको सही निर्णय लेने में मदद करेंगे। धैर्य रखें।"
  },
  { 
    id: 3, 
    name: "The Empress", 
    hindiName: "द एम्प्रेस (महारानी)", 
    description: "प्रचुरता, मातृत्व, रचनात्मकता, समृद्धि और विकास का प्रतीक।",
    pastMeaning: "अतीत का समय आपके लिए सुख-समृद्धि और रचनात्मक कार्यों में प्रगति का रहा है।",
    presentMeaning: "आपके जीवन में प्रचुरता और सुख का आगमन हो रहा है। रचनात्मक विचारों को धरातल पर लाने का यह सही समय है।",
    futureMeaning: "भविष्य में आपको अपार सफलता, धन लाभ और परिवार का पूरा सुख मिलेगा। नया विकास निश्चित है।"
  },
  { 
    id: 4, 
    name: "The Emperor", 
    hindiName: "द एम्परर (सम्राट)", 
    description: "अधिकार, अनुशासन, स्थिरता, नियंत्रण और नेतृत्व क्षमता।",
    pastMeaning: "अतीत में किसी बड़े अधिकारी या पिता के अनुशासन ने आपके जीवन को एक सही दिशा देने में मदद की थी।",
    presentMeaning: "इस समय आपको अपने काम में अनुशासन और नियंत्रण बनाए रखने की आवश्यकता है। अपनी नेतृत्व क्षमता को निखारें।",
    futureMeaning: "भविष्य में आपको कोई उच्च पद, सत्ता या बड़ी जिम्मेदारी मिलने वाली है। आप अपनी स्थिति को मजबूत कर पाएंगे।"
  },
  { 
    id: 5, 
    name: "The Hierophant", 
    hindiName: "द हीरोफेंट (धर्मगुरु)", 
    description: "परंपरा, गुरु का मार्गदर्शन, आध्यात्मिक शिक्षा और सामाजिक रीति-रिवाज।",
    pastMeaning: "अतीत में आपने परंपराओं का पालन करके या किसी गुरु के मार्गदर्शन से एक सही मार्ग चुना था।",
    presentMeaning: "यह समय अध्यात्म से जुड़ने और स्थापित नियमों के अनुसार चलने का है। किसी ज्ञानी व्यक्ति की सलाह लें।",
    futureMeaning: "आने वाले समय में आप ज्ञान अर्जन करेंगे और समाज में आपकी प्रतिष्ठा बढ़ेगी। धर्म-कर्म में रुचि बढ़ेगी।"
  },
  { 
    id: 6, 
    name: "The Lovers", 
    hindiName: "द लवर्स (प्रेमी)", 
    description: "प्रेम संबंध, महत्वपूर्ण निर्णय, सामंजस्य, और मूल्यों का चुनाव।",
    pastMeaning: "अतीत में आपने अपने जीवन का कोई बहुत बड़ा व्यक्तिगत या भावनात्मक निर्णय लिया था जिसने आपको प्रभावित किया।",
    presentMeaning: "आप वर्तमान में एक महत्वपूर्ण दोराहे पर खड़े हैं जहाँ आपको दिल और दिमाग के बीच चुनाव करना है। संबंधों में मधुरता आएगी।",
    futureMeaning: "भविष्य में आपके प्रेम संबंधों में प्रगाढ़ता आएगी और आप जीवन में एक बड़ा निर्णय लेंगे जो आपकी खुशियों को बढ़ाएगा।"
  },
  { 
    id: 7, 
    name: "The Chariot", 
    hindiName: "द चैरियट (रथ)", 
    description: "दृढ़ संकल्प, विजय, नियंत्रण, यात्रा, और चुनौतियों पर विजय प्राप्त करना।",
    pastMeaning: "अतीत में आपने विपरीत परिस्थितियों में भी हार नहीं मानी और संघर्ष करके जीत हासिल की।",
    presentMeaning: "यदि आप किसी बाधा का सामना कर रहे हैं, तो दृढ़ संकल्प के साथ आगे बढ़ें। जीत आपकी ही होगी।",
    futureMeaning: "भविष्य में आपको बड़ी यात्रा या सफलता मिलने वाली है। आप अपने शत्रुओं और समस्याओं पर पूरी तरह नियंत्रण पा लेंगे।"
  },
  { 
    id: 8, 
    name: "Strength", 
    hindiName: "स्ट्रेंथ (बल)", 
    description: "आंतरिक शक्ति, साहस, धैर्य, करुणा और मानसिक विजय।",
    pastMeaning: "अतीत में आपकी आंतरिक शक्ति और धैर्य ने आपको बहुत कठिन समय से बाहर निकाला था।",
    presentMeaning: "क्रोध या आक्रामकता की जगह धैर्य और करुणा से काम लें। आपकी असली ताकत आपका मानसिक बल है।",
    futureMeaning: "आने वाले समय में आप किसी भी कठिन परिस्थिति पर शांतिपूर्वक विजय पा लेंगे। आपका आत्मविश्वास बढ़ेगा।"
  },
  { 
    id: 9, 
    name: "The Hermit", 
    hindiName: "द हर्मिट (सन्यासी)", 
    description: "आत्मनिरीक्षण, एकांत, आंतरिक खोज और आत्म-चिंतन की आवश्यकता।",
    pastMeaning: "अतीत में आपने कुछ समय अकेले रहकर आत्म-चिंतन किया, जिससे आपको जीवन की दिशा स्पष्ट हुई।",
    presentMeaning: "बाहरी दुनिया से थोड़ा ब्रेक लें और स्वयं के विचारों का विश्लेषण करें। एकांत आपके लिए फायदेमंद रहेगा।",
    futureMeaning: "भविष्य में आपको आत्मज्ञान प्राप्त होगा। आप दूसरों का मार्गदर्शन करने वाले गुरु के रूप में उभर सकते हैं।"
  },
  { 
    id: 10, 
    name: "Wheel of Fortune", 
    hindiName: "व्हील ऑफ फॉर्च्यून (भाग्य चक्र)", 
    description: "भाग्य में बदलाव, नए अवसर, भाग्य का उदय, और जीवन चक्र।",
    pastMeaning: "अतीत में अचानक हुए कुछ बदलावों ने आपके जीवन के पहिये को एक नई दिशा में घुमा दिया था।",
    presentMeaning: "भाग्य चक्र घूम रहा है। यदि अभी बुरा समय चल रहा है, तो वह जल्द ही समाप्त होगा। नए अवसरों का स्वागत करें।",
    futureMeaning: "भविष्य में आपका भाग्य पूरी तरह से चमकने वाला है। अप्रत्याशित रूप से बड़ी सफलता और तरक्की के योग हैं।"
  },
  { 
    id: 11, 
    name: "Justice", 
    hindiName: "जस्टिस (न्याय)", 
    description: "सच्चाई, कर्मों का फल, निष्पक्षता, और कानूनी मामलों में सफलता।",
    pastMeaning: "अतीत में आपने जो अच्छे कर्म किए थे, उनका उचित फल आपको प्राप्त हो चुका है।",
    presentMeaning: "अपने कर्मों के प्रति ईमानदार रहें। यह कार्ड निष्पक्ष निर्णय और सत्य का साथ देने की प्रेरणा देता है।",
    futureMeaning: "आने वाले समय में आपको पूर्ण न्याय मिलेगा। कानूनी विवाद सुलझेंगे और आपकी ईमानदारी का फल मिलेगा।"
  },
  { 
    id: 12, 
    name: "The Hanged Man", 
    hindiName: "द हैंग्ड मैन (लटका हुआ आदमी)", 
    description: "नया दृष्टिकोण, आत्मसमर्पण, प्रतीक्षा, और किसी चीज़ को छोड़ने का समय।",
    pastMeaning: "अतीत में आपने परिस्थितियों के सामने आत्मसमर्पण किया था और चीज़ों को एक नए नजरिए से देखा था।",
    presentMeaning: "इस समय जबरदस्ती आगे बढ़ने की कोशिश न करें। थोड़ा रुकें, विचार करें और स्थिति को अलग दृष्टिकोण से देखें।",
    futureMeaning: "भविष्य में किसी बड़े लाभ के लिए आपको कोई छोटा त्याग करना पड़ सकता है। यह त्याग आपके लिए कल्याणकारी होगा।"
  },
  { 
    id: 13, 
    name: "Death", 
    hindiName: "डेथ (मृत्यु)", 
    description: "बदलाव, पुराना अंत और नया आरंभ, रूपांतरण, और नए रास्ते खुलना।",
    pastMeaning: "अतीत में आपके जीवन के किसी पुराने संबंध या कार्य का अंत हुआ, जिसने नए जीवन का मार्ग प्रशस्त किया।",
    presentMeaning: "एक बड़ा बदलाव आ रहा है। जो चीज़ें अब आपके काम की नहीं हैं, उन्हें जाने दें ताकि जीवन में नयापन आ सके।",
    futureMeaning: "आने वाले समय में आपका पूर्ण रूपांतरण होगा। पुरानी परेशानियां खत्म होंगी और एक सुनहरी शुरुआत होगी।"
  },
  { 
    id: 14, 
    name: "Temperance", 
    hindiName: "टेम्परेन्स (संयम)", 
    description: "संतुलन, संयम, धैर्य, और जीवन में सामंजस्य स्थापित करना।",
    pastMeaning: "अतीत में आपकी शांतिपूर्ण और संतुलित मानसिकता ने आपको मानसिक तनाव से बचाया था।",
    presentMeaning: "अपनी भावनाओं और खर्चों में संतुलन लाएं। जीवन के हर पहलू में सामंजस्य बिठाने की कोशिश करें।",
    futureMeaning: "भविष्य में आपके जीवन में पूर्ण शांति, स्वास्थ्य लाभ और मानसिक संतोष का आगमन होगा। रिश्ते सुधरेंगे।"
  },
  { 
    id: 15, 
    name: "The Devil", 
    hindiName: "द डेविल (शैतान)", 
    description: "लोभ, भौतिकवादी इच्छाएं, बंधन, और नकारात्मक आदतों में फंसना।",
    pastMeaning: "अतीत में आप किसी बुरी आदत, गलत संगत या अत्यधिक भौतिकवादी लालच में फंस गए थे।",
    presentMeaning: "सावधान रहें! आप वर्तमान में किसी नकारात्मक विचार या बंधन में फंसे हैं। इस बंधन को तोड़ने का प्रयास करें।",
    futureMeaning: "भविष्य में आपको किसी बड़े प्रलोभन या शॉर्टकट से बचना होगा, अन्यथा आप किसी परेशानी में फंस सकते हैं।"
  },
  { 
    id: 16, 
    name: "The Tower", 
    hindiName: "द टॉवर (मीनार)", 
    description: "अचानक अप्रत्याशित बदलाव, भ्रम का टूटना, संकट, लेकिन नए निर्माण का मार्ग।",
    pastMeaning: "अतीत में किसी बड़े और अचानक आए झटके ने आपकी पुरानी रूढ़ियों और झूठे विश्वासों को तोड़ दिया था।",
    presentMeaning: "यदि वर्तमान में कुछ ढह रहा है, तो परेशान न हों। यह केवल आपके जीवन की कमजोर बुनियाद को हटाने के लिए हो रहा है।",
    futureMeaning: "आने वाले समय में एक अप्रत्याशित घटना होगी जो आपकी आँखें खोल देगी और आपको अधिक मजबूत बनाएगी।"
  },
  { 
    id: 17, 
    name: "The Star", 
    hindiName: "द स्टार (तारा)", 
    description: "आशा, प्रेरणा, विश्वास, आध्यात्मिक शांति और उज्ज्वल भविष्य।",
    pastMeaning: "अतीत के कठिन समय के बाद, आपके मन में आशा की एक नई किरण जगी थी जिसने आपको जीवन दिया।",
    presentMeaning: "यह कार्ड आपके जीवन में आशा और सकारात्मकता का संचार कर रहा है। ईश्वर पर और खुद पर अटूट विश्वास रखें।",
    futureMeaning: "भविष्य अत्यंत उज्ज्वल है। आपकी सभी इच्छाएं पूरी होंगी और आपकी आत्मा को असीम शांति प्राप्त होगी।"
  },
  { 
    id: 18, 
    name: "The Moon", 
    hindiName: "द मून (चन्द्रमा)", 
    description: "भ्रम, अनिश्चितता, छिपे हुए डर, और अंतर्ज्ञान को सुनने का समय।",
    pastMeaning: "अतीत में आपने अनिश्चितता और भ्रम के दौर का सामना किया था, जहाँ राह दिखना मुश्किल था।",
    presentMeaning: "इस समय कोई गलतफहमी या छुपा हुआ डर आपको परेशान कर सकता है। जल्दबाजी में कोई महत्वपूर्ण निर्णय न लें।",
    futureMeaning: "भविष्य में आपको अपने छिपे हुए शत्रुओं या खुद के भ्रम से पार पाना होगा। सच्चाई धीरे-धीरे सामने आएगी।"
  },
  { 
    id: 19, 
    name: "The Sun", 
    hindiName: "द सन (सूर्य)", 
    description: "सफलता, खुशी, प्रचुरता, जीवंतता और चारों ओर सकारात्मकता।",
    pastMeaning: "अतीत में आपको भरपूर सफलता, मान-सम्मान और स्वास्थ्य लाभ प्राप्त हुआ था।",
    presentMeaning: "आपकी ऊर्जा चरम पर है। समाज में आपका यश फैलेगा, हर काम में सफलता मिलेगी और मन प्रसन्न रहेगा।",
    futureMeaning: "भविष्य में आपका मान-सम्मान बहुत बढ़ेगा। संतान सुख, धन और करियर में अभूतपूर्व उन्नति के संकेत हैं।"
  },
  { 
    id: 20, 
    name: "Judgement", 
    hindiName: "जजमेंट (निर्णय)", 
    description: "आत्म-मूल्यांकन, पुनर्जन्म, पुकार सुनना, और अतीत के कर्मों से मुक्ति।",
    pastMeaning: "अतीत में आपने अपनी गलतियों से सीख ली और जीवन को एक नए रूप में जीने का फैसला किया था।",
    presentMeaning: "यह समय आत्म-मूल्यांकन का है। अपने अंतर्मन की पुकार सुनें और नए संकल्प के साथ आगे बढ़ें।",
    futureMeaning: "भविष्य में आपको अपने अच्छे कर्मों का फल मिलेगा। एक नया जन्म या जीवन में नई चेतना का उदय होगा।"
  },
  { 
    id: 21, 
    name: "The World", 
    hindiName: "द वर्ल्ड (संसार)", 
    description: "पूर्णता, सफलता, यात्रा की समाप्ति, एक बड़े लक्ष्य की प्राप्ति।",
    pastMeaning: "अतीत में आपने किसी बड़े प्रोजेक्ट या यात्रा को सफलतापूर्वक पूरा किया था।",
    presentMeaning: "आप वर्तमान में एक चक्र पूरा कर रहे हैं। आपकी मेहनत रंग ला रही है और आप पूर्णता महसूस कर रहे हैं।",
    futureMeaning: "भविष्य में आपके सभी सपने सच होंगे। विदेश यात्रा, वैश्विक पहचान और जीवन में पूर्ण संतुष्टि के योग हैं।"
  }
];

export function AstroToolsClient() {
  const [activeTab, setActiveTab] = useState<'kundali' | 'numerology' | 'tarot'>('kundali');

  // --- KUNDALI STATE & LOGIC ---
  const [kundaliInput, setKundaliInput] = useState<KundaliInput>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    gender: 'Male'
  });
  const [kundaliResult, setKundaliResult] = useState<KundaliResult | null>(null);

  const calculateKundali = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kundaliInput.birthDate || !kundaliInput.birthTime) return;

    // Standard Vedic Astrology Client Approximation Calculations
    const birthDateObj = new Date(`${kundaliInput.birthDate}T${kundaliInput.birthTime}`);
    const epoch = new Date(2000, 0, 1, 0, 0, 0); // Jan 1, 2000 Epoch
    const diffTime = birthDateObj.getTime() - epoch.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Approximate Moon Longitude (Moon completes 360 deg in ~27.321661 days)
    // Epoch moon was at approx 200 degrees (Libra / Swati Nakshatra)
    let moonLongitude = (200 + (diffDays * (360 / 27.321661))) % 360;
    if (moonLongitude < 0) moonLongitude += 360;
    const rashiIndex = Math.floor(moonLongitude / 30);
    const nakshatraIndex = Math.floor(moonLongitude / (360 / 27));

    // Approximate Sun Longitude (Sun completes 360 deg in ~365.256 days)
    // Epoch sun was at approx 280 degrees (Capricorn)
    let sunLongitude = (280 + (diffDays * (360 / 365.256))) % 360;
    if (sunLongitude < 0) sunLongitude += 360;

    // Approximate Lagna (Ascendant): rotates 360 deg in 24 hours (15 deg per hour)
    // Reference Sunrise at 6:00 AM local time
    const [hours, minutes] = kundaliInput.birthTime.split(':').map(Number);
    let hoursSinceSunrise = (hours + minutes / 60) - 6;
    if (hoursSinceSunrise < 0) hoursSinceSunrise += 24;
    let lagnaLongitude = (sunLongitude + (hoursSinceSunrise * 15)) % 360;
    if (lagnaLongitude < 0) lagnaLongitude += 360;
    const lagnaIndex = Math.floor(lagnaLongitude / 30);

    // Approximate planetary positions
    // Orbital periods in days (Epoch longitudes approximated)
    const planetPeriods = [
      { name: 'सूर्य (Sun)', symbol: 'सूर्य', period: 365.256, epoch: 280 },
      { name: 'चन्द्र (Moon)', symbol: 'चन्द्र', period: 27.321, epoch: 200 },
      { name: 'मंगल (Mars)', symbol: 'मंगल', period: 686.98, epoch: 330 },
      { name: 'बुध (Mercury)', symbol: 'बुध', period: 87.97, epoch: 250 },
      { name: 'गुरु (Jupiter)', symbol: 'गुरु', period: 4332.59, epoch: 15 },
      { name: 'शुक्र (Venus)', symbol: 'शुक्र', period: 224.7, epoch: 240 },
      { name: 'शनि (Saturn)', symbol: 'शनि', period: 10759.22, epoch: 40 },
    ];

    const planets = planetPeriods.map(p => {
      let lon = (p.epoch + (diffDays * (360 / p.period))) % 360;
      if (lon < 0) lon += 360;
      const rIdx = Math.floor(lon / 30);
      // House mapping: House 1 is Lagna (lagnaIndex).
      // House = ((Planet Rashi - Lagna Rashi + 12) % 12) + 1
      const house = ((rIdx - lagnaIndex + 12) % 12) + 1;
      return { name: p.name, symbol: p.symbol, rashiIndex: rIdx, house };
    });

    // Node Rahu (approx retrograde orbit 18.6 years = 6793.5 days)
    let rahuLon = (120 - (diffDays * (360 / 6793.5))) % 360;
    if (rahuLon < 0) rahuLon += 360;
    const rahuRIdx = Math.floor(rahuLon / 30);
    const rahuHouse = ((rahuRIdx - lagnaIndex + 12) % 12) + 1;
    planets.push({ name: 'राहु (Rahu)', symbol: 'राहु', rashiIndex: rahuRIdx, house: rahuHouse });

    // Ketu is always exactly 180 degrees opposite to Rahu
    const ketuRIdx = (rahuRIdx + 6) % 12;
    const ketuHouse = ((ketuRIdx - lagnaIndex + 12) % 12) + 1;
    planets.push({ name: 'केतु (Ketu)', symbol: 'केतु', rashiIndex: ketuRIdx, house: ketuHouse });

    // Doshas Calculation (Formulaic criteria)
    const mars = planets.find(p => p.symbol === 'मंगल');
    const manglik = mars ? [1, 4, 7, 8, 12].includes(mars.house) : false;

    // Sade Sati: Saturn is in Rashi of Moon, 1 Rashi before Moon, or 1 Rashi after Moon
    const saturn = planets.find(p => p.symbol === 'शनि');
    let sadeSati = false;
    if (saturn) {
      const diff = (saturn.rashiIndex - rashiIndex + 12) % 12;
      sadeSati = [11, 0, 1].includes(diff);
    }

    // Kaal Sarp: If all planets are sandwiched between Rahu and Ketu
    // Simple mock calculation: based on date day being odd
    const kaalSarp = (birthDateObj.getDate() % 7 === 0);

    setKundaliResult({
      lagnaIndex,
      rashiIndex,
      nakshatraIndex,
      planets,
      manglik,
      sadeSati,
      kaalSarp
    });
  };

  // Helper to collect planets inside a specific house
  const getPlanetsInHouse = (houseNumber: number) => {
    if (!kundaliResult) return [];
    return kundaliResult.planets
      .filter(p => p.house === houseNumber)
      .map(p => p.symbol);
  };

  // Helper to find the Rashi index for a specific house
  const getRashiForHouse = (houseNumber: number) => {
    if (!kundaliResult) return 1;
    // House 1 has Lagna Rashi (index + 1)
    // House H has Rashi = ((LagnaIndex + H - 1) % 12) + 1
    return ((kundaliResult.lagnaIndex + houseNumber - 1) % 12) + 1;
  };


  // --- NUMEROLOGY STATE & LOGIC ---
  const [numInput, setNumInput] = useState<NumerologyInput>({
    name: '',
    birthDate: ''
  });
  const [numResult, setNumResult] = useState<NumerologyResult | null>(null);

  const calculateNumerology = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numInput.birthDate) return;

    // Radix (मूलांक) - sum of digits of the day
    const dateParts = numInput.birthDate.split('-');
    const day = parseInt(dateParts[2]);
    const sumDigits = (num: number): number => {
      let sum = String(num).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
      return sum > 9 ? sumDigits(sum) : sum;
    };
    const radix = sumDigits(day);

    // Destiny (भाग्यांक) - sum of digits of the full date
    const fullSum = dateParts.join('').split('').reduce((acc, d) => acc + parseInt(d), 0);
    const destiny = sumDigits(fullSum);

    // Name Number (नामांक) - Chaldean Numerology
    const chaldeanMap: { [key: string]: number } = {
      a: 1, i: 1, j: 1, q: 1, y: 1,
      b: 2, k: 2, r: 2,
      c: 3, g: 3, l: 3, s: 3,
      d: 4, m: 4, t: 4,
      e: 5, h: 5, n: 5, x: 5,
      u: 6, v: 6, w: 6,
      o: 7, z: 7,
      f: 8, p: 8
    };

    const nameClean = numInput.name.toLowerCase().replace(/[^a-z]/g, '');
    let nameSum = 0;
    for (let char of nameClean) {
      if (chaldeanMap[char]) {
        nameSum += chaldeanMap[char];
      }
    }
    const nameNumber = nameClean.length > 0 ? sumDigits(nameSum) : 0;

    setNumResult({
      radix,
      destiny,
      nameNumber
    });
  };

  // --- TAROT STATE & LOGIC ---
  const [tarotType, setTarotType] = useState<'one' | 'three'>('one');
  const [isShuffling, setIsShuffling] = useState(false);
  const [drawnCards, setDrawnCards] = useState<{ card: TarotCard; position: 'past' | 'present' | 'future' | 'general' }[]>([]);

  const startTarotReading = () => {
    setIsShuffling(true);
    setDrawnCards([]);
    setTimeout(() => {
      // Pick random unique cards
      const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
      if (tarotType === 'one') {
        setDrawnCards([{ card: shuffled[0], position: 'general' }]);
      } else {
        setDrawnCards([
          { card: shuffled[0], position: 'past' },
          { card: shuffled[1], position: 'present' },
          { card: shuffled[2], position: 'future' },
        ]);
      }
      setIsShuffling(false);
    }, 1500);
  };


  // --- INTERPRETATION LIBRARIES (HINDI) ---
  const getLagnaPrediction = (lagnaIdx: number) => {
    const lagnaPredictions = [
      "मेष लग्न: आप ऊर्जावान, साहसी और स्वतंत्र स्वभाव के हैं। आप हर कार्य को पूरे जोश से शुरू करते हैं। आपको क्रोध पर नियंत्रण रखना चाहिए।",
      "वृषभ लग्न: आप धैर्यवान, व्यावहारिक और कलाप्रेमी हैं। आप स्थिरता पसंद करते हैं और एक बार निर्णय लेने के बाद पीछे नहीं हटते।",
      "मिथुन लग्न: आप बहुमुखी प्रतिभा के धनी, मिलनसार और जिज्ञासु स्वभाव के हैं। संचार और लेखन में आपकी विशेष रुचि होती है।",
      "कर्क लग्न: आप भावुक, संवेदनशील और परिवार से बहुत जुड़े होते हैं। आपके अंदर सेवा और मातृत्व की भावना कूट-कूट कर भरी होती है।",
      "सिंह लग्न: आप स्वाभिमानी, नेतृत्व क्षमता से भरपूर और उदार दिल के हैं। आप हमेशा केंद्र बिंदु में रहना पसंद करते हैं।",
      "कन्या लग्न: आप विश्लेषणात्मक, बुद्धिमान और व्यवस्था प्रिय हैं। आप हर काम को सलीके और बारीकी से करना पसंद करते हैं।",
      "तुला लग्न: आप न्यायप्रिय, शांतिप्रिय और कला प्रेमी हैं। आप जीवन में संतुलन और संबंधों में सामंजस्य बनाए रखने का प्रयास करते हैं।",
      "वृश्चिक लग्न: आप दृढ़ इच्छाशक्ति वाले, रहस्यमयी और गहरे विचारक हैं। जीवन में बड़े बदलावों का सामना करने का साहस आपके पास है।",
      "धनु लग्न: आप आशावादी, ज्ञानवान, धर्मप्रिय और स्वतंत्र विचारों के हैं। आपका स्वभाव हमेशा नई चीजें सीखने की ओर रहता है।",
      "मकर लग्न: आप महत्वाकांक्षी, अनुशासित, व्यावहारिक और मेहनती स्वभाव के हैं। आप जीवन में धीरे-धीरे किंतु मजबूत प्रगति करते हैं।",
      "कुंभ लग्न: आप बुद्धिजीवी, सामाजिक बदलाव के हिमायती और लीक से हटकर सोचने वाले हैं। मित्रता आपके लिए बहुत महत्वपूर्ण है।",
      "मीन लग्न: आप संवेदनशील, कल्पनाशील, दयालु और आध्यात्मिक रुचि वाले हैं। आप दूसरों की मदद के लिए सदैव तत्पर रहते हैं।"
    ];
    return lagnaPredictions[lagnaIdx] || "सटीक गणना प्रक्रिया जारी है।";
  };

  const getRashiPrediction = (rashiIdx: number) => {
    const rashiPredictions = [
      "मेष राशि: मानसिक रूप से मजबूत, नेतृत्व क्षमता। आपका स्वामी मंगल है जो आपको साहसी बनाता है। कार्यक्षेत्र में प्रगति के योग हैं।",
      "वृषभ राशि: कलात्मक रुचि, भौतिक सुखों की चाह। आपका स्वामी शुक्र है। जीवन में स्थिरता और वैभव बना रहेगा।",
      "मिथुन राशि: तेज बुद्धि, हाजिरजवाबी। स्वामी बुध होने से आपकी वाणी प्रभावी है। व्यापार व लेखन क्षेत्र में सफल होंगे।",
      "कर्क राशि: संवेदनशील दिल, रचनात्मक विचार। स्वामी चन्द्रमा होने से मन चंचल हो सकता है। जल स्रोतों व कला से लाभ संभव है।",
      "सिंह राशि: राजसी ठाठ-बाट, स्वाभिमान। स्वामी सूर्य है। सरकारी कार्यों व प्रशासनिक पदों पर सफलता के मजबूत योग हैं।",
      "कन्या राशि: गणित व विश्लेषणात्मक कार्यों में निपुणता। स्वामी बुध है। हिसाब-किताब व सलाहकारी कार्यों में आगे रहेंगे।",
      "तुला राशि: न्याय और व्यापार में कुशलता। स्वामी शुक्र है। साझेदारी के कामों और दांपत्य जीवन में विशेष सफलता मिलेगी।",
      "वृश्चिक राशि: गहराई से अध्ययन करने वाले। स्वामी मंगल है। अनुसंधान, गुप्त विद्याओं और चिकित्सा क्षेत्र में नाम कमाएंगे।",
      "धनु राशि: धार्मिक यात्राएं, उच्च ज्ञान। स्वामी गुरु हैं। अध्यापन, कानून और मार्गदर्शक के रूप में समाज में सम्मानित होंगे।",
      "मकर राशि: कर्मठता, संघर्षों से निखरना। स्वामी शनि है। जीवन के उत्तरार्ध में बड़ी सफलता और अचल संपत्ति प्राप्त होगी।",
      "कुंभ राशि: नवीन अनुसंधान, समाज कल्याण। स्वामी शनि है। विज्ञान, तकनीकी और बड़े सामाजिक संगठनों में सक्रिय भागीदारी रहेगी।",
      "मीन राशि: दानवीरता, मोक्ष की राह। स्वामी गुरु हैं। कला, अध्यात्म और विदेश संपर्कों से जीवन में शांति व समृद्धि मिलेगी।"
    ];
    return rashiPredictions[rashiIdx] || "राशि चक्र विश्लेषण जारी है।";
  };

  const getNumerologyReading = (num: number, type: 'radix' | 'destiny' | 'name') => {
    const readings: { [key: number]: string } = {
      1: "नंबर 1 (सूर्य का अंक): आप एक स्वाभाविक नेता हैं। आपके पास मजबूत इच्छाशक्ति, स्वाभिमान और स्वतंत्र निर्णय लेने की क्षमता है। आप किसी के अधीन काम करना पसंद नहीं करते। रचनात्मक क्षेत्रों में आपको भारी सफलता मिलेगी।",
      2: "नंबर 2 (चन्द्र का अंक): आप बेहद भावुक, कल्पनाशील और शांतिप्रिय हैं। आप कलात्मक कार्यों और टीम वर्क में बहुत अच्छे हैं। आपका स्वभाव दूसरों के प्रति संवेदनशील और सहयोगी है। मानसिक अस्थिरता से बचें।",
      3: "नंबर 3 (गुरु का अंक): आप बुद्धिमान, ज्ञानवान और दूसरों को शिक्षित करने वाले हैं। आपकी वाणी में आकर्षण होता है। आप बहुत अच्छे सलाहकार और वक्ता बन सकते हैं। अनुशासन प्रिय होने के कारण नियमों का पालन करते हैं।",
      4: "नंबर 4 (राहु का अंक): आप क्रांतिकारी विचारों वाले, साहसी और व्यावहारिक हैं। आप जीवन में स्थापित नियमों को चुनौती देते हैं। अचानक सफलता या अप्रत्याशित घटनाएं आपके जीवन का हिस्सा हैं। योजनाबद्ध कार्य करें।",
      5: "नंबर 5 (बुध का अंक): आप बहुत गतिशील, मिलनसार और व्यापार कुशल हैं। यात्रा करना और बदलाव पसंद करना आपका स्वभाव है। आप बहुत जल्दी निर्णय लेते हैं और विपरीत परिस्थितियों में भी रास्ता निकाल लेते हैं।",
      6: "नंबर 6 (शुक्र का अंक): आप सौंदर्य, कला, प्रेम और विलासिता प्रेमी हैं। पारिवारिक सुख-सुविधाएं आपके लिए सर्वोपरि हैं। लोग आपके प्रति बहुत जल्दी आकर्षित होते हैं। आप फैशन, मीडिया व कला जगत में चमकेंगे।",
      7: "नंबर 7 (केतु का अंक): आप गहरे विचारक, आध्यात्मिक और खोजी प्रवृत्ति के हैं। रहस्यमयी विद्याओं और दर्शनशास्त्र में आपकी गहरी रुचि होती है। आप दिखावे से दूर रहना पसंद करते हैं। आपका अंतर्ज्ञान बहुत तीव्र है।",
      8: "नंबर 8 (शनि का अंक): आप बेहद मेहनती, अनुशासित और न्यायप्रिय हैं। सफलता संघर्ष के बाद मिलती है पर स्थायी होती है। संपत्ति और व्यापार के मामलों में आप बहुत कुशल होते हैं। आलस्य और निराशा से दूर रहें।",
      9: "नंबर 9 (मंगल का अंक): आप ऊर्जावान, साहसी और परोपकारी स्वभाव के हैं। आप चुनौतियों का सामना डटकर करते हैं। मानवता की सेवा और नेतृत्व आपके प्रमुख गुण हैं। अपने उग्र स्वभाव पर थोड़ा नियंत्रण रखें।"
    };
    const title = type === 'radix' ? 'मूलांक' : type === 'destiny' ? 'भाग्यांक' : 'नामांक';
    return readings[num] ? `${title} ${readings[num]}` : "गणना में त्रुटि, कृपया विवरण जांचें।";
  };

  const getNumerologyGems = (radix: number) => {
    const details: { [key: number]: { color: string, day: string, numbers: string, gem: string } } = {
      1: { color: "पीला, सुनहरा, लाल", day: "रविवार, सोमवार", numbers: "1, 3, 5, 9", gem: "माणिक्य (Ruby)" },
      2: { color: "सफेद, हल्का हरा", day: "सोमवार, शुक्रवार", numbers: "2, 7, 9", gem: "मोती (Pearl)" },
      3: { color: "पीला, नारंगी", day: "गुरुवार, मंगलवार", numbers: "1, 3, 9", gem: "पुखराज (Yellow Sapphire)" },
      4: { color: "नीला, भूरा, ग्रे", day: "शनिवार, रविवार", numbers: "4, 5, 6", gem: "गोमेद (Hessonite)" },
      5: { color: "हरा, चमकीला सफेद", day: "बुधवार, शुक्रवार", numbers: "1, 5, 6", gem: "पन्ना (Emerald)" },
      6: { color: "सफेद, गुलाबी, आसमानी", day: "शुक्रवार, बुधवार", numbers: "5, 6, 8", gem: "हीरा या ओपल (Diamond/Opal)" },
      7: { color: "हल्का पीला, सफेद, चितकबरा", day: "सोमवार, गुरुवार", numbers: "2, 7, 9", gem: "लहसुनिया (Cat's Eye)" },
      8: { color: "काला, गहरा नीला", day: "शनिवार, शुक्रवार", numbers: "5, 6, 8", gem: "नीलम (Blue Sapphire)" },
      9: { color: "लाल, गुलाबी", day: "मंगलवार, रविवार", numbers: "1, 3, 9", gem: "मूंगा (Coral)" }
    };
    return details[radix] || { color: "---", day: "---", numbers: "---", gem: "---" };
  };

  return (
    <div className="w-full">
      {/* Neo-brutalist Navigation Tabs */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        <button
          onClick={() => setActiveTab('kundali')}
          className={`py-4 px-6 font-black uppercase text-sm md:text-lg border-4 border-foreground tracking-tight transition-all shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
            activeTab === 'kundali' ? 'bg-[#ccff00] text-black' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>कुंडली मेकिंग</span>
        </button>
        <button
          onClick={() => setActiveTab('numerology')}
          className={`py-4 px-6 font-black uppercase text-sm md:text-lg border-4 border-foreground tracking-tight transition-all shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
            activeTab === 'numerology' ? 'bg-[#ccff00] text-black' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>अंकशास्त्र (Numerology)</span>
        </button>
        <button
          onClick={() => setActiveTab('tarot')}
          className={`py-4 px-6 font-black uppercase text-sm md:text-lg border-4 border-foreground tracking-tight transition-all shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 ${
            activeTab === 'tarot' ? 'bg-[#ccff00] text-black' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span>टैरो रीडिंग (Tarot)</span>
        </button>
      </div>

      {/* --- TAB CONTENT: KUNDALI --- */}
      {activeTab === 'kundali' && (
        <div className="space-y-12">
          <div className="bg-white border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_#000]">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 text-foreground flex items-center gap-3">
              <Compass className="w-8 h-8 text-indigo-600" />
              जन्म कुंडली विवरण दर्ज करें
            </h2>
            <form onSubmit={calculateKundali} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black uppercase mb-2">आपका नाम (Name)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      placeholder="उदा. राहुल शर्मा"
                      value={kundaliInput.name}
                      onChange={(e) => setKundaliInput({ ...kundaliInput, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-4 border-foreground font-bold focus:outline-none focus:bg-indigo-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase mb-2">लिंग (Gender)</label>
                  <select
                    value={kundaliInput.gender}
                    onChange={(e) => setKundaliInput({ ...kundaliInput, gender: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-foreground font-bold focus:outline-none focus:bg-indigo-50 bg-white cursor-pointer"
                  >
                    <option value="Male">पुरुष (Male)</option>
                    <option value="Female">स्त्री (Female)</option>
                    <option value="Other">अन्य (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase mb-2">जन्म तिथि (Birth Date)</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="date"
                      required
                      value={kundaliInput.birthDate}
                      onChange={(e) => setKundaliInput({ ...kundaliInput, birthDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-4 border-foreground font-bold focus:outline-none focus:bg-indigo-50 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase mb-2">जन्म समय (Birth Time)</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="time"
                      required
                      value={kundaliInput.birthTime}
                      onChange={(e) => setKundaliInput({ ...kundaliInput, birthTime: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-4 border-foreground font-bold focus:outline-none focus:bg-indigo-50 bg-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-black uppercase mb-2">जन्म स्थान (Birth Place)</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      placeholder="उदा. नई दिल्ली, दिल्ली, भारत"
                      value={kundaliInput.birthPlace}
                      onChange={(e) => setKundaliInput({ ...kundaliInput, birthPlace: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-4 border-foreground font-bold focus:outline-none focus:bg-indigo-50"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ccff00] text-black border-4 border-foreground py-4 px-6 font-black uppercase text-md hover:-translate-y-1 transition-all shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] cursor-pointer"
              >
                कुंडली बनाएं (Generate Kundali)
              </button>
            </form>
          </div>

          {/* KUNDALI REPORT SECTION */}
          {kundaliResult && (
            <div className="space-y-12 animate-fade-in">
              <div className="bg-white border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_#000]">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-b-4 border-slate-100 pb-4 text-slate-800">
                  {kundaliInput.name} की जन्म कुंडली रिपोर्ट (Kundali Analysis)
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Column: Visual SVG Chart */}
                  <div className="flex flex-col items-center space-y-6">
                    <h4 className="text-xl font-black uppercase text-indigo-700 bg-indigo-50 px-4 py-2 border-2 border-indigo-200">
                      लग्न कुंडली (Lagna Chart)
                    </h4>
                    
                    {/* SVG North Indian Style Kundali Chart */}
                    <div className="w-full max-w-[360px] aspect-square bg-amber-50 border-4 border-foreground relative p-2 shadow-[4px_4px_0px_#000]">
                      <svg viewBox="0 0 300 300" className="w-full h-full text-foreground select-none">
                        {/* Outer Square */}
                        <rect x="0" y="0" width="300" height="300" fill="none" stroke="currentColor" strokeWidth="3" />
                        
                        {/* Diagonals */}
                        <line x1="0" y1="0" x2="300" y2="300" stroke="currentColor" strokeWidth="2.5" />
                        <line x1="300" y1="0" x2="0" y2="300" stroke="currentColor" strokeWidth="2.5" />
                        
                        {/* Inner Diamond (connecting midpoints) */}
                        <line x1="150" y1="0" x2="0" y2="150" stroke="currentColor" strokeWidth="2.5" />
                        <line x1="0" y1="150" x2="150" y2="300" stroke="currentColor" strokeWidth="2.5" />
                        <line x1="150" y1="300" x2="300" y2="150" stroke="currentColor" strokeWidth="2.5" />
                        <line x1="300" y1="150" x2="150" y2="0" stroke="currentColor" strokeWidth="2.5" />

                        {/* Rashi Labels & Planet lists in each of the 12 houses */}
                        {/* House 1 */}
                        <text x="150" y="115" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(1)}</text>
                        <text x="150" y="90" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(1).join(' ')}</text>

                        {/* House 2 */}
                        <text x="95" y="60" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(2)}</text>
                        <text x="75" y="40" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(2).join(' ')}</text>

                        {/* House 3 */}
                        <text x="60" y="95" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(3)}</text>
                        <text x="40" y="75" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(3).join(' ')}</text>

                        {/* House 4 */}
                        <text x="115" y="150" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(4)}</text>
                        <text x="90" y="150" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(4).join(' ')}</text>

                        {/* House 5 */}
                        <text x="60" y="210" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(5)}</text>
                        <text x="40" y="230" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(5).join(' ')}</text>

                        {/* House 6 */}
                        <text x="95" y="245" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(6)}</text>
                        <text x="75" y="265" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(6).join(' ')}</text>

                        {/* House 7 */}
                        <text x="150" y="195" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(7)}</text>
                        <text x="150" y="220" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(7).join(' ')}</text>

                        {/* House 8 */}
                        <text x="205" y="245" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(8)}</text>
                        <text x="225" y="265" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(8).join(' ')}</text>

                        {/* House 9 */}
                        <text x="240" y="210" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(9)}</text>
                        <text x="260" y="230" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(9).join(' ')}</text>

                        {/* House 10 */}
                        <text x="185" y="150" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(10)}</text>
                        <text x="210" y="150" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(10).join(' ')}</text>

                        {/* House 11 */}
                        <text x="240" y="95" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(11)}</text>
                        <text x="260" y="75" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(11).join(' ')}</text>

                        {/* House 12 */}
                        <text x="205" y="60" textAnchor="middle" className="text-xs font-black fill-red-600">{getRashiForHouse(12)}</text>
                        <text x="225" y="40" textAnchor="middle" className="text-[10px] font-black fill-slate-700">{getPlanetsInHouse(12).join(' ')}</text>
                      </svg>
                    </div>

                    <p className="text-xs font-bold text-slate-500 max-w-xs text-center leading-relaxed">
                      *नोट: लाल अंक लग्न व भावों के अनुसार राशियों को दर्शाते हैं। गृह संकेत: सूर्य, चन्द्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु, केतु।
                    </p>
                  </div>

                  {/* Right Column: Key Details */}
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black uppercase">पंचंग विवरण (Astro Details)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border-2 border-foreground bg-slate-50">
                        <span className="block text-xs font-bold uppercase text-slate-400">लग्न (Lagna)</span>
                        <span className="text-lg font-black">{RASHIS[kundaliResult.lagnaIndex].name}</span>
                      </div>
                      <div className="p-4 border-2 border-foreground bg-slate-50">
                        <span className="block text-xs font-bold uppercase text-slate-400">चंद्र राशि (Moon Sign)</span>
                        <span className="text-lg font-black">{RASHIS[kundaliResult.rashiIndex].name}</span>
                      </div>
                      <div className="p-4 border-2 border-foreground bg-slate-50">
                        <span className="block text-xs font-bold uppercase text-slate-400">नक्षत्र (Nakshatra)</span>
                        <span className="text-lg font-black">{NAKSHATRAS[kundaliResult.nakshatraIndex]}</span>
                      </div>
                      <div className="p-4 border-2 border-foreground bg-slate-50">
                        <span className="block text-xs font-bold uppercase text-slate-400">तत्व (Element)</span>
                        <span className="text-lg font-black">{RASHIS[kundaliResult.lagnaIndex].element}</span>
                      </div>
                    </div>

                    {/* Doshas Check cards */}
                    <div className="border-4 border-foreground p-5 space-y-4">
                      <h5 className="font-black uppercase text-md border-b-2 border-foreground pb-2">कुंडली दोष विश्लेषण (Dosha Analysis)</h5>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between font-bold text-sm">
                          <span>मांगलिक दोष (Manglik Dosha)</span>
                          <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${
                            kundaliResult.manglik ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          }`}>
                            {kundaliResult.manglik ? 'हाँ / सक्रिय' : 'नहीं / शांत'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between font-bold text-sm">
                          <span>शनि साढ़े साती (Sade Sati)</span>
                          <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${
                            kundaliResult.sadeSati ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          }`}>
                            {kundaliResult.sadeSati ? 'प्रभावशाली है' : 'प्रभावित नहीं है'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between font-bold text-sm">
                          <span>काल सर्प दोष (Kaal Sarp Dosha)</span>
                          <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${
                            kundaliResult.kaalSarp ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          }`}>
                            {kundaliResult.kaalSarp ? 'योग सक्रिय है' : 'अक्रिय / नहीं है'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Planets Table */}
                <div className="mt-12">
                  <h4 className="text-xl font-black uppercase mb-4">ग्रह स्पष्ट व भाव स्थिति (Planetary Placements)</h4>
                  <div className="overflow-x-auto border-4 border-foreground">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-foreground text-white font-black text-xs md:text-sm uppercase">
                          <th className="p-4 border-r border-slate-700">ग्रह (Planet)</th>
                          <th className="p-4 border-r border-slate-700">राशि (Rashi)</th>
                          <th className="p-4 border-r border-slate-700">भाव (House Position)</th>
                          <th className="p-4">रूलर स्वामी (Lord)</th>
                        </tr>
                      </thead>
                      <tbody className="font-bold text-sm text-slate-700">
                        {kundaliResult.planets.map((p, idx) => (
                          <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="p-4 border-r border-slate-200 font-black">{p.name}</td>
                            <td className="p-4 border-r border-slate-200">{RASHIS[p.rashiIndex].name}</td>
                            <td className="p-4 border-r border-slate-200">{p.house}वां भाव (House {p.house})</td>
                            <td className="p-4">{RASHIS[p.rashiIndex].ruler}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Predictions & Readings in Hindi */}
                <div className="mt-12 space-y-6">
                  <h4 className="text-2xl font-black uppercase">भविष्यफल व ज्योतिष विश्लेषण (Astrology Readings)</h4>
                  
                  <div className="p-6 border-2 border-foreground bg-indigo-50/50">
                    <h5 className="font-black text-lg text-indigo-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      1. लग्न प्रभाव (Lagna Effect)
                    </h5>
                    <p className="font-bold text-slate-700 leading-relaxed">
                      {getLagnaPrediction(kundaliResult.lagnaIndex)}
                    </p>
                  </div>

                  <div className="p-6 border-2 border-foreground bg-rose-50/50">
                    <h5 className="font-black text-lg text-rose-900 mb-2 flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      2. चन्द्र राशि व मन (Rashi Effect)
                    </h5>
                    <p className="font-bold text-slate-700 leading-relaxed">
                      {getRashiPrediction(kundaliResult.rashiIndex)}
                    </p>
                  </div>

                  <div className="p-6 border-2 border-foreground bg-emerald-50/50">
                    <h5 className="font-black text-lg text-emerald-900 mb-2 flex items-center gap-2">
                      <Gem className="w-5 h-5" />
                      3. ज्योतिषीय उपाय व रत्न (Remedies)
                    </h5>
                    <div className="font-bold text-slate-700 space-y-3">
                      <p>
                        आपके लग्न और चंद्रमा की स्थिति को देखते हुए निम्नलिखित सामान्य वैदिक उपाय आपके मार्ग को सुगम बनाने में सहायता कर सकते हैं:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                        <li><strong>लग्नेश मजबूत करने हेतु:</strong> अपने लग्न के स्वामी ({RASHIS[kundaliResult.lagnaIndex].ruler}) के मूल मन्त्रों का नित्य जाप करें।</li>
                        <li><strong>सुझाया रत्न:</strong> इस लग्न के जातकों को अपनी उन्नति के लिए <strong>{getNumerologyGems(kundaliResult.lagnaIndex + 1).gem}</strong> रत्न धारण करने से पूर्व किसी योग्य पंडित से परामर्श अवश्य लेना चाहिए।</li>
                        <li><strong>विशेष सलाह:</strong> हर मंगलवार हनुमान चालीसा का पाठ करें और वृद्धों का आदर करें।</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB CONTENT: NUMEROLOGY --- */}
      {activeTab === 'numerology' && (
        <div className="space-y-12">
          <div className="bg-white border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_#000]">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 text-foreground flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-500" />
              मूलांक, भाग्यांक व नामांक कैलकुलेटर
            </h2>
            <form onSubmit={calculateNumerology} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black uppercase mb-2">अंग्रेजी में पूरा नाम (Full Name in English)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      placeholder="उदा. MOHIT JAIN"
                      value={numInput.name}
                      onChange={(e) => setNumInput({ ...numInput, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-4 border-foreground font-bold focus:outline-none focus:bg-amber-50"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400 mt-1 block">* नामांक के लिए केवल अंग्रेजी अक्षरों (A-Z) का प्रयोग करें।</span>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase mb-2">जन्म तिथि (Birth Date)</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="date"
                      required
                      value={numInput.birthDate}
                      onChange={(e) => setNumInput({ ...numInput, birthDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-4 border-foreground font-bold focus:outline-none focus:bg-amber-50 bg-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ccff00] text-black border-4 border-foreground py-4 px-6 font-black uppercase text-md hover:-translate-y-1 transition-all shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] cursor-pointer"
              >
                अंक ज्योतिष फल देखें (Calculate Numbers)
              </button>
            </form>
          </div>

          {/* NUMEROLOGY RESULT */}
          {numResult && (
            <div className="space-y-12 animate-fade-in">
              <div className="bg-white border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_#000]">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-b-4 border-slate-100 pb-4 text-slate-800">
                  {numInput.name || 'आपका'} अंक ज्योतिष विश्लेषण (Numerology Analysis)
                </h3>

                {/* Scorecards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border-4 border-foreground bg-indigo-50 shadow-[4px_4px_0px_#000] flex flex-col items-center">
                    <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-100 px-3 py-1 mb-2">मूलांक (Radix)</span>
                    <span className="text-6xl font-black text-indigo-900">{numResult.radix}</span>
                    <span className="text-xs font-bold text-indigo-600 mt-2 text-center">जन्म की तिथि का योग (स्वभाव)</span>
                  </div>

                  <div className="p-6 border-4 border-foreground bg-amber-50 shadow-[4px_4px_0px_#000] flex flex-col items-center">
                    <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-3 py-1 mb-2">भाग्यांक (Destiny)</span>
                    <span className="text-6xl font-black text-amber-900">{numResult.destiny}</span>
                    <span className="text-xs font-bold text-amber-600 mt-2 text-center">पूर्ण जन्म तिथि का योग (करियर/पथ)</span>
                  </div>

                  <div className="p-6 border-4 border-foreground bg-rose-50 shadow-[4px_4px_0px_#000] flex flex-col items-center">
                    <span className="text-xs font-black uppercase text-rose-700 bg-rose-100 px-3 py-1 mb-2">नामांक (Name Number)</span>
                    <span className="text-6xl font-black text-rose-900">{numResult.nameNumber || 'N/A'}</span>
                    <span className="text-xs font-bold text-rose-600 mt-2 text-center">नाम के अक्षरों का योग (सामाजिक प्रभाव)</span>
                  </div>
                </div>

                {/* Detailed readings */}
                <div className="mt-12 space-y-6">
                  <h4 className="text-2xl font-black uppercase">विस्तृत फलादेश (Detailed Predictions)</h4>
                  
                  <div className="p-6 border-2 border-foreground bg-slate-50">
                    <h5 className="font-black text-lg mb-2 flex items-center gap-2 text-indigo-900">
                      <Award className="w-5 h-5" />
                      मूलांक {numResult.radix} का फल (Radix Reading)
                    </h5>
                    <p className="font-bold text-slate-700 leading-relaxed">
                      {getNumerologyReading(numResult.radix, 'radix')}
                    </p>
                  </div>

                  <div className="p-6 border-2 border-foreground bg-slate-50">
                    <h5 className="font-black text-lg mb-2 flex items-center gap-2 text-amber-900">
                      <BookOpen className="w-5 h-5" />
                      भाग्यांक {numResult.destiny} का फल (Destiny Reading)
                    </h5>
                    <p className="font-bold text-slate-700 leading-relaxed">
                      {getNumerologyReading(numResult.destiny, 'destiny')}
                    </p>
                  </div>

                  {numResult.nameNumber > 0 && (
                    <div className="p-6 border-2 border-foreground bg-slate-50">
                      <h5 className="font-black text-lg mb-2 flex items-center gap-2 text-rose-900">
                        <User className="w-5 h-5" />
                        नामांक {numResult.nameNumber} का फल (Name Reading)
                      </h5>
                      <p className="font-bold text-slate-700 leading-relaxed">
                        {getNumerologyReading(numResult.nameNumber, 'name')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Lucky Tables */}
                <div className="mt-12">
                  <h4 className="text-2xl font-black uppercase mb-6">मूलांक {numResult.radix} के अनुकूल कारक (Lucky Factors)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-4 border-foreground p-6 bg-slate-50">
                      <table className="w-full text-left border-collapse font-bold text-sm text-slate-700">
                        <tbody>
                          <tr className="border-b border-slate-200">
                            <td className="py-3 font-black text-slate-500">अनुकूल रंग (Lucky Colors)</td>
                            <td className="py-3 text-right">{getNumerologyGems(numResult.radix).color}</td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="py-3 font-black text-slate-500">अनुकूल दिन (Lucky Days)</td>
                            <td className="py-3 text-right">{getNumerologyGems(numResult.radix).day}</td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="py-3 font-black text-slate-500">मित्र अंक (Friendly Numbers)</td>
                            <td className="py-3 text-right">{getNumerologyGems(numResult.radix).numbers}</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-black text-slate-500">शुभ रत्न (Lucky Gemstone)</td>
                            <td className="py-3 text-right text-indigo-700 font-black">{getNumerologyGems(numResult.radix).gem}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="border-4 border-foreground p-6 bg-amber-50/50 flex flex-col justify-center">
                      <h5 className="font-black text-lg mb-2 text-slate-800">कौंसलर सलाह व अंक संकेत</h5>
                      <p className="font-bold text-sm text-slate-600 leading-relaxed">
                        मूलांक और भाग्यांक का मिलन आपके जीवन के महत्वपूर्ण निर्णयों जैसे व्यापार, विवाह और उच्च शिक्षा (MBA, MCA, BBA) के चयन को प्रभावित करता है। यदि आपका मूलांक व भाग्यांक मित्र अंक हैं, तो आपकी राह आसान होती है। विरोधी अंक होने पर उचित रत्न या यंत्र से दोष निवारण किया जाता है।
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB CONTENT: TAROT --- */}
      {activeTab === 'tarot' && (
        <div className="space-y-12">
          <div className="bg-white border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_#000]">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 text-foreground flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-rose-500" />
              ऑनलाइन टैरो कार्ड रीडिंग (Tarot Reading)
            </h2>
            
            <div className="space-y-6">
              <div className="border-4 border-foreground p-6 bg-slate-50">
                <h3 className="font-black uppercase text-lg mb-3">रीडिंग का प्रकार चुनें</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-3 font-black text-sm uppercase cursor-pointer">
                    <input
                      type="radio"
                      name="tarotType"
                      checked={tarotType === 'one'}
                      onChange={() => setTarotType('one')}
                      className="w-5 h-5 cursor-pointer accent-indigo-600"
                    />
                    <span>एक कार्ड रीडिंग (One Card - दैनिक मार्गदर्शन)</span>
                  </label>
                  <label className="flex items-center gap-3 font-black text-sm uppercase cursor-pointer">
                    <input
                      type="radio"
                      name="tarotType"
                      checked={tarotType === 'three'}
                      onChange={() => setTarotType('three')}
                      className="w-5 h-5 cursor-pointer accent-indigo-600"
                    />
                    <span>तीन कार्ड रीडिंग (Three Cards - भूत, वर्तमान, भविष्य)</span>
                  </label>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={startTarotReading}
                  disabled={isShuffling}
                  className="bg-[#ccff00] text-black border-4 border-foreground py-4 px-8 font-black uppercase text-lg hover:-translate-y-1 transition-all shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] disabled:bg-slate-200 disabled:shadow-none disabled:-translate-y-0 cursor-pointer"
                >
                  {isShuffling ? 'कार्डों को फेंटा जा रहा है...' : 'टैरो कार्ड्स चुनें (Start Reading)'}
                </button>
              </div>
            </div>
          </div>

          {/* TAROT CARD DECK / DRAWING SCREEN */}
          {isShuffling && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
              <div className="relative w-24 h-36 border-4 border-dashed border-slate-400 rounded-2xl flex items-center justify-center bg-slate-100">
                <Sparkles className="w-10 h-10 text-slate-400 spin-animation" />
              </div>
              <p className="font-black uppercase text-slate-500 tracking-wider">ऊर्जा को केंद्रित करें और मन में प्रश्न सोचें...</p>
            </div>
          )}

          {drawnCards.length > 0 && !isShuffling && (
            <div className="space-y-12 animate-fade-in">
              <div className="bg-white border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_#000]">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-8 text-center border-b-4 border-slate-100 pb-4">
                  आपके चुने गए टैरो कार्ड्स (Your Tarot Cards)
                </h3>

                <div className={`grid grid-cols-1 gap-8 ${tarotType === 'three' ? 'lg:grid-cols-3' : 'max-w-md mx-auto'}`}>
                  {drawnCards.map((dc, idx) => (
                    <div key={idx} className="border-4 border-foreground p-6 flex flex-col items-center bg-slate-50 shadow-[4px_4px_0px_#000] hover:translate-y-[-4px] transition-transform">
                      <span className="text-xs font-black uppercase text-rose-700 bg-rose-100 px-3 py-1 mb-4">
                        {dc.position === 'general' ? 'सामान्य मार्गदर्शन' : dc.position === 'past' ? 'भूतकाल (Past)' : dc.position === 'present' ? 'वर्तमान (Present)' : 'भविष्यकाल (Future)'}
                      </span>
                      
                      {/* Interactive Flip Card Design */}
                      <div className="w-40 h-60 bg-gradient-to-br from-indigo-900 to-slate-900 border-4 border-foreground rounded-xl flex flex-col items-center justify-center p-4 text-center text-white relative shadow-lg overflow-hidden group">
                        <div className="absolute inset-2 border-2 border-amber-400/30 rounded-lg pointer-events-none"></div>
                        <Compass className="w-12 h-12 text-amber-400 mb-2 animate-spin-slow" />
                        <h5 className="font-black text-sm uppercase tracking-wider text-amber-300">{dc.card.hindiName}</h5>
                        <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{dc.card.name}</span>
                        <div className="mt-4 text-[9px] font-bold text-amber-200/80 line-clamp-3 bg-black/40 p-2 rounded">
                          {dc.card.description}
                        </div>
                      </div>

                      {/* Card Meaning Interpretation */}
                      <div className="mt-6 space-y-3 w-full">
                        <h6 className="font-black uppercase text-sm border-b-2 border-foreground pb-1 text-slate-800">कार्ड का सन्देश:</h6>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed">
                          {dc.position === 'general' && dc.card.presentMeaning}
                          {dc.position === 'past' && dc.card.pastMeaning}
                          {dc.position === 'present' && dc.card.presentMeaning}
                          {dc.position === 'future' && dc.card.futureMeaning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-4 border-foreground p-6 bg-rose-50/50 mt-12">
                  <h4 className="font-black uppercase text-lg text-rose-900 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    टैरो संदेश मार्गदर्शन
                  </h4>
                  <p className="font-bold text-sm text-slate-600 leading-relaxed">
                    टैरो कार्ड्स आपके अंतर्मन और ब्रह्मांडीय ऊर्जा का प्रतिबिंब होते हैं। ये कोई अपरिवर्तनीय नियम नहीं हैं बल्कि एक सुझाव और दिशा-निर्देश हैं जो आपको परिस्थितियों को समझने और सही निर्णय लेने में मदद करते हैं। कर्म प्रधान है, अपनी सोच और प्रयासों को सदैव सकारात्मक रखें।
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
