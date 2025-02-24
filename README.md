# Case Management Dashboard

This project is a React-based Case Management Dashboard that provides features such as filtering, pagination, column selection, and batch actions for managing cases. It uses Material-UI components for styling and Zustand for state management.

---

## Features
- **Sidebar Navigation**: Navigate between different case statuses.
- **Case Table**: View cases with sorting, filtering, and column visibility options.
- **Filters**: Search cases by keywords.
- **Batch Actions**: Update the status of multiple cases at once.
- **Pagination**: Navigate through large datasets efficiently.

---

## Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn package manager

---

## Installation Instructions

1. **Clone the Repository**
git clone <repository-url>
cd <repository-folder>


2. **Install Dependencies**
Run the following command to install all required dependencies:
npm install

or if you're using Yarn:
yarn install

3. **Start the Development Server**
Run the following command to start the application:
npm start


4. **Access the Application**
Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

src/
├── components/
│ ├── Sidebar.jsx # Sidebar navigation menu
│ ├── Dashboard.jsx # Main dashboard component
│ ├── CaseTable.jsx # Table displaying cases
│ ├── Header.jsx # Header with filters and batch actions
│ ├── Filters.jsx # Search and filter functionality
│ ├── Pagination.jsx # Pagination controls
│ ├── BatchActions.jsx # Batch status update actions
│ ├── ColumnSelector.jsx # Column visibility toggle menu
├── store/
│ └── useCaseStore.jsx # Zustand store for state management
└── App.js # Main application entry point


---

## Dependencies

The project relies on the following key libraries:
- **React**: Frontend framework.
- **Material-UI**: UI components and styling.
- **Zustand**: State management.
- **Axios**: HTTP client for API requests.

---

## Usage

### Sidebar Navigation
The sidebar allows you to switch between different case statuses (e.g., All Cases, Pending Cases, Accepted Cases, Rejected Cases).

### Filtering Cases
Use the search bar in the header to filter cases by keywords.

### Batch Actions
Select multiple cases from the table and use batch actions to update their status.

### Pagination
Navigate through pages using pagination controls at the bottom of the table.

### Column Visibility
Click on the column selector in the header to toggle visibility of specific columns.

---


## Deployment

1. Build the project for production:
npm run build

2. Deploy the `build/` directory to your hosting service.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.




