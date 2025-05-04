import React from 'react';
import Slider from 'react-slick';

import BindContentContainer from '@Components/common/BindContentContainer';
import Footer from '@Components/common/Footer';
import { FlexColumn, FlexRow, Grid } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import HomePageSVG from '@Assets/images/animating-home.svg';
import {
  features,
  Streams,
  testimonials,
  testimonialSliderSettings,
} from '@Constants/Home';

import AnimatingSVg from './AnimatingSVG';
import FeatureCard from './FeaturesCard';
import Section from './Section';
import StreamsCard from './StreamsCard';
import TestimonialCard from './TestimonialCard';

const Home = () => {
  return (
    <>
      <BindContentContainer className="overflow-hidden">
        <FlexColumn className="w-full gap-8 md:gap-10 lg:gap-12">
          <FlexRow className="items-center justify-between gap-4 max-md:flex-wrap md:gap-8">
            <FlexColumn className="items-start gap-6 md:max-w-[40%] md:gap-8">
              <FlexColumn className="gap-2 md:gap-3">
                <p className="text-lg font-bold md:text-xl lg:text-2xl">
                  Ace Your Exams with MockSewa
                </p>
                <p className="text-base text-matt-100 md:text-lg lg:text-xl">
                  Practice with high-quality MCQs, compete on leaderboards, and
                  analyze your performance with detailed metrics.
                </p>
              </FlexColumn>
              <Button className="w-fit">Explore Exams</Button>
            </FlexColumn>
            <AnimatingSVg />
            {/* <img
              src={HomePageSVG}
              alt="Student taking online test"
              className="select-none object-contain md:w-[60%] lg:max-w-[35rem]"
            /> */}
          </FlexRow>

          <Grid className="grid-cols-2 gap-4 text-center md:grid-cols-4 md:gap-6 lg:gap-8">
            <div>
              <p className="text-base font-bold text-primary-600 md:text-lg lg:text-xl">
                50+
              </p>
              <p className="text-md text-gray-600 lg:text-base">
                Exam Categories
              </p>
            </div>
            <div>
              <p className="text-base font-bold text-primary-600 md:text-lg lg:text-xl">
                10,000+
              </p>
              <p className="text-md text-gray-600 lg:text-base">Questions</p>
            </div>
            <div>
              <p className="text-base font-bold text-primary-600 md:text-lg lg:text-xl">
                25,000+
              </p>
              <p className="text-md text-gray-600 lg:text-base">Students</p>
            </div>
            <div>
              <p className="text-base font-bold text-primary-600 md:text-lg lg:text-xl">
                98%
              </p>
              <p className="text-md text-gray-600 lg:text-base">Success Rate</p>
            </div>
          </Grid>

          <Section
            header="Why Choose MockSewa?"
            description="Our platform is designed to give you the competitive edge with advanced features that simulate real exam conditions and provide detailed performance analysis."
          >
            <Grid className="gap-2 sm:grid-cols-3 sm:gap-4 lg:gap-6">
              {features.map(feature => (
                <FeatureCard {...feature} key={feature.title} />
              ))}
            </Grid>
          </Section>

          <Section
            header="Explore Our Exam Categories"
            description=" MockSewa offers comprehensive preparation for a wide range of competitive exams."
          >
            <div className="grid gap-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
              {Streams.map((stream, index) => (
                <StreamsCard {...stream} key={index} />
              ))}
            </div>
            <Button className="mx-auto w-fit" variant={'secondary'}>
              View All Exams
            </Button>
          </Section>

          <Section
            header="What Our Students Say"
            description="Hear from students who improved their scores and achieved their goals with MockSewa."
          >
            <Slider {...testimonialSliderSettings} className="w-full">
              {testimonials.map((testimonial, i) => (
                <div className="px-2" key={i}>
                  <TestimonialCard
                    key={(testimonial.name, i)}
                    testimonial={testimonial}
                  />
                </div>
              ))}
            </Slider>
          </Section>

          <Section
            header="Ready to Elevate Your Exam Preparation?"
            description="Join thousands of successful students who transformed their preparation with MockSewa."
          >
            <Button className="mx-auto w-fit">Get Started Now</Button>
          </Section>
        </FlexColumn>
      </BindContentContainer>

      <Footer />
    </>
  );
};

export default Home;
