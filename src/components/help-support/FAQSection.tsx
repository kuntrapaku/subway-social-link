
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqData = {
  Profile: [
    {
      question: "How do I update my profile information?",
      answer: "Go to your Profile page and click the 'Edit Profile' button. You can update your display name, bio, profile picture, and other details from there."
    },
    {
      question: "Can I change my username?",
      answer: "Yes, you can change your username from the Profile Settings page. Note that changing your username will update your public profile URL."
    },
    {
      question: "How do I make my profile public?",
      answer: "In the Profile Builder, toggle the 'Make Profile Public' option. This will generate a shareable public URL for your profile."
    }
  ],
  Projects: [
    {
      question: "How do I create a new project?",
      answer: "Navigate to the Projects page and click 'New Project'. Fill in the project details, upload a cover image, and save your project."
    },
    {
      question: "Can I collaborate with others on projects?",
      answer: "Yes! You can add collaborators to your projects by going to the project settings and inviting team members by email."
    },
    {
      question: "What file formats are supported for project uploads?",
      answer: "We support common video formats (MP4, MOV, AVI) for trailers and image formats (JPG, PNG, WebP) for cover images."
    }
  ],
  Analytics: [
    {
      question: "How are profile views counted?",
      answer: "Profile views are counted each time someone visits your public profile. Multiple views from the same user are counted separately."
    },
    {
      question: "What does 'Traffic Source' show?",
      answer: "Traffic Source shows where your profile visitors are coming from, such as direct links, social media, or search engines."
    },
    {
      question: "How often is analytics data updated?",
      answer: "Analytics data is updated in real-time. You should see new views and clicks reflected within a few minutes."
    }
  ],
  Account: [
    {
      question: "How do I change my password?",
      answer: "Go to Account Settings and click on 'Change Password'. You'll need to enter your current password and confirm your new password."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account from the Account Settings page. Please note that this action is irreversible and will permanently delete all your data."
    },
    {
      question: "How do I enable two-factor authentication?",
      answer: "Two-factor authentication can be enabled in your Account Security settings. We recommend using an authenticator app for the best security."
    }
  ]
};

export const FAQSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {Object.entries(faqData).map(([category, faqs]) => (
        <Card key={category} className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`${category}-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
