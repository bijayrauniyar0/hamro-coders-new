/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Settings } from 'react-slick';
import {
  BookOpen,
  Briefcase,
  Calculator,
  Clock,
  GraduationCap,
  Laptop2,
  Lightbulb,
  LineChart,
  LucideIcon,
  MessagesSquare,
  Pencil,
  Stethoscope,
  Trophy,
} from 'lucide-react';

export interface StreamsCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  className?: string;
}
export interface FeatureCardProps extends StreamsCardProps {}
export const Streams: StreamsCardProps[] = [
  {
    Icon: GraduationCap,
    title: 'College Entrance Exams',
    description: 'Engineering, Medical, Law',
    iconColor: 'text-indigo-700',
    bgColor: 'bg-indigo-100',
  },
  {
    Icon: Briefcase,
    title: 'Government Jobs',
    description: 'Civil Services, Banking, Railways',
    iconColor: 'text-orange-700',
    bgColor: 'bg-orange-100',
  },
  {
    Icon: Laptop2,
    title: 'IT Certifications',
    description: 'Programming, Networking, Security',
    iconColor: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  {
    Icon: Stethoscope,
    title: 'Medical Exams',
    description: 'NEET, AIIMS, Medical PG',
    iconColor: 'text-rose-700',
    bgColor: 'bg-rose-100',
  },
  {
    Icon: Calculator,
    title: 'Engineering Exams',
    description: 'JEE, GATE, ESE',
    iconColor: 'text-teal-700',
    bgColor: 'bg-teal-100',
  },
  {
    Icon: BookOpen,
    title: 'Entrance Exams',
    description: 'CMAT, +2 Entrance, BBA Entrance',
    iconColor: 'text-green-700',
    bgColor: 'bg-green-100',
  },
];

export const features: FeatureCardProps[] = [
  {
    title: 'Realistic Mock Tests',
    description:
      'Experience exam-like conditions with timed tests that mirror the actual format and difficulty level.',
    Icon: Pencil,
    iconColor: 'text-purple-700',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Detailed Analytics',
    description:
      'Track your progress with comprehensive performance metrics, including test-wise analysis.',
    Icon: LineChart,
    iconColor: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Competitive Leaderboards',
    description:
      'Compete with peers nationwide and benchmark your performance against top performers.',
    Icon: Trophy,
    iconColor: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  {
    title: 'Flexible Study Schedule',
    description:
      'Practice anytime, anywhere with 24/7 access to all mock tests and study materials.',
    Icon: Clock,
    iconColor: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
  },
  {
    title: 'Smart Question Bank',
    description:
      'Access thousands of quality MCQs with detailed explanations and solutions.',
    Icon: Lightbulb,
    iconColor: 'text-pink-700',
    bgColor: 'bg-pink-100',
  },

  {
    title: 'Community Support',
    description:
      'Connect with fellow aspirants and experts to discuss questions and clarify doubts.',
    Icon: MessagesSquare,
    iconColor: 'text-teal-700',
    bgColor: 'bg-teal-100',
  },
];

// testimonialsData.ts
export interface Testimonial {
  name: string;
  role: string;
  message: string;
  imageUrl: string;
  rating: number; // out of 5, e.g., 4.5 = 4 stars + half
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sita Karki',
    role: 'Lok Sewa Aspirant',
    message:
      'MockSewa को प्रश्न बैंकले मलाई तयारीमा निकै मद्दत गर्‍यो। मैले मेरो कमजोर पक्ष चिनेर त्यसअनुसार अभ्यास गरे, र अन्ततः मैले प्रथम प्रयासमै लेखित परीक्षा पास गरेँ।',
    imageUrl: 'https://randomuser.me/api/portraits/women/79.jpg',
    rating: 5,
  },
  {
    name: 'Bikash Thapa',
    role: 'Engineering Entrance - IOE',
    message:
      'Leaderboard र समय-नियन्त्रण अभ्यासहरूले मलाई दबाबमा कसरी राम्रो गर्ने भन्ने सिकायो। MockSewa बाट तयारी गरेपछि, मैले पुल्चोक क्याम्पसमा भर्ना पाइँ।',
    imageUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
    rating: 4.5,
  },
  {
    name: 'Pratiksha Adhikari',
    role: 'MBBS Entrance - KU & IOM',
    message:
      'Biology र Chemistry मा मेरो प्रदर्शन MockSewa को एनालिटिक्स प्रणालीले निकै सुधार गर्‍यो। तीन महिनाको तयारीमा मेरो स्कोर 20% ले बढ्यो।',
    imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
  },
  {
    name: 'Rajan Bhandari',
    role: 'Public Service Commission (PSC)',
    message:
      'म नियमित MockSewa टेस्ट दिन्थें। तिनीहरूको एनालिटिक्सले मेरो तयारीलाई ट्र्याक गर्न र रणनीति बनाउन सहयोग गर्‍यो। अन्ततः, मैले नायब सुब्बा को परीक्षा पास गरेँ।',
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 4.5,
  },
  {
    name: 'Anisha Maharjan',
    role: 'CTEVT Nursing Entrance',
    message:
      'CTEVT को तयारीका लागि MockSewa को सामग्री धेरै उपयोगी थियो। स्पष्ट स्पष्टीकरणसहितको प्रश्नहरू मलाई मन पर्यो। अन्ततः, मेरै रोजाइको कलेजमा भर्ना भएँ।',
    imageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
  },
  {
    name: 'Kiran Khadka',
    role: 'Banking Preparation - NRB & ADBL',
    message:
      'MockSewa का प्रश्न र मोक टेस्टहरूले मलाई बैंकिंग तयारीमा गहिराइमा जान प्रेरणा दियो। म confident थिएँ, किनकि मैले प्रत्येक विषयमा राम्रो अभ्यास पाएको थिएँ।',
    imageUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
    rating: 4.5,
  },
  {
    name: 'Niruta Shrestha',
    role: 'Teaching License Exam',
    message:
      'शिक्षक सेवा आयोगको तयारीका लागि MockSewa को विस्तृत अभ्यास सेटहरू निकै उपयोगी थिए। नियमित अभ्यासले मेरो आत्मविश्वास बढायो।',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    name: 'Sanjay Rai',
    role: 'Computer Operator - PSC',
    message:
      'Typing practice र computer knowledge सेग्मेन्ट MockSewa मा शानदार थियो। मैले सफलतापूर्वक PSC को कम्प्युटर अपरेटर परीक्षा पास गरेँ।',
    imageUrl: 'https://randomuser.me/api/portraits/men/38.jpg',
    rating: 4.5,
  },
];

export const testimonialSliderSettings: Settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 2000,
  cssEase: '',
  centerMode: true,
  centerPadding: '0',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: false,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 0,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
};
