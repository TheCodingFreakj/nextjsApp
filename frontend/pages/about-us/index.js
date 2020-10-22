import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

//bring components

const AboutUs = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-7 pt-5 pb-5 pl-4 pr-5">
            <h3>Know Our Team Members </h3>
            <p>
              You sign up with us at a commenencement date, we start creating
              group members for your project. Since, we believe in giving you
              the best performance, we contract the talents to deliver you the
              best We have our own intensive process of recriting the team
              members. We often implement occasional traning sessions for them
              to keep them updated as per industry standards.
            </p>
            <ul className="list-group">
              <li className="list-group-item">Team Lead</li>
              <li className="list-group-item">UX/UI Designer</li>
              <li className="list-group-item">Database Adminstrator</li>
              <li className="list-group-item">Client Side developer</li>
              <li className="list-group-item">Backend Developer</li>
              <li className="list-group-item">Marketing Manaager</li>
              <li className="list-group-item">Content Writer</li>
              <li className="list-group-item">Seo Specialist</li>
            </ul>

            <h3>Who are the people we expect?</h3>
            <ul className="list-group">
              <li className="list-group-item">
                You need a website done and you have budget
              </li>
              <li className="list-group-item">
                You need redesigning of the websites
              </li>
              <li className="list-group-item">
                You want stand alone services we provide
              </li>
              <li className="list-group-item">
                You want to take your offline business online(Complete Technical
                and Marketing Package)
              </li>
              <li className="list-group-item">
                Markting of your products or service only
              </li>
            </ul>
            <p>
              At Marketing Solutions App, we adopt agile development process.
              Following are the sprints for a basic website. This plan needs
              tweak with addition of more advanced features.
            </p>

            <div>
              <div>
                <h4>Sprint One</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Define the goals and objectives of your site
                  </li>
                  <li className="list-group-item">Target Audience Research</li>
                  <li className="list-group-item">
                    Target Audience Persona Creation
                  </li>
                  <li className="list-group-item">Competitor Analysis</li>
                </ul>
                <h4>Sprint Two</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Wireframing and Prototyping
                  </li>
                  <li className="list-group-item">
                    Content Writing and Assembly
                  </li>
                </ul>
                <h4>Sprint Three</h4>
                <ul className="list-group">
                  <li className="list-group-item">Frontend Development</li>
                </ul>
                <h4>Sprint Four</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Review of entire website codes (Iteration 1)
                  </li>
                  <li className="list-group-item">Deliverable 1</li>
                </ul>
                <h4>Sprint Five</h4>
                <ul className="list-group">
                  <li className="list-group-item">Backend Development</li>
                </ul>
                <h4>Sprint Six</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Review of entire website codes (Iteration 2)
                  </li>
                  <li className="list-group-item">Deliverable 2</li>
                </ul>
                <h4>Sprint Seven</h4>
                <ul className="list-group">
                  <li className="list-group-item">Admin Panel Creation</li>
                </ul>
                <h4>Sprint Eight</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Review of entire website codes (Iteration 3)
                  </li>
                  <li className="list-group-item">Deliverable 3</li>
                </ul>
                <h4>Sprint Nine</h4>
                <ul className="list-group">
                  <li className="list-group-item">Deployment And Testing</li>
                </ul>
                <h4>Sprint Ten</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Modular Testing And Review (Iteration 4)
                  </li>

                  <li className="list-group-item">Final Deliverable</li>
                </ul>
              </div>
            </div>

            <div>
              <h3>How the budeting scope and time line setting work?</h3>
              <p>
                Generally we will have the a clear page header and selected
                features for the basic package. We give the rate as per the
                industry standards for basic website development features.{" "}
                <br />
                This includes:
              </p>

              <h4>Page header</h4>
              <ul className="list-group">
                <li className="list-group-item">Logo And Tagline</li>
                <li className="list-group-item">
                  Important Business Information, Phone Number And CTA
                </li>
                <li className="list-group-item">
                  Top/BreadCrumb/Hamberger Navigation
                </li>
                <li className="list-group-item">Image or Slider </li>
                <li className="list-group-item">Reviews and Testimonials </li>
                <li className="list-group-item">
                  Business Hours And Contact Information
                </li>
                <li className="list-group-item">Mobile responsive</li>
              </ul>
              <h4>The Pages</h4>
              <ul className="list-group">
                <li className="list-group-item">Home Page</li>
                <li className="list-group-item">
                  Services Page (2 products and Landing pages)
                </li>
                <li className="list-group-item">About Page</li>
                <li className="list-group-item">Contact Page</li>
                <li className="list-group-item">Privacy Policy Page </li>
                <li className="list-group-item">FAQ Page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;

// Our rate are considerably set as per 70$/hr.

// You can check out our project schedules and estimate tables.

// Technically. every website package is a sum of service charges as per industry standard, plus any party tool integration.

// Addition of more advanced features involves using astitute integration of MVC model.
// We estimate the budget and schedule as per cost and time estimates,individually.

// Second Level
// Service Page (4 products with Landing Pages)
// Blog Page with three categories and three tags
// Online Chat Feature
// Social Media Integration
// Sidebar
// Simple Search bar
// Cross-browser compatibility
// Use a simple CMS
// Fast Loading Cross-browser compatibility
// Google Analytics Integration

// Advanced
// Service Page (4+ products with Landing Pages)
// Blog Page with three +  categories and three + tags
// Geographic location
// Payment gateway integration
// Reviews & Testimonials
// Ratings Displays
// Captcha / Anti-Spam Feature
// Comment feature
// Advanced Search Bar
// Advanced CMS
// Google Search Console integration
// Videos
// Podcasts

// Marketing Specific Tweaks
// Title and meta description updates – optimize your title and meta description so search engine users are more likely to click through.
// Automatic sitemap creation – and submission to common webmaster tools.
// Easy to update URL structure – short, concise URLs that aren’t using querystrings and numbers are easier to share and more attractive to click on.
