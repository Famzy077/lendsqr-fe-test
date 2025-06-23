## Lendsqr Frontend Engineering Assessment
This project is a high-fidelity implementation of the Lendsqr user management dashboard, built as a technical assessment for the Frontend Engineer role. It features a complete user management dashboard with a simulated login, an interactive user data table, and a detailed user view, architected to be scalable, responsive, and maintainable.

 🔗 Live Application Link: [akinola-femi-lendsqr-fe-test.vercel.app](https://akinola-femi-lendsqr-fe-test.vercel.app)

 🔗 Public GitHub Repository: [Famzy077/lendsqr-fe-test](https://github.com/Famzy077/lendsqr-fe-test)

##  Features Implemented
* Simulated User Authentication: A functional login page that grants access to the main dashboard and persists the session state using localStorage, as per the assessment guidelines.

* Dashboard Overview: A summary view displaying key metrics such as total users, active users, users with loans, and users with savings, all calculated dynamically from fetched API data.

* Interactive User Data Table:

* Displays a list of all users fetched from a live mock API.

* Powered by TanStack Table (v8) for robust state management.

* Includes full client-side pagination controls, allowing the user to navigate through pages and set items per page.

* Interactive Popovers:

* Filter Menu: A dynamic popover form that appears when clicking the filter icon in any table header, allowing for data filtering.

* Actions Menu: A context menu for each user row, providing an option to view user details.

* Detailed User View Page:

* A dedicated page to view all information for a single user, fetched dynamically based on the URL parameter.

* Utilizes localStorage to provide an instant "cached" view of user data for a lightning-fast user experience before fetching the latest data.

* Fully Responsive Design: The application is optimized for all screen sizes (Desktop, Tablet, and Mobile), featuring a slide-in sidebar with an overlay for a modern mobile navigation experience.

## Tech Stack
``` Framework: React (v18)

Language: TypeScript

Build Tool: Vite

Styling: SCSS / SASS

Routing: React Router DOM (v6)

Data Fetching & State Management: TanStack Query (React Query) & Axios

Data Table Management: TanStack Table (v8)

Mock API: JSON Server, deployed on Render.
```
## Technical Decisions & Challenges
My approach focused on writing clean, maintainable code and using industry-standard tools to build a professional-grade application.

## Data Fetching with TanStack Query
* Instead of using useEffect and useState for data fetching, I chose to use TanStack Query. This powerful library handles all the complex logic for caching, loading, and error states automatically. This not only makes the code cleaner but also significantly improves the user experience by making the application feel faster and more responsive.

## Mock API Deployment
To ensure a fast and reliable demo for the hiring manager, I deployed the json-server mock API as a dedicated Web Service on Render. This provided a stable, live API endpoint that could handle the required data load and respond instantly, simulating a real-world production environment and avoiding the limitations of other free-tier services.

* State Management for Interactive UI
A key challenge was managing the state for two different types of popovers on the same table (the user "Actions" menu and the "Filter" form).

Solution: I managed their visibility using separate useState hooks to prevent them from interfering with each other. To provide an intuitive user experience, I implemented a custom useOnClickOutside hook. This hook detects clicks outside of an active popover and closes it, which is the expected behavior in modern web applications. This approach kept the state management clean and prevented conflicts between the different UI elements.

# Getting Started (Local Setup)
To run this project on your local machine, please follow these steps:

``` Prerequisites:
Node.js (v18 or later)

npm or yarn
```
Installation & Setup:
``` Clone the repository:

git clone https://github.com/Famzy077/lendsqr-fe-test.git
cd lendsqr-fe-test
```
Install dependencies:
```
npm install
```
Start the Development Server:
(The mock API is handled by the live Render deployment, but you can also run a local version if needed)

```
npm run dev

The application will be available at http://localhost:5173.
```
## Thank you for the opportunity. I am proud of the final application, as it is a complete, end-to-end user flow that is not only visually accurate but also built on a solid, professional technical foundation.
