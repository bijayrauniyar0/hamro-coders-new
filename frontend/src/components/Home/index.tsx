import React from 'react';
import Slider from 'react-slick';

import BindContentContainer from '@Components/common/BindContentContainer';
import Footer from '@Components/common/Footer';
import { FlexColumn, FlexRow, Grid } from '@Components/common/Layouts';
import BackgroundParticles from '@Components/common/ParticalsAnimation';
import { Button } from '@Components/radix/Button';
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

const platformMetrics = [
  {
    title: 'Exam Categories',
    value: '5+',
  },
  {
    title: 'Questions',
    value: '5,000+',
  },
  {
    title: 'Students',
    value: '200+',
  },
];
const Home = () => {
  return (
    <>
      <BindContentContainer className="overflow-hidden max-sm:px-4">
        <FlexColumn className="w-full gap-8 md:gap-10 lg:gap-12">
          <FlexRow className="z-[9] items-center justify-between gap-4 pb-8 max-md:flex-wrap md:gap-8 md:pb-12 lg:pb-16">
            <FlexColumn className="items-start gap-6 md:max-w-[40%] md:gap-8">
              <FlexColumn className="gap-2 md:gap-3">
                <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  Ace Your <span className="text-primary-600">Exams</span> with
                  MockSewa
                </p>
                <p className="text-base text-matt-100 md:text-lg lg:text-xl">
                  Practice with high-quality MCQs, compete on leaderboards, and
                  analyze your performance with detailed metrics.
                </p>
              </FlexColumn>
              <Button className="w-fit bg-secondary-100">Explore Exams</Button>
            </FlexColumn>
            <AnimatingSVg />
            {/* <img
              src={HomePageSVG}
              alt="Student taking online test"
              className="select-none object-contain md:w-[60%] lg:max-w-[35rem]"
            /> */}
          </FlexRow>
          <Grid className="z-[9] mx-auto grid-cols-3 gap-2 text-center max-md:w-full md:w-4/5 md:gap-6 lg:w-1/2 lg:gap-8">
            {platformMetrics.map(metric => (
              <div key={metric.title}>
                <p className="lg:text-xl2 text-lg font-bold text-primary-600 md:text-xl lg:text-3xl">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600 md:text-base lg:text-lg">
                  {metric.title}
                </p>
              </div>
            ))}
          </Grid>
          {/* <div
        className="relative bg-purple-50 bg-cover bg-center bg-no-repeat py-16 lg:py-24"
        // style={{ backgroundImage: `url(${bgImage})` }}
      > */}
          {/* <div className="absolute inset-0 bg-[#5f576462] z-10 opacity-30"></div> */}
          <div className="relative z-[8] overflow-hidden rounded-lg !bg-[rgba(243,236,250,0.7)] px-4 py-8 md:px-16 md:py-16 lg:px-20 lg:py-20">
            <div className="relative flex flex-col gap-8 sm:grid-cols-3 sm:gap-4 md:grid lg:gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  {...feature}
                  key={feature.title}
                  className={`${index % 2 === 0 ? 'max-md:items-start' : 'max-md:items-end'}`}
                />
              ))}
            </div>
          </div>
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

          <div className="z-[9] rounded-lg bg-gradient-to-tl from-primary-50 to-primary-100 px-1 pt-8 shadow-sm">
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
          </div>

          <Section
            header="Ready to Elevate Your Exam Preparation?"
            description="Join thousands of successful students who transformed their preparation with MockSewa."
          >
            <Button className="mx-auto w-fit">Get Started Now</Button>
          </Section>
        </FlexColumn>
      </BindContentContainer>
      <BackgroundParticles />

      <Footer />
    </>
  );
};

export default Home;
