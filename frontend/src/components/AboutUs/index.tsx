import { CheckCircle, Target, Users } from 'lucide-react';

import BindContentContainer from '@Components/common/BindContentContainer';
import Footer from '@Components/common/Footer';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import AboutUsImage from '@Assets/images/about-us.png';
import FounderProfile from '@Assets/images/founder.jpg';
import StudentsExamImage from '@Assets/images/students-exam.png';

// import CollaborateForm from './CollaborationForm';

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <section className="py-4 md:py-16">
        <FlexColumn className="container mx-auto gap-4 px-6">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              About <span className="text-primary-600">MockSewa</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Empowering students to achieve academic excellence through
              <br /> innovative exam preparation.
            </p>
          </div>

          <div className="flex flex-col items-center gap-12 md:flex-row">
            <img
              src={AboutUsImage}
              alt="MockSewa team"
              className="aspect-square w-full object-contain md:w-2/5"
            />

            <FlexColumn className="gap-6 lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600">
                At MockSewa, we&apos;re on a mission to transform how students
                prepare for competitive exams. We combine technology with
                educational expertise to create a platform that provides
                realistic exam simulations, personalized learning paths, and
                actionable insights to help students achieve their academic
                goals.
              </p>
              <FlexRow className="flex-wrap gap-4">
                <span className="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                  Student-Centric
                </span>
                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                  Technology-Driven
                </span>
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                  Quality-Focused
                </span>
                <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700">
                  Continuously Evolving
                </span>
              </FlexRow>
            </FlexColumn>
          </div>
        </FlexColumn>
      </section>

      {/* Our Story */}
      <section className="bg-gray-100 py-8 md:py-12 lg:py-16">
        <BindContentContainer>
          <FlexColumn className="w-full items-start gap-12">
            <FlexColumn className="gap-2">
              <p className="text-md font-bold max-lg:text-center md:text-base lg:text-lg">
                Our Story
              </p>
              <p className="text-xl font-semibold text-gray-800 max-lg:text-center md:text-4xl lg:text-[2.25rem]">
                <span className="font-semibold text-primary-600">
                  Mock Sewa
                </span>{' '}
                is an outcome of the challenges{' '}
                <span className="text-primary-700">Students</span> face during
                exam preparation, built to provide accessible mock tests and
                better support.
              </p>
            </FlexColumn>
            <div className="flex flex-col items-start gap-8 md:gap-12 lg:flex-row">
              <FlexColumn className="items-center gap-4 max-lg:text-center lg:items-start lg:gap-8 text-sm md:lg:text-md lg:text-base">
                <p>
                  The story of Mock Sewa started not with a team or a plan, but
                  with frustration. As a student preparing for competitive exams
                  in Nepal, I found myself overwhelmed by the lack of structured
                  resources. Mock tests were outdated, scattered, and often
                  irrelevant to the actual exams. I spent hours searching for
                  practice questions, trying to simulate test environments on my
                  own — but the process felt broken and demotivating.
                </p>

                <p>I knew there had to be a better way.</p>

                <p>
                  Instead of giving up, I decided to turn that frustration into
                  something meaningful. I started working alone on building a
                  platform that could offer what I had been missing — organized,
                  relevant, and accessible mock exams that students could trust.
                  There were no shortcuts, no team behind the scenes — just long
                  nights, countless iterations, and the belief that students in
                  Nepal deserve better.
                </p>

                <p>
                  Mock Sewa was created to solve a problem I personally lived
                  through. It’s a reflection of my own challenges and the
                  determination to ensure others don’t face the same struggle.
                  What began as a small idea has now taken shape — and while
                  we&apos;re just getting started, the vision is clear and the
                  journey has begun.
                </p>
              </FlexColumn>
              <img
                src={StudentsExamImage}
                alt=""
                className="aspect-square w-[25rem] rounded-lg object-cover max-lg:mx-auto"
              />
            </div>
          </FlexColumn>
        </BindContentContainer>
      </section>

      {/* Our Values */}
      <section className="py-8 md:py-16">
        <BindContentContainer>
          <FlexColumn className="gap-12">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Our Core Values
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600">
                The principles that guide our work and shape our approach to
                education.
              </p>
            </div>

            <FlexRow className="flex-wrap justify-between gap-8">
              {/* Value 1 */}
              <FlexColumn className="gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                  <Target className="text-primary-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Student Success
                </h3>
                <p className="text-gray-600">
                  We measure our success by the achievements of our students.
                  Every feature, every question, and every update is designed
                  with student success in mind.
                </p>
              </FlexColumn>

              {/* Value 2 */}
              <FlexColumn className="gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
                  <CheckCircle className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Quality Content
                </h3>
                <p className="text-gray-600">
                  We maintain rigorous standards for our question bank, ensuring
                  that every question is relevant, accurately represents exam
                  patterns, and includes detailed explanations.
                </p>
              </FlexColumn>

              {/* Value 3 */}
              <FlexColumn className="gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <Users className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Community</h3>
                <p className="text-gray-600">
                  We believe in the power of peer learning. Our platform fosters
                  a supportive community where students can learn from each
                  other and grow together.
                </p>
              </FlexColumn>
            </FlexRow>
          </FlexColumn>
        </BindContentContainer>
      </section>

      {/* Team Section */}
      <section className="bg-white py-8 md:py-12 lg:py-16 lg:pb-32">
        <BindContentContainer>
          <FlexColumn className="gap-6 px-6 md:gap-8 lg:gap-12">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
              Meet The Founder
            </h2>

            {/* Team Member 1 */}
            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16 lg:gap-24">
              <img
                src={FounderProfile}
                alt="Bijay Rauniyar"
                className="aspect-square rounded-full border-[5px] border-white bg-red-300 object-cover shadow-md max-sm:w-full max-md:max-w-[15rem] md:w-[30%] lg:w-1/4 max-w-[25rem]"
              />
              <FlexColumn className="items-start gap-4">
                <FlexColumn className='gap-2 lg:gap-4 w-full'>
                    <h3 className="text-xl font-bold text-gray-900 max-md:w-full max-md:text-center">
                      Bijay Rauniyar
                    </h3>
                    <p className="text-primary-600 max-md:w-full max-md:text-center">
                      Founder & CEO
                    </p>
                </FlexColumn>
                <p className="text-gray-600 max-md:text-center">
                  As a Full Stack Developer with extensive experience in
                  building tools and web applications, I&apos;m passionate about
                  leveraging technology to revolutionize academic learning with
                  real-world development. <br />
                  Having personally experienced the challenges of exam
                  preparation, I created MockSewa to provide students with a
                  comprehensive, quality-focused platform that makes test prep
                  more effective and accessible.
                </p>
              </FlexColumn>
            </div>
          </FlexColumn>
        </BindContentContainer>
      </section>

      {/* Achievements */}
      {/* <section className="bg-white py-16">
        <FlexColumn className="container mx-auto gap-12 px-6">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Our Achievements
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Milestones that mark our journey and reinforce our commitment to
              educational excellence.
            </p>
          </div>

          <FlexRow className="flex-col justify-between gap-8 lg:flex-row">
            <FlexRow className="gap-8 rounded-xl bg-gray-50 p-8 shadow-md lg:w-1/2">
              <FlexColumn className="w-full gap-8">
                <FlexRow className="justify-between gap-4">
                  <FlexColumn className="items-center gap-2">
                    <span className="text-4xl font-bold text-primary-600">
                      25,000+
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      Students
                    </span>
                  </FlexColumn>
                  <FlexColumn className="items-center gap-2">
                    <span className="text-4xl font-bold text-primary-600">
                      98%
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      Success Rate
                    </span>
                  </FlexColumn>
                </FlexRow>
                <FlexRow className="justify-between gap-4">
                  <FlexColumn className="items-center gap-2">
                    <span className="text-4xl font-bold text-primary-600">
                      50+
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      Exam Categories
                    </span>
                  </FlexColumn>
                  <FlexColumn className="items-center gap-2">
                    <span className="text-4xl font-bold text-primary-600">
                      15+
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      Awards
                    </span>
                  </FlexColumn>
                </FlexRow>
              </FlexColumn>
            </FlexRow>

            <FlexColumn className="gap-4 lg:w-1/2">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <Star className="text-primary-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Best EdTech Platform 2023
                  </h3>
                  <p className="text-gray-600">
                    Recognized by the National Education Association for
                    innovation in exam preparation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                  <Star className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Top 10 Startups in Education
                  </h3>
                  <p className="text-gray-600">
                    Featured in Tech Nepal&apos;s annual ranking of innovative
                    startups.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Star className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Excellence in Student Support
                  </h3>
                  <p className="text-gray-600">
                    Awarded for our comprehensive student support system and
                    community engagement.
                  </p>
                </div>
              </div>
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
      </section> */}

      {/* Partners */}
      {/* <section className="bg-gray-50 py-16">
        <FlexColumn className="container mx-auto gap-12 px-6">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Our Partners
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Working together with leading educational institutions and
              organizations to deliver excellence.
            </p>
          </div>

          <FlexRow className="flex-wrap items-center justify-center gap-12">
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <img
                src="https://picsum.photos/150/60"
                alt="Partner Logo"
                className="h-12"
              />
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <img
                src="https://picsum.photos/150/60"
                alt="Partner Logo"
                className="h-12"
              />
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <img
                src="https://picsum.photos/150/60"
                alt="Partner Logo"
                className="h-12"
              />
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <img
                src="https://picsum.photos/150/60"
                alt="Partner Logo"
                className="h-12"
              />
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <img
                src="https://picsum.photos/150/60"
                alt="Partner Logo"
                className="h-12"
              />
            </div>
          </FlexRow>
        </FlexColumn>
      </section> */}

      {/* <div className="pt-8 md:pt-12 lg:pt-16">
        <div className="relative h-[25rem] w-full">
          <div className="absolute z-10 w-full">
            <CollaborateForm />
          </div>
          <div className="absolute bottom-0 h-1/2 w-full bg-primary-600" />
        </div>
      </div> */}
      {/* CTA */}
      <Footer />
      {/* <section className="bg-primary-600 py-16 text-white">
        <FlexColumn className="container mx-auto gap-8 px-6">
          <FlexColumn className="mx-auto max-w-3xl gap-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Join Our Community?</h2>
            <p className="text-primary-100">
              Start your exam preparation journey with MockSewa today and
              experience the difference our platform can make in your academic
              success.
            </p>
            <div className="mt-4">
              <button className="rounded-lg bg-white px-8 py-3 font-medium text-primary-600 shadow-md transition-colors hover:bg-primary-50">
                Get Started Now
              </button>
            </div>
          </FlexColumn>
        </FlexColumn>
      </section> */}
    </div>
  );
}
